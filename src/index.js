import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/body.css'
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

