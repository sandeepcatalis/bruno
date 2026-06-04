import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .compare-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-bottom: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
    flex-shrink: 0;
  }

  .compare-selector {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;

    label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: ${(props) => props.theme.colors?.text?.subtext1 || '#6B6B6B'};
      white-space: nowrap;
    }

    select {
      flex: 1;
      min-width: 0;
      padding: 4px 8px;
      font-size: 12px;
      border: 1px solid ${(props) => props.theme.border?.border2 || '#D0D0D0'};
      border-radius: 4px;
      background: ${(props) => props.theme.bg || '#FFFFFF'};
      color: ${(props) => props.theme.text || '#212121'};
      outline: none;

      &:focus {
        border-color: ${(props) => props.theme.brand || '#FF6C37'};
      }
    }
  }

  .compare-vs {
    font-size: 11px;
    font-weight: 700;
    color: ${(props) => props.theme.brand || '#FF6C37'};
    padding: 0 4px;
  }

  .compare-body {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .compare-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
    color: ${(props) => props.theme.colors?.text?.subtext1 || '#6B6B6B'};
    font-size: 13px;

    .empty-hint {
      font-size: 12px;
      color: ${(props) => props.theme.colors?.text?.subtext0 || '#9E9E9E'};
    }
  }

  .diff-section {
    border-bottom: 1px solid ${(props) => props.theme.border?.border0 || '#EEEEEE'};
    padding: 0;

    &:last-child {
      border-bottom: none;
    }
  }

  .diff-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    background: ${(props) => props.theme.background?.surface0 || '#F5F5F5'};
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${(props) => props.theme.colors?.text?.subtext1 || '#6B6B6B'};
    cursor: pointer;
    user-select: none;

    &:hover {
      background: ${(props) => props.theme.background?.surface1 || '#E8E8E8'};
    }

    .diff-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      
      &.changed {
        background: #FFC10718;
        color: #F57F17;
      }
      &.same {
        background: #00C85318;
        color: #2E7D32;
      }
    }
  }

  .diff-section-body {
    padding: 8px 12px;
    font-size: 12px;
    font-family: 'Fira Code', monospace;
    line-height: 1.6;
    overflow-x: auto;
  }

  .diff-status-row {
    display: flex;
    gap: 24px;
    padding: 8px 12px;

    .diff-status-item {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .diff-label {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: ${(props) => props.theme.colors?.text?.subtext0 || '#9E9E9E'};
      }

      .diff-value {
        font-size: 13px;
        font-weight: 600;

        &.added { color: #2E7D32; }
        &.removed { color: #C62828; }
        &.same { color: ${(props) => props.theme.text || '#212121'}; }
      }
    }
  }

  .diff-line {
    display: flex;
    min-height: 20px;
    line-height: 20px;

    .diff-line-content {
      flex: 1;
      padding: 0 8px;
      white-space: pre-wrap;
      word-break: break-all;
    }

    &.diff-added {
      background: #E8F5E9;
      .diff-line-content { color: #1B5E20; }
    }
    &.diff-removed {
      background: #FFEBEE;
      .diff-line-content { color: #B71C1C; }
    }
    &.diff-unchanged {
      .diff-line-content { color: ${(props) => props.theme.colors?.text?.subtext1 || '#6B6B6B'}; }
    }
  }

  .diff-headers-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;

    th {
      text-align: left;
      padding: 4px 8px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: ${(props) => props.theme.colors?.text?.subtext0 || '#9E9E9E'};
      border-bottom: 1px solid ${(props) => props.theme.border?.border0 || '#EEEEEE'};
    }

    td {
      padding: 3px 8px;
      font-family: 'Fira Code', monospace;
      font-size: 11px;
      vertical-align: top;
      border-bottom: 1px solid ${(props) => props.theme.border?.border0 || '#EEEEEE'};
    }

    tr.header-added td { background: #E8F5E9; }
    tr.header-removed td { background: #FFEBEE; }
    tr.header-changed td { background: #FFF8E1; }
  }

  .snapshot-actions {
    display: flex;
    gap: 4px;
    padding: 0 12px 8px;

    button {
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      border: 1px solid ${(props) => props.theme.border?.border2 || '#D0D0D0'};
      border-radius: 4px;
      background: transparent;
      color: ${(props) => props.theme.text || '#212121'};
      cursor: pointer;

      &:hover {
        background: ${(props) => props.theme.background?.surface0 || '#F5F5F5'};
      }

      &.delete-btn {
        color: #C62828;
        border-color: #FFCDD2;
        &:hover { background: #FFEBEE; }
      }
    }
  }
`;

export default StyledWrapper;
