import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #4a6bff;
    --secondary-color: #3d5bf5;
    --background-color: #f9f9f9;
    --card-color: #ffffff;
    --text-color: #333333;
    --light-text-color: #777777;
    --success-color: #4caf50;
    --error-color: #f44336;
    --shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    --font-family: 'Roboto', 'Arial', sans-serif;
  }

  body.dark-theme {
    --primary-color: #5d7bff;
    --secondary-color: #4a6bff;
    --background-color: #121212;
    --card-color: #1e1e1e;
    --text-color: #e0e0e0;
    --light-text-color: #a0a0a0;
    --shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
  }

  button {
    cursor: pointer;
    font-family: var(--font-family);
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;

export default GlobalStyles; 