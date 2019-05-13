import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  div.unform {
    display: flex;
    flex: 1;
    span {
      position: absolute;
      font-weight: bold;
      color: red;

    }
  }
`;

export default GlobalStyle;
