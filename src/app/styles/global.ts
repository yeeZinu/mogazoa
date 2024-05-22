"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
  --black-17171C: #17171c;
  --black-21212A: #21212a;
  --black-2E2E3A: #2e2e3a;
  --gray-6E6E82: #6e6e82;
  --gray-9FA6B2: #9fa6b2;
  --white-F1F1F5: #f1f1f5;
  --main-gradation: linear-gradient(#5097fa, #5363ff);
  --main-blue: #5097fa;
  --main-indigo: #5363ff;
  --yellow-FFC83C: #ffc83c;
  --green-05D58B: #05d58b;
  --pink-FF2F9F: #ff2f9f;
  --red-FF0000: #f00;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body {
  max-width: 100vw;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyle;
