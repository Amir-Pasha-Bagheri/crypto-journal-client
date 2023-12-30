import { configureStore } from '@reduxjs/toolkit';

import alertDialog from './slices/alertDialogSlice';
import modal from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    alertDialog,
    modal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
