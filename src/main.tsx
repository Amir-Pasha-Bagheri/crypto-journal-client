import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'core/routes';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'core/store';
import { ToastContainer } from 'react-toastify';
import themeConfig from 'core/mui-theme';
import ContentLoading from 'shared-component/loading/ContentLoading';
import BackHandler from 'shared-component/back-handler/BackHandler';
import GlobalModal from 'shared-component/back-handler/modal/GlobalModal';
import GlobalAlertDialog from 'shared-component/back-handler/alertDialog/GlobalAlertDialog';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'style/main.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme(themeConfig)}>
      <StoreProvider store={store}>
        <Suspense fallback={<ContentLoading dynamicHeight />}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
            <BackHandler />
            <GlobalModal />
            <GlobalAlertDialog />
            <ToastContainer
              position="top-center"
              hideProgressBar
              rtl
              style={{
                fontSize: '1.4rem',
              }}
            />
          </LocalizationProvider>
        </Suspense>
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
