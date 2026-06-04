import styled from 'styled-components';

const StyledWrapper = styled.div`
  overflow: hidden;
  min-width: 0;

  > div:first-child {
    overflow: hidden;
    min-width: 0;
  }

  div.tabs {
    overflow: hidden;
    min-width: 0;
    max-width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};

    > div:first-child {
      overflow: hidden;
      min-width: 0;
      max-width: 100%;
      background: transparent;
      border-radius: 0;
      padding: 0;
      display: flex;
      gap: 0;
    }

    div.tab {
      padding: 8px 12px;
      border: none;
      border-bottom: 3px solid transparent;
      border-radius: 0;
      margin-right: 0;
      color: ${(props) => props.theme.colors.text.subtext1};
      cursor: pointer;
      flex-shrink: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.8125rem;
      font-weight: 500;
      transition: all 0.15s ease;

      &:focus,
      &:active,
      &:focus-within,
      &:focus-visible,
      &:target {
        outline: none !important;
        box-shadow: none !important;
      }

      &:hover:not(.active) {
        color: ${(props) => props.theme.text};
        background: rgba(0, 0, 0, 0.03);
      }

      &.active {
        font-weight: 600 !important;
        color: ${(props) => props.theme.tabs.active.color} !important;
        border-bottom: 3px solid ${(props) => props.theme.brand || '#FF6C37'} !important;
        background: transparent;
      }
    }
  }

  .response-pane-content {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-height: 0;
    position: relative;
    padding: 0 12px;
    margin-top: 8px;

    &.has-script-error {
      height: auto;
    }
  }

  .response-tab-content {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  .right-side-container {
    min-width: 0;
    flex-shrink: 1;
    flex-grow: 1;
  }

  .response-pane-status {
    min-width: 0;
    flex-shrink: 1;
    flex-grow: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 600;

    .save-snapshot-btn {
      margin-left: 4px;
      padding: 3px 8px;
      font-size: 0.6875rem;
      font-weight: 600;
      border: 1px solid ${(props) => props.theme.brand || '#FF6C37'};
      border-radius: 3px;
      background: transparent;
      color: ${(props) => props.theme.brand || '#FF6C37'};
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;

      &:hover {
        background: ${(props) => props.theme.brand || '#FF6C37'};
        color: #FFFFFF;
      }
    }
  }

  .response-pane-actions {
    min-width: 0;
    flex-shrink: 1;
    flex-grow: 0;
  }

  .some-tests-failed {
    color: ${(props) => props.theme.colors.text.danger} !important;
  }

  .all-tests-passed {
    color: ${(props) => props.theme.colors.text.green} !important;
  }

  .result-view-tabs {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0;
    border-radius: 0;
    border: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
    border-radius: 4px;
    overflow: hidden;

    .button-dropdown-button {
      border: none !important;
      border-right: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'} !important;
      background-color: transparent;
      border-radius: 0;
      font-size: ${(props) => props.theme.font.size.sm};
      font-weight: 500;
      padding: 4px 10px;

      &:last-child {
        border-right: none !important;
      }

      &:hover {
        background-color: ${(props) => props.theme.background?.surface0 || 'rgba(0,0,0,0.03)'};
      }
    }

    .tab-active .button-dropdown-button {
      background-color: ${(props) => props.theme.brand || '#FF6C37'} !important;
      color: #FFFFFF !important;

      &:hover {
        background-color: ${(props) => props.theme.brand || '#FF6C37'} !important;
      }
    }
  }
`;

export default StyledWrapper;
