import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import queryString from 'query-string';
import { ReactNode } from 'react';
import { Breakpoint } from '@mui/material';
import history from 'shared-component/back-handler/history';

export interface ModalPayloadType {
  open?: boolean;
  title?: string;
  body: ReactNode;
  key: string;
  maxWidth?: Breakpoint;
  scroll?: 'body' | 'paper';
  closeIcon?: ReactNode;
  fullScreen?: boolean;
  slideDirection?: 'down' | 'left' | 'right' | 'up';
  onClose?: () => void;
  onOpen?: () => void;
}

type InitialStateType = ModalPayloadType[];
const initialState: InitialStateType = [];

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state: InitialStateType, action: PayloadAction<ModalPayloadType>) => {
      const { key = new Date().getTime().toString(), ...payload } = action.payload;
      const isInStackBefore = state.some((stackitem) => stackitem.key === key);

      if (isInStackBefore) {
        return state;
      }

      const newStackItem = {
        ...payload,
        key,
        open: true,
      };

      return [...state, newStackItem];
    },
    closeModal: (state: InitialStateType) => {
      const lastItem = state.length - 1;
      state[lastItem].open = false;
    },
    closeAllModals: (state: InitialStateType) => {
      return state.map((item) => ({ ...item, open: false }));
    },
    popModal: (state: InitialStateType) => {
      state.pop();
      const { modal } = queryString.parse(history.location.search);
      if (modal && +modal > state.length) history.go(-1);
    },
  },
});

export const { openModal, closeModal, closeAllModals, popModal } = modalSlice.actions;

export default modalSlice.reducer;
