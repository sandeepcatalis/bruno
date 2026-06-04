import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Modal from 'components/Modal';
import { mockServerStarted, mockServerStopped } from 'providers/ReduxStore/slices/mockServers';
import { findCollectionByUid, isItemARequest, isItemAFolder } from 'utils/collections';
import StyledWrapper from './StyledWrapper';

const { ipcRenderer } = window;

/**
 * Recursively extract all request items from a collection
 */
function extractRequests(items, parentPath = '') {
  const requests = [];
  if (!items) return requests;

  for (const item of items) {
    if (isItemARequest(item)) {
      requests.push(item);
    }
    if (isItemAFolder(item) && item.items) {
      requests.push(...extractRequests(item.items, parentPath + '/' + (item.name || '')));
    }
  }
  return requests;
}

/**
 * Build mock routes from collection items.
 * Uses the last response if available, otherwise generates a placeholder.
 */
function buildRoutes(items) {
  const requests = extractRequests(items);
  const routes = [];

  for (const item of requests) {
    const req = item.request;
    if (!req || !req.url) continue;

    const response = item.response || {};
    let body = '';

    if (response.dataBuffer) {
      try {
        body = Buffer.from(response.dataBuffer, 'base64').toString('utf-8');
      } catch {
        body = '';
      }
    } else if (response.data) {
      body = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    }

    // If no response body, generate a placeholder
    if (!body) {
      body = JSON.stringify({ message: `Mock response for ${req.method} ${item.name}` });
    }

    const headers = {};
    if (response.headers && typeof response.headers === 'object') {
      // Only include safe headers
      const skip = ['transfer-encoding', 'connection', 'keep-alive', 'content-length'];
      for (const [key, value] of Object.entries(response.headers)) {
        if (!skip.includes(key.toLowerCase())) {
          headers[key] = value;
        }
      }
    }
    if (!headers['content-type'] && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    routes.push({
      name: item.name,
      method: req.method || 'GET',
      url: req.url,
      status: response.status || 200,
      headers,
      body
    });
  }

  return routes;
}

function normalizePath(urlStr) {
  try {
    const parsed = new URL(urlStr);
    return parsed.pathname || '/';
  } catch {
    if (urlStr.startsWith('/')) return urlStr;
    const match = urlStr.match(/(?:https?:\/\/[^/]+)?(\/[^?#]*)/);
    return match ? match[1] : '/';
  }
}

const MockServer = ({ collectionUid, onClose }) => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const collection = findCollectionByUid(collections, collectionUid);
  const serverState = useSelector((state) => state.mockServers.servers[collectionUid]);

  const [port, setPort] = useState(4000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Listen for server stopped events from main process
  useEffect(() => {
    const removeListener = ipcRenderer.on('mock-server:stopped', (data) => {
      if (data && data.collectionUid === collectionUid) {
        dispatch(mockServerStopped({ collectionUid }));
      }
    });
    return () => { if (removeListener) removeListener(); };
  }, [collectionUid, dispatch]);

  const routes = useMemo(() => {
    if (!collection) return [];
    return buildRoutes(collection.items);
  }, [collection]);

  const handleStart = useCallback(async () => {
    if (routes.length === 0) {
      setError('No routes to mock. Add requests to your collection first.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const result = await ipcRenderer.invoke('mock-server:start', {
        collectionUid,
        port: Number(port),
        routes
      });

      if (result.success) {
        dispatch(mockServerStarted({ collectionUid, port: result.port, pid: result.pid, routeCount: routes.length }));
        toast.success(`Mock server running on port ${result.port}`);
      } else {
        setError(result.error || 'Failed to start mock server');
      }
    } catch (err) {
      setError(err.message || 'Failed to start mock server');
    } finally {
      setLoading(false);
    }
  }, [collectionUid, port, routes, dispatch]);

  const handleStop = useCallback(async () => {
    setLoading(true);
    try {
      const result = await ipcRenderer.invoke('mock-server:stop', { collectionUid });
      if (result.success) {
        dispatch(mockServerStopped({ collectionUid }));
        toast.success('Mock server stopped');
      } else {
        setError(result.error || 'Failed to stop server');
      }
    } catch (err) {
      setError(err.message || 'Failed to stop server');
    } finally {
      setLoading(false);
    }
  }, [collectionUid, dispatch]);

  const handleExport = useCallback(async () => {
    if (routes.length === 0) {
      setError('No routes to export.');
      return;
    }
    try {
      const outputPath = collection.pathname + '/mock-server';
      const result = await ipcRenderer.invoke('mock-server:export', {
        routes,
        port: Number(port),
        outputPath
      });
      if (result.success) {
        toast.success(`Exported to ${result.outputPath}`);
      } else {
        setError(result.error || 'Export failed');
      }
    } catch (err) {
      setError(err.message || 'Export failed');
    }
  }, [routes, port, collection]);

  const isRunning = serverState?.running;

  if (!collection) {
    return (
      <Modal size="md" title="Mock Server" confirmText="Close" handleConfirm={onClose} hideCancel handleCancel={onClose}>
        <StyledWrapper>
          <div className="no-routes">Collection not found.</div>
        </StyledWrapper>
      </Modal>
    );
  }

  return (
    <Modal size="md" title="Mock Server" hideFooter handleCancel={onClose}>
      <StyledWrapper>
        <div className="mock-server-content">
          {/* Status banner */}
          <div className={`mock-status ${isRunning ? 'running' : 'stopped'}`}>
            <span className={`status-dot ${isRunning ? 'green' : 'gray'}`} />
            {isRunning ? (
              <>
                <span>Running — {serverState.routeCount} routes</span>
                <span className="status-url">http://localhost:{serverState.port}</span>
              </>
            ) : (
              <span>Not running</span>
            )}
          </div>

          {/* Port config */}
          {!isRunning && (
            <div className="config-section">
              <label>Port</label>
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                min={1024}
                max={65535}
                placeholder="4000"
              />
            </div>
          )}

          {/* Routes list */}
          {routes.length > 0 ? (
            <div className="routes-summary">
              <div className="routes-header">
                <span>Routes</span>
                <span className="route-count">{routes.length}</span>
              </div>
              <div className="routes-list">
                {routes.map((route, idx) => (
                  <div key={idx} className="route-item">
                    <span className={`route-method ${route.method.toLowerCase()}`}>
                      {route.method}
                    </span>
                    <span className="route-path">{normalizePath(route.url)}</span>
                    <span className="route-status">{route.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-routes">
              No requests with responses found in this collection.<br />
              Run some requests first, then generate a mock server from their responses.
            </div>
          )}

          {/* Error */}
          {error && <div className="error-msg">{error}</div>}

          {/* Action buttons */}
          <div className="action-buttons">
            {isRunning ? (
              <button className="stop-btn" onClick={handleStop} disabled={loading}>
                {loading ? 'Stopping...' : 'Stop Server'}
              </button>
            ) : (
              <button className="start-btn" onClick={handleStart} disabled={loading || routes.length === 0}>
                {loading ? 'Starting...' : 'Start Mock Server'}
              </button>
            )}
            <button className="export-btn" onClick={handleExport} disabled={routes.length === 0}>
              Export as Project
            </button>
          </div>
        </div>
      </StyledWrapper>
    </Modal>
  );
};

export default MockServer;
