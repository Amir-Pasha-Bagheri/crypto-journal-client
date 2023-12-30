/* eslint-disable no-nested-ternary */
import {
  Box,
  Container,
  Dialog,
  dialogClasses,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { ComponentProps, FC } from 'react';
import {
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineChevronUp,
  HiOutlineChevronLeft,
  HiOutlineX,
} from 'react-icons/hi';
import queryString from 'query-string';
import history from '../history';
import { popModal } from 'core/slices/modalSlice';
import { FuseDirectionOptions, ModalComponentProps } from './types';
import { useAppDispatch } from 'utils/hooks/redux';
import ProgressLoader from 'shared-component/loading/ProgressLoader';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const Transition = (slide?: FuseDirectionOptions) =>
  React.forwardRef((props: ComponentProps<typeof Slide>, ref) => (
    <Slide timeout={275} direction={slide} ref={ref} {...props} />
  ));

const ModalComponent: FC<ModalComponentProps> = ({
  onOpen,
  index,
  onClose,
  open: isOpenInStore,
  slideDirection,
  title,
  closeIcon,
  maxWidth = 'xs',
  scroll = 'body',
  fullScreen = false,
  body,
  showCloseIcon = true,
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const themeConfog = useTheme();
  const isMobile = useMediaQuery(themeConfog.breakpoints.down('md'));

  const root = document.querySelector('body');

  const handleOpen = React.useCallback(() => {
    if (onOpen) onOpen();
    if (root) root.classList.add('actionsheet-open');

    setTimeout(() => setOpen(true), 0);
    const params = queryString.parse(history.location.search);
    const hasWrongParam = params.modal && +params.modal >= index + 1;
    history[hasWrongParam ? 'replace' : 'push'](
      `?${queryString.stringify({ ...params, modal: index + 1 })}`
    );
  }, [index, onOpen, root]);

  const clearFromStack = React.useCallback(
    (_?: unknown, reason?: string) => {
      if (reason && reason === 'backdropClick') return;
      setTimeout(() => dispatch(popModal()), 200);
      if (root) root.classList.remove('actionsheet-open');
    },
    [dispatch, root]
  );

  const handleClose = React.useCallback(() => {
    if (onClose) onClose();
    setOpen(false);
    clearFromStack();
  }, [clearFromStack, onClose]);

  React.useEffect(() => {
    if (isOpenInStore) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [handleClose, handleOpen, isOpenInStore]);

  const TransitionComponent = React.useMemo(
    () => (fullScreen ? Transition(slideDirection) : undefined),
    [fullScreen, slideDirection]
  );

  const closeIconButton = React.useMemo(
    () => (
      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          left: theme.spacing(2),
          top: theme.spacing(2),
          transform: 'translatey(-10%)',
          fontSize: 23,
          zIndex: 1301 + index,
        })}
      >
        {closeIcon ||
          (slideDirection === 'right' ? (
            <HiOutlineChevronLeft />
          ) : slideDirection === 'up' ? (
            <HiOutlineChevronDown />
          ) : slideDirection === 'left' ? (
            <HiOutlineChevronRight />
          ) : (
            <HiOutlineChevronUp />
          ))}
      </IconButton>
    ),
    [handleClose, closeIcon, index, slideDirection]
  );

  return (
    <Dialog
      open={open}
      onClose={clearFromStack}
      fullWidth
      PaperProps={{ sx: { borderRadius: 0 } }}
      maxWidth={maxWidth}
      scroll={scroll}
      fullScreen={fullScreen}
      TransitionComponent={TransitionComponent}
      sx={(theme) => ({
        '&': {
          zIndex: 1300 + index,
        },
        [`& .${dialogClasses.paper}`]: {
          overflow: isMobile ? 'auto' : 'visible',
          borderRadius: '2px',
          backgroundColor: fullScreen
            ? theme.palette.background.default
            : theme.palette.background.paper,
        },
      })}
    >
      <React.Suspense fallback={<ProgressLoader />}>
        {fullScreen ? (
          <Box
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            {title ? (
              <Box>
                <Box
                  sx={{
                    minHeight: 'calc(64px + env(safe-area-inset-top))',
                    display: 'flex',
                    justifyContent: 'centeer',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                  }}
                >
                  <DialogTitle sx={{ width: '100%' }}>
                    {showCloseIcon && closeIconButton}
                    {title}
                  </DialogTitle>
                </Box>
              </Box>
            ) : (
              showCloseIcon && closeIconButton
            )}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                display: 'flex',
                flexFlow: 'column nowrap',
              }}
            >
              <Container sx={{ flexGrow: 1 }} disableGutters maxWidth="xs">
                {body}
              </Container>
            </Box>
          </Box>
        ) : (
          <>
            {showCloseIcon && (
              <StyledIconButton onClick={handleClose}>
                {closeIcon || <HiOutlineX fontSize={23} />}
              </StyledIconButton>
            )}
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{body}</DialogContent>
          </>
        )}
      </React.Suspense>
    </Dialog>
  );
};

export default React.memo(ModalComponent);
