import styled from 'styled-components';

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  background: #2D2D2D;
  -webkit-app-region: drag;
  user-select: none;
  border-bottom: 1px solid #1A1A1A;
  z-index: 10;

  .titlebar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    padding-left: 74px; /* Space for macOS window controls */
    transition: padding-left 0.1s ease-out;
  }

  /* When in full screen, no traffic lights so reduce padding */
  &.fullscreen .titlebar-content {
    padding-left: 6px;
  }

  /* Remove drag region from interactive elements */
  .workspace-name-container,
  .dropdown-item,
  .home-button,
  .dropdown,
  button {
    -webkit-app-region: no-drag;
  }

  /* Left section */
  .titlebar-left {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    margin-left: 4px;
    -webkit-app-region: no-drag;
  }

  /* When in full screen, no traffic lights so remove margin-left */
  &.fullscreen .titlebar-left {
    margin-left: 0px;
  }

  /* Home button */
  .home-button {
    color: #BDBDBD;
    border-radius: 4px;
    padding: 4px 6px;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
    }
  }

  /* Workspace Name Dropdown Trigger */
  .workspace-name-container {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.1s ease-out;
    border: 1px solid transparent;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .workspace-name {
      font-size: 13px;
      font-weight: 600;
      color: #FFFFFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }

    .chevron-icon {
      flex-shrink: 0;
      color: #757575;
      transition: transform 0.15s ease;
    }
  }

  /* Center section - branding */
  .titlebar-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 5px;
    pointer-events: none;
    opacity: 0.6;

    .bruno-text {
      font-size: 11px;
      font-weight: 600;
      color: #9E9E9E;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  /* Right section */
  .titlebar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2px;
    flex-shrink: 0;
    -webkit-app-region: no-drag;
  }

  /* App action buttons container */
  .titlebar-actions {
    display: flex;
    align-items: center;
    gap: 2px;

    /* Override action icon colors for dark titlebar */
    .action-icon {
      color: #9E9E9E !important;
      background: transparent !important;
      border-radius: 4px;

      &:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #FFFFFF !important;
      }
    }
  }

  /* Workspace Dropdown Styles */
  .workspace-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px !important;
    margin: 0 !important;
    border-radius: 4px;

    &.active {
      background: rgba(255, 108, 55, 0.08);

      .check-icon {
        opacity: 1;
      }
    }

    &:hover {
      .pin-btn:not(.pinned) {
        opacity: 1;
      }
    }

    .workspace-name {
      flex: 1;
      min-width: 0;
      font-size: 13px;
      font-weight: 500;
      color: ${(props) => props.theme.dropdown.color};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .workspace-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-left: 8px;
      flex-shrink: 0;
      pointer-events: none;

      > * {
        pointer-events: auto;
      }
    }

    .check-icon {
      color: ${(props) => props.theme.workspace?.accent || props.theme.colors?.text?.yellow};
      flex-shrink: 0;
    }

    .pin-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 4px;
      cursor: pointer;
      color: ${(props) => props.theme.dropdown.mutedText};
      transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
      opacity: 0;

      &.pinned {
        opacity: 1;
      }

      &:hover {
        background: ${(props) => props.theme.dropdown.hoverBg};
        color: ${(props) => props.theme.dropdown.mutedText};
      }
    }
  }

  /* Adjust for non-macOS platforms */
  &:not(.os-mac) .titlebar-content {
    padding-left: 12px;
  }

  /* Windows-specific styles */
  &.os-windows .titlebar-content {
    padding-right: 0px;
    padding-left: 0px;
  }

  &.os-windows .titlebar-left {
    margin-left: 6px;
  }

  &.os-linux .titlebar-content {
    padding-right: 0px;
    padding-left: 0px;
  }

  &.os-linux .titlebar-left {
    margin-left: 6px;
  }

  .app-menu {
    margin-left: 8px;
  }

  /* Custom window control buttons for Windows - always interactive, above modal overlay */
  .window-controls {
    display: flex;
    align-items: stretch;
    height: 40px;
    margin-left: 8px;
    position: relative;
    z-index: 1000;
  }

  .window-control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 100%;
    border: none;
    background: transparent;
    color: #BDBDBD;
    cursor: pointer;
    transition: background-color 0.1s ease-out;
    -webkit-app-region: no-drag;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
    }

    &:active {
      background: rgba(255, 255, 255, 0.12);
    }

    &.close:hover {
      background: #e81123;
      color: white;
    }
  }
`;

export default Wrapper;
