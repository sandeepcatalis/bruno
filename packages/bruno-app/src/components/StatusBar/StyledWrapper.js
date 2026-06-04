import styled from 'styled-components';

const StyledWrapper = styled.div`
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 1.625rem;
    background: #1F1F1F;
    border-top: none;
    color: #BDBDBD;
    font-size: 11px;
    user-select: none;
    position: relative;
  }

  .status-bar-section {
    display: flex;
    align-items: center;
    position: relative;
  }

  .status-bar-group {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .status-bar-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    cursor: pointer;
    position: relative;
    outline: none;
  }

  .console-button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    position: relative;
  }

  .console-label {
    white-space: nowrap;
  }

  .error-count-inline {
    font-size: 10px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.text.danger};
    background: ${(props) => props.theme.colors.bg.danger}20;
    padding: 1px 4px;
    border-radius: 4px;
  }

  .status-bar-divider {
    width: 1px;
    height: 16px;
    background: ${(props) => props.theme.sidebar.dragbar};
    opacity: 0.4;
  }

  .status-bar-version {
    display: flex;
    align-items: center;
    padding: 2px 6px;
  }
`;

export default StyledWrapper;
