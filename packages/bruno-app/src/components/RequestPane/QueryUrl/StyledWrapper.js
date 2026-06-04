import styled from 'styled-components';

const Wrapper = styled.div`
  height: 2.75rem;
  padding: 6px 16px;

  .url-input-group {
    border: 1px solid ${(props) => props.theme.border?.border2 || '#D0D0D0'};
    border-radius: 4px;
    flex: 1;
    min-width: 0;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    background: ${(props) => props.theme.bg || '#FFFFFF'};

    &:focus-within {
      border-color: ${(props) => props.theme.brand || '#FF6C37'};
      box-shadow: 0 0 0 1px ${(props) => props.theme.brand || '#FF6C37'}33;
    }
  }

  .infotip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .infotip:hover .infotiptext {
    visibility: visible;
    opacity: 1;
  }

  .infotiptext {
    visibility: hidden;
    width: auto;
    background-color: ${(props) => props.theme.background.surface2};
    color: ${(props) => props.theme.text};
    text-align: center;
    border-radius: 4px;
    padding: 4px 8px;
    position: absolute;
    z-index: 1;
    bottom: 34px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  .infotiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -4px;
    border-width: 4px;
    border-style: solid;
    border-color: ${(props) => props.theme.background.surface2} transparent transparent transparent;
  }

  .shortcut {
    font-size: 0.625rem;
  }

`;

export default Wrapper;
