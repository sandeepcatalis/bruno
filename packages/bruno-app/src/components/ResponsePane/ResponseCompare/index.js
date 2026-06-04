import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCompareSelection, deleteSnapshot } from 'providers/ReduxStore/slices/responseSnapshots';
import { computeLineDiff, compareHeaders, decodeDataBuffer, prettyFormat } from './diffUtils';
import StyledWrapper from './StyledWrapper';

const formatTimestamp = (ts) => {
  const d = new Date(ts);
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const formatDuration = (ms) => {
  if (!ms && ms !== 0) return '-';
  return ms > 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
};

const formatSize = (bytes) => {
  if (!bytes && bytes !== 0) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ResponseCompare = ({ item }) => {
  const dispatch = useDispatch();
  const itemUid = item.uid;
  const snapshots = useSelector((state) => state.responseSnapshots.snapshots[itemUid] || []);
  const compareSelection = useSelector((state) => state.responseSnapshots.compareSelection[itemUid]);
  const [collapsedSections, setCollapsedSections] = useState({});

  const currentResponse = item.response || {};

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Build selectable options: snapshots + "Current Response"
  const options = useMemo(() => {
    const opts = [{ id: 'current', label: 'Current Response', timestamp: Date.now() }];
    snapshots.forEach((s) => {
      opts.push({
        id: s.id,
        label: s.label || formatTimestamp(s.timestamp),
        timestamp: s.timestamp
      });
    });
    return opts;
  }, [snapshots]);

  const leftId = compareSelection?.left || (snapshots.length > 0 ? snapshots[0].id : null);
  const rightId = compareSelection?.right || 'current';

  const getResponseData = (id) => {
    if (id === 'current') {
      return {
        status: currentResponse.status,
        headers: currentResponse.headers,
        dataBuffer: currentResponse.dataBuffer,
        duration: currentResponse.duration,
        size: currentResponse.size
      };
    }
    const snap = snapshots.find((s) => s.id === id);
    return snap || null;
  };

  const leftData = getResponseData(leftId);
  const rightData = getResponseData(rightId);

  const handleLeftChange = (e) => {
    dispatch(setCompareSelection({ itemUid, left: e.target.value, right: rightId }));
  };

  const handleRightChange = (e) => {
    dispatch(setCompareSelection({ itemUid, left: leftId, right: e.target.value }));
  };

  const handleDeleteSnapshot = (snapshotId) => {
    dispatch(deleteSnapshot({ itemUid, snapshotId }));
  };

  // Compute diffs
  const bodyDiff = useMemo(() => {
    if (!leftData || !rightData) return null;
    const leftText = prettyFormat(decodeDataBuffer(leftData.dataBuffer));
    const rightText = prettyFormat(decodeDataBuffer(rightData.dataBuffer));
    return computeLineDiff(leftText, rightText);
  }, [leftData, rightData]);

  const headersDiff = useMemo(() => {
    if (!leftData || !rightData) return null;
    return compareHeaders(leftData.headers, rightData.headers);
  }, [leftData, rightData]);

  const hasBodyChanges = bodyDiff && bodyDiff.some((d) => d.type !== 'unchanged');
  const hasHeaderChanges = headersDiff && (headersDiff.added.length > 0 || headersDiff.removed.length > 0 || headersDiff.changed.length > 0);
  const statusChanged = leftData && rightData && leftData.status !== rightData.status;
  const durationChanged = leftData && rightData && leftData.duration !== rightData.duration;

  if (snapshots.length === 0) {
    return (
      <StyledWrapper>
        <div className="compare-empty">
          <span>No saved snapshots yet</span>
          <span className="empty-hint">
            Click "Save Response" in the response pane to save a snapshot for comparison
          </span>
        </div>
      </StyledWrapper>
    );
  }

  if (!leftData || !rightData) {
    return (
      <StyledWrapper>
        <div className="compare-empty">
          <span>Select two responses to compare</span>
        </div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="compare-header">
        <div className="compare-selector">
          <label>Left</label>
          <select value={leftId || ''} onChange={handleLeftChange}>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
        <span className="compare-vs">VS</span>
        <div className="compare-selector">
          <label>Right</label>
          <select value={rightId || ''} onChange={handleRightChange}>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-body">
        {/* Status & Meta */}
        <div className="diff-section">
          <div className="diff-section-header" onClick={() => toggleSection('status')}>
            <span>Status & Performance</span>
            <span className={`diff-badge ${statusChanged || durationChanged ? 'changed' : 'same'}`}>
              {statusChanged || durationChanged ? 'Changed' : 'Same'}
            </span>
          </div>
          {!collapsedSections.status && (
            <div className="diff-status-row">
              <div className="diff-status-item">
                <span className="diff-label">Status (Left)</span>
                <span className={`diff-value ${statusChanged ? 'removed' : 'same'}`}>{leftData.status || '-'}</span>
              </div>
              <div className="diff-status-item">
                <span className="diff-label">Status (Right)</span>
                <span className={`diff-value ${statusChanged ? 'added' : 'same'}`}>{rightData.status || '-'}</span>
              </div>
              <div className="diff-status-item">
                <span className="diff-label">Time (Left)</span>
                <span className="diff-value same">{formatDuration(leftData.duration)}</span>
              </div>
              <div className="diff-status-item">
                <span className="diff-label">Time (Right)</span>
                <span className="diff-value same">{formatDuration(rightData.duration)}</span>
              </div>
              <div className="diff-status-item">
                <span className="diff-label">Size (Left)</span>
                <span className="diff-value same">{formatSize(leftData.size)}</span>
              </div>
              <div className="diff-status-item">
                <span className="diff-label">Size (Right)</span>
                <span className="diff-value same">{formatSize(rightData.size)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Headers diff */}
        <div className="diff-section">
          <div className="diff-section-header" onClick={() => toggleSection('headers')}>
            <span>Headers</span>
            <span className={`diff-badge ${hasHeaderChanges ? 'changed' : 'same'}`}>
              {hasHeaderChanges
                ? `${headersDiff.added.length + headersDiff.removed.length + headersDiff.changed.length} changes`
                : 'Same'}
            </span>
          </div>
          {!collapsedSections.headers && headersDiff && (
            <div className="diff-section-body">
              <table className="diff-headers-table">
                <thead>
                  <tr>
                    <th>Header</th>
                    <th>Left</th>
                    <th>Right</th>
                  </tr>
                </thead>
                <tbody>
                  {headersDiff.removed.map((h) => (
                    <tr key={h.key} className="header-removed">
                      <td>{h.key}</td>
                      <td>{h.value}</td>
                      <td>-</td>
                    </tr>
                  ))}
                  {headersDiff.added.map((h) => (
                    <tr key={h.key} className="header-added">
                      <td>{h.key}</td>
                      <td>-</td>
                      <td>{h.value}</td>
                    </tr>
                  ))}
                  {headersDiff.changed.map((h) => (
                    <tr key={h.key} className="header-changed">
                      <td>{h.key}</td>
                      <td>{h.oldValue}</td>
                      <td>{h.newValue}</td>
                    </tr>
                  ))}
                  {headersDiff.unchanged.map((h) => (
                    <tr key={h.key}>
                      <td>{h.key}</td>
                      <td>{h.value}</td>
                      <td>{h.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Body diff */}
        <div className="diff-section">
          <div className="diff-section-header" onClick={() => toggleSection('body')}>
            <span>Body</span>
            <span className={`diff-badge ${hasBodyChanges ? 'changed' : 'same'}`}>
              {hasBodyChanges ? 'Changed' : 'Same'}
            </span>
          </div>
          {!collapsedSections.body && bodyDiff && (
            <div className="diff-section-body">
              {bodyDiff.map((line, idx) => (
                <div key={idx} className={`diff-line diff-${line.type}`}>
                  <span className="diff-line-content">{line.line || ' '}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Snapshot management */}
      <div className="snapshot-actions">
        {snapshots.map((s) => (
          <button
            key={s.id}
            className="delete-btn"
            onClick={() => handleDeleteSnapshot(s.id)}
            title={`Delete: ${s.label || formatTimestamp(s.timestamp)}`}
          >
            ✕ {s.label || formatTimestamp(s.timestamp).slice(0, 12)}
          </button>
        ))}
      </div>
    </StyledWrapper>
  );
};

export default ResponseCompare;
