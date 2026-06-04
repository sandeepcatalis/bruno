import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 0.6875rem;
  font-weight: 700;
  white-space: nowrap;
  padding: 2px 8px;
  border-radius: 3px;
  letter-spacing: 0.02em;

  &.text-ok {
    color: ${(props) => props.theme.requestTabPanel.responseOk};
    background: ${(props) => props.theme.requestTabPanel.responseOk}18;
  }

  &.text-error {
    color: ${(props) => props.theme.requestTabPanel.responseError};
    background: ${(props) => props.theme.requestTabPanel.responseError}18;
  }
`;

export default Wrapper;
