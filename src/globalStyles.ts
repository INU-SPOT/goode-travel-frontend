import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 84px;
  }
`;

export default GlobalStyle;
