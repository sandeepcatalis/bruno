import styled from 'styled-components';

const StyledWrapper = styled.div`
  .mock-server-content {
    min-width: 480px;
    padding: 4px 0;
  }

  .mock-status {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 6px;
    margin-bottom: 16px;
    font-size: 13px;
    font-weight: 500;

    &.running {
      background: rgba(72, 199, 142, 0.1);
      border: 1px solid rgba(72, 199, 142, 0.3);
      color: #2d8a5e;
    }

    &.stopped {
      background: rgba(0, 0, 0, 0.03);
      border: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
      color: ${(props) => props.theme.colors?.text?.subtext1 || '#6B6B6B'};
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;

      &.green { background: #48c78e; }
      &.gray { background: #999; }
    }

    .status-url {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 12px;
      font-weight: 600;
      color: ${(props) => props.theme.brand || '#FF6C37'};
      margin-left: auto;
    }
  }

  .config-section {
    margin-bottom: 16px;

    label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: ${(props) => props.theme.colors?.text?.subtext1 || '#6B6B6B'};
      margin-bottom: 6px;
    }

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
      border-radius: 4px;
      font-size: 13px;
      background: ${(props) => props.theme.bg || '#FFFFFF'};
      color: ${(props) => props.theme.text || '#1C1C1C'};

      &:focus {
        outline: none;
        border-color: ${(props) => props.theme.brand || '#FF6C37'};
        box-shadow: 0 0 0 2px rgba(255, 108, 55, 0.1);
      }
    }
  }

  .routes-summary {
    margin-bottom: 16px;
    border: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
    border-radius: 6px;
    overflow: hidden;

    .routes-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: ${(props) => props.theme.background?.surface0 || 'rgba(0,0,0,0.02)'};
      border-bottom: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: ${(props) => props.theme.colors?.text?.subtext1 || '#6B6B6B'};

      .route-count {
        font-size: 11px;
        font-weight: 700;
        background: ${(props) => props.theme.brand || '#FF6C37'};
        color: #fff;
        padding: 1px 6px;
        border-radius: 10px;
      }
    }

    .routes-list {
      max-height: 200px;
      overflow-y: auto;
    }

    .route-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      font-size: 12px;
      border-bottom: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};

      &:last-child {
        border-bottom: none;
      }

      .route-method {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        min-width: 42px;
        padding: 2px 4px;
        text-align: center;
        border-radius: 3px;
        letter-spacing: 0.02em;

        &.get { color: #48c78e; background: rgba(72, 199, 142, 0.1); }
        &.post { color: #f0a020; background: rgba(240, 160, 32, 0.1); }
        &.put { color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        &.patch { color: #8b5cf6; background: rgba(139, 92, 246, 0.1); }
        &.delete { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
      }

      .route-path {
        font-family: 'SF Mono', 'Fira Code', monospace;
        font-size: 11px;
        color: ${(props) => props.theme.text || '#1C1C1C'};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .route-status {
        margin-left: auto;
        font-size: 10px;
        color: ${(props) => props.theme.colors?.text?.subtext1 || '#999'};
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    margin-top: 16px;

    button {
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;

      &.start-btn {
        background: ${(props) => props.theme.brand || '#FF6C37'};
        color: #fff;

        &:hover { opacity: 0.9; }
        &:disabled { opacity: 0.5; cursor: not-allowed; }
      }

      &.stop-btn {
        background: #ef4444;
        color: #fff;

        &:hover { opacity: 0.9; }
      }

      &.export-btn {
        background: transparent;
        border: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
        color: ${(props) => props.theme.text || '#1C1C1C'};

        &:hover {
          border-color: ${(props) => props.theme.brand || '#FF6C37'};
          color: ${(props) => props.theme.brand || '#FF6C37'};
        }
      }
    }
  }

  .no-routes {
    text-align: center;
    padding: 24px;
    color: ${(props) => props.theme.colors?.text?.subtext1 || '#999'};
    font-size: 13px;
  }

  .error-msg {
    margin-top: 8px;
    padding: 8px 12px;
    border-radius: 4px;
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #dc2626;
    font-size: 12px;
  }
`;

export default StyledWrapper;
