import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-self: stretch;
  min-width: 5rem;
  flex-shrink: 0;

  > div {
    display: flex;
    flex: 1;
  }

  button {
    width: 100%;
    height: 100%;
    border-radius: 0 4px 4px 0 !important;
    font-weight: 700;
    font-size: 0.8125rem;
    letter-spacing: 0.03em;
    text-transform: none;
    background: ${(props) => props.theme.brand || '#FF6C37'} !important;
    color: #FFFFFF !important;
    border: none !important;
    transition: filter 0.15s ease;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;

export default StyledWrapper;
