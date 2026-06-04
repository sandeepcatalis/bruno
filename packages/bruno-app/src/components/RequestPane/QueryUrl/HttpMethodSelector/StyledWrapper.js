import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: ${(props) => props.theme.font.size.base};
  height: 100%;
  display: flex;
  align-items: stretch;
  border-right: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
  transition: background-color 0.1s ease-out;

  .dropdown {
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .method-selector {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 10px;
    border-radius: 0;

    &:not(.custom-input-mode):hover,
    &:has(button[aria-expanded="true"]) {
      background-color: color-mix(in srgb, currentColor 15%, transparent);
    }


    .tippy-box {
      max-width: 150px !important;
      min-width: 110px !important;
    }

    .dropdown-item {
      padding: 0.25rem 0.6rem !important;
    }

    .text-link {
      color: ${(props) => props.theme.textLink};
    }
  }

  input {
    background-color: ${(props) => props.theme.requestTabPanel.url.bg};
    outline: none;
    box-shadow: none;
    text-align: left;

    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }

  .method-span {
    display: block;
    max-width: 15ch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.02em;
  }

  .caret {
    color: currentColor;
    fill: currentColor;
  }
`;

export default Wrapper;
