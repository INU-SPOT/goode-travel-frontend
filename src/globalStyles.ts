import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
/* 
  div {
    width: 100%;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  } */
`;

export default GlobalStyle;
