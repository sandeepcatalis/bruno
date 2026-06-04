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
    gap: 2px;
    padding: 3px;
    border-radius: 8px;

    .button-dropdown-button {
      border: 1px solid transparent !important;
      background-color: transparent;
      border-radius: 5px;
      font-size: ${(props) => props.theme.font.size.sm};

      &:hover {
        border-color: ${(props) => props.theme.app.collection.toolbar.environmentSelector.border} !important;
      }
    }

    .tab-active .button-dropdown-button {
      border-color: ${(props) => props.theme.app.collection.toolbar.environmentSelector.border} !important;

      &:hover {
        border-color: ${(props) => props.theme.app.collection.toolbar.environmentSelector.hoverBorder} !important;
      }
    }
  }
`;

export default StyledWrapper;
