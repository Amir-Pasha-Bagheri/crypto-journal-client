import { Breakpoint } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export interface AlertDialogPayloadType {
  body: ReactNode;
  key?: string;
  maxWidth?: Breakpoint;
  title?: ReactNode;
  onCancel?: () => void;
  cancelText?: string;
  onOk?: () => void;
  okText?: string;
}

type InitialStateType = {
  dialogPack: AlertDialogPayloadType[];
  open: boolean;
};

const initialState: InitialStateType = {
  dialogPack: [],
  open: false,
};

const alertDialogSlice = createSlice({
  name: 'alertDialog',
  initialState,
  reducers: {
    openAlertDialog: (state: InitialStateType, action: PayloadAction<AlertDialogPayloadType>) => {
      state.dialogPack.push({ ...action.payload, key: new Date().getTime().toString() });
    },
    closeAlertDialog: (state: InitialStateType) => {
      state.open = false;
    },
    clearAlertDialogPack: (state: InitialStateType) => {
      return {
        open: true,
        dialogPack: state.dialogPack.slice(1),
      };
    },
  },
});

export const { openAlertDialog, clearAlertDialogPack, closeAlertDialog } = alertDialogSlice.actions;

export default alertDialogSlice.reducer;
