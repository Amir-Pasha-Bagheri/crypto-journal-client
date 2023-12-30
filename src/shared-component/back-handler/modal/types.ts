import { ThemeOptions } from '@mui/material';
import { ReactNode } from 'react';
import { Breakpoint } from '@mui/material';

export interface ModalComponentProps {
  index: number;
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
  slideDirection?: FuseDirectionOptions;
  title?: string;
  closeIcon?: ReactNode;
  maxWidth?: Breakpoint;
  scroll?: 'body' | 'paper';
  fullScreen?: boolean;
  body?: ReactNode;
  showCloseIcon?: boolean;
}

export type FuseThemeOptions = ThemeOptions & {
  status?: {
    danger?: string;
  };
};

export type FuseColorOptions =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'string';

export type FuseButtonVariantOptions = 'contained' | 'outlined' | 'text';

export type FuseDirectionOptions = 'down' | 'up' | 'left' | 'right';
