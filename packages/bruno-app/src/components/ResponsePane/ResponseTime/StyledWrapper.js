import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${(props) => props.theme.requestTabPanel.responseStatus};
  padding: 2px 8px;
  border-radius: 3px;
  background: ${(props) => props.theme.requestTabPanel.responseStatus}12;
`;

export default Wrapper;
