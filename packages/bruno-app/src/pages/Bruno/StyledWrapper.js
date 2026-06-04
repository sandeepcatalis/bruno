import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 0;
  background: ${(props) => props.theme.bg || '#ffffff'};

  &.is-dragging {
    cursor: col-resize !important;
  }

  section.main {
    display: flex;
    flex: 1;
    border-left: 1px solid ${(props) => props.theme.border?.border1 || '#E0E0E0'};
    background: ${(props) => props.theme.bg || '#ffffff'};

    section.request-pane,
    section.response-pane {
      overflow: hidden;
    }
  }

  .fw-600 {
    font-weight: 600;
  }
`;

export default Wrapper;
