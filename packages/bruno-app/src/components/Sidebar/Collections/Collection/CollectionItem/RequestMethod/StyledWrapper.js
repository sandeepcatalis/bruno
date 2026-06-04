import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 0.625rem;
  font-weight: 700;
  display: flex;
  align-self: stretch;
  align-items: center;
  min-width: 36px;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  span {
    position: relative;
    top: 0px;
  }

  .method-get {
    color: ${(props) => props.theme.request.methods.get};
  }
  .method-post {
    color: ${(props) => props.theme.request.methods.post};
  }
  .method-put {
    color: ${(props) => props.theme.request.methods.put};
  }
  .method-delete {
    color: ${(props) => props.theme.request.methods.delete};
  }
  .method-patch {
    color: ${(props) => props.theme.request.methods.patch};
  }
  .method-options {
    color: ${(props) => props.theme.request.methods.options};
  }
  .method-head {
    color: ${(props) => props.theme.request.methods.head};
  }
  .method-grpc {
    color: ${(props) => props.theme.request.grpc};
  }
  .method-ws {
    color: ${(props) => props.theme.request.ws};
  }
  .method-graphql {
    color: ${(props) => props.theme.request.gql};
  }
`;

export default Wrapper;
