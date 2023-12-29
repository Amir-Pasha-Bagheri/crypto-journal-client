import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'core/routes';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'core/store';
import themeConfig from 'core/mui-theme';

import 'style/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme(themeConfig)}>
      <StoreProvider store={store}>
        <RouterProvider router={router} />
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
