import styled from 'styled-components';

const StyledWrapper = styled.div`
  &.tabs {
    overflow: hidden;
    min-width: 0;
    border-bottom: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};

    > div:first-child {
      overflow: hidden;
      min-width: 0;
      flex-shrink: 1;
      display: flex;
      gap: 0;
      padding: 0;
    }

    .more-tabs {
      color: ${(props) => props.theme.colors.text.subtext0} !important;
      border-bottom: 3px solid transparent;
      padding: 8px 12px;

      &:hover {
        color: ${(props) => props.theme.tabs.active.color} !important;
        background: rgba(0, 0, 0, 0.03);
      }
    }

    .tab {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 8px 12px;
      border: none;
      border-bottom: 3px solid transparent;
      margin-right: 0;
      color: ${(props) => props.theme.colors.text.subtext1};
      cursor: pointer;
      white-space: nowrap;
      vertical-align: middle;
      flex-shrink: 0;
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
        color: ${(props) => props.theme.tabs.active.color} !important;
        background: rgba(0, 0, 0, 0.03);
      }

      &.active {
        font-weight: 600 !important;
        color: ${(props) => props.theme.tabs.active.color} !important;
        border-bottom: 3px solid ${(props) => props.theme.brand || '#FF6C37'} !important;
      }

      .content-indicator {
        color: ${(props) => props.theme.text};
      }

      .tab-count {
        font-size: 11px;
        font-weight: 600;
        min-width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
        padding: 0 5px;
        background: ${(props) => props.theme.colors.text.muted}20;
        color: ${(props) => props.theme.colors.text.muted};
      }

      sup {
        display: inline-flex;
        align-items: center;
        line-height: 1;
        vertical-align: baseline;
        margin-left: 0;
      }
    }
  }
`;

export default StyledWrapper;
