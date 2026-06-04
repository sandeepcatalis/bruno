import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin: 8px 10px 8px 10px;
  position: relative;

  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9E9E9E;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 32px;
    padding: 0 32px 0 32px;
    font-size: 12px;
    color: #E0E0E0;
    background: #383838;
    border: 1px solid #4A4A4A;
    border-radius: 4px;
    outline: none;
    transition: all 0.15s ease;

    &::placeholder {
      color: #757575;
    }

    &:hover {
      border-color: #666666;
    }

    &:focus {
      background: #404040;
      border-color: #FF6C37;
    }
  }

  .clear-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    color: ${(props) => props.theme.sidebar.muted};
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      color: ${(props) => props.theme.sidebar.color};
      background: ${(props) => props.theme.sidebar.collection.item.hoverBg};
    }
  }
`;

export default StyledWrapper;
