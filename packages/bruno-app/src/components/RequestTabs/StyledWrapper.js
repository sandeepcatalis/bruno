import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background: ${(props) => props.theme.requestTabs.bg};
  border-bottom: 1px solid ${(props) => props.theme.requestTabs.bottomBorder};

  .scroll-chevrons.hidden {
    display: none;
  }

  .tabs-scroll-container {
    overflow-x: auto;
    overflow-y: clip;

    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;

    ul {
      margin-bottom: 0;
      overflow: visible;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: stretch;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;

    li {
      display: inline-flex;
      max-width: 200px;
      min-width: 80px;
      list-style: none;
      cursor: pointer;
      font-size: 0.8125rem;
      font-weight: 500;
      position: relative;
      margin-right: 0;
      color: ${(props) => props.theme.requestTabs.color};
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      border-right: 1px solid ${(props) => props.theme.requestTabs.bottomBorder};
      padding: 10px 16px;
      flex-shrink: 0;
      transition: all 0.1s ease-out;

      .tab-container {
        width: 100%;
        position: relative;
        overflow: hidden;
      }

      &:not(.active) {
        opacity: 0.7;

        &:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.03);
        }
      }

      &.has-overflow:not(:hover) .tab-name {
        mask-image: linear-gradient(
          to right,
          ${(props) => props.theme.requestTabs.color} 0%,
          ${(props) => props.theme.requestTabs.color} calc(100% - 12px),
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(
          to right,
          ${(props) => props.theme.requestTabs.color} 0%,
          ${(props) => props.theme.requestTabs.color} calc(100% - 12px),
          transparent 100%
        );
      }

      &.has-overflow:hover .tab-name {
        mask-image: linear-gradient(
          to right,
          ${(props) => props.theme.requestTabs.color} 0%,
          ${(props) => props.theme.requestTabs.color} calc(100% - 8px),
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(
          to right,
          ${(props) => props.theme.requestTabs.color} 0%,
          ${(props) => props.theme.requestTabs.color} calc(100% - 8px),
          transparent 100%
        );
      }

      &.active {
        color: ${(props) => props.theme.text};
        font-weight: 600;
        border-bottom: 3px solid ${(props) => props.theme.brand};
        background: ${(props) => props.theme.bg};
        opacity: 1;
        border-right: 1px solid ${(props) => props.theme.requestTabs.bottomBorder};
      }

      &:last-child {
        border-right: none;
      }

      &.short-tab {
        width: 40px;
        min-width: 40px;
        max-width: 40px;
        padding: 8px 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.theme.text};
        background-color: transparent;
        border: none;
        border-bottom: 3px solid transparent;
        border-right: 1px solid ${(props) => props.theme.requestTabs.bottomBorder};
        flex-shrink: 0;

        > div {
          padding: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: ${(props) => props.theme.border.radius.sm};
          transition: background-color 0.12s ease, color 0.12s ease;
        }

        > div.home-icon-container {
          padding: 3px 7px;
        }

        &.choose-request {
          > div {
            padding: 3px 5px;
          }
        }

        svg {
          height: 20px;
          width: 20px;
        }

        &:hover {
          > div {
            background-color: ${(props) => props.theme.background.surface0};
            color: ${(props) => props.theme.text};
          }
        }
      }
    }
  }

  .special-tab-icon {
    color: ${(props) => props.theme.brand};
  }
`;

export default Wrapper;
