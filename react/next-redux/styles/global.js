import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'TahomaReg';
    src: url('../static/fonts/TahomaReg/TahomaReg.eot');
    src: local('☺'), url('../static/fonts/TahomaReg/TahomaReg.woff') format('woff'),
    url('../static/fonts/TahomaReg/TahomaReg.ttf') format('truetype'),
    url('../static/fonts/TahomaReg/TahomaReg.svg') format('svg');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'TahomaReg';
    src: url('../static/fonts/TahomaReg/TahomaRegBold.eot');
    src: local('☺'), url('../static/fonts/TahomaReg/TahomaRegBold.woff') format('woff'),
    url('../static/fonts/TahomaReg/TahomaRegBold.ttf') format('truetype'),
    url('../static/fonts/TahomaReg/TahomaRegBold.svg') format('svg');
    font-weight: 600;
    font-style: normal;
  }
  
  * {
    box-sizing: border-box;
  }
  *:before,
  *:after {
    box-sizing: border-box;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html {
    height: 100%;
    min-height: 100%;
  }
  body {
    min-width: 320px;
    height: 100%;
    line-height: 1;
    font-family: 'TahomaReg', sans-serif;
    font-size: 14px;
    font-weight: 400;
    overflow-x: hidden;
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
  h1, h2, h3, h4, h5, h6, ul, li, a, img, input, button, textarea {
    margin: 0,
    padding: 0,
    overline: none,
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
  input {
    background: transparent;
    transition: all 0.3s ease-in-out;
    padding: 0;
    font-family: 'TahomaReg', sans-serif;
  }
  button:focus,
  button:active,
  input:focus,
  input:active {
    outline: none;
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }
  svg {
    transition: all 0.3s ease-in-out;
  }
`;
