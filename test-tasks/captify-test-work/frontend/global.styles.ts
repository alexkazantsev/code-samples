import styled, { createGlobalStyle } from 'styled-components';
import { Layout } from 'antd';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  *:before,
  *:after {
    box-sizing: border-box;
  }
  html {
    height: 100%;
    min-height: 100%;
  }
  body {
    min-width: 320px;
    height: 100%;
    line-height: 1;
    overflow-x: hidden;
  }
  html, body {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 18px;
  }
  #__next {
    height: 100%;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    text-decoration: none;
  }
  button {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  img {
    border: 0;
  }
  input {
    outline: none;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  button,
  button:focus,
  button:active,
  input:focus,
  input:active {
    outline: none;
  }
`;

export const Content = styled(Layout.Content)`
  height: 100vh;
  padding-top: 60px;
`;
