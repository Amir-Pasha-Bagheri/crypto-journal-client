import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton, InputAdornment } from '@mui/material';
import { HiOutlineCalendar, HiX } from 'react-icons/hi';
import { RhfDatePickerProps } from './types';

function FormDatePicker<T extends FieldValues>({
  name,
  control,
  rules,
  label = 'تاریخ',
  ...props
}: RhfDatePickerProps<T> & any) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<T | null>(null);

  const openHandler = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const onClearField = (event: React.SyntheticEvent<Element, Event>) => {
    event.stopPropagation();
    setInputValue(null);
    field.onChange(null);
  };

  const handleCancel = () => {
    setInputValue(field.value);
    setOpen(false);
  };

  const handleAccept = () => {
    field.onChange(inputValue);
    setOpen(false);
  };

  return (
    <DatePicker
      label={label}
      open={open}
      value={inputValue || field.value}
      onChange={(newValue) => {
        setInputValue(newValue as unknown as T);
      }}
      slotProps={{
        actionBar: {
          actions: ['cancel', 'accept'],
          onCancel: handleCancel,
          onAccept: handleAccept,
        },
        textField: {
          fullWidth: true,
          variant: 'outlined',
          autoComplete: 'off',
          error: Boolean(error),
          onClick: openHandler(true),
          sx: () => ({
            '& .MuiFormHelperText-root': {
              fontSize: '1.2rem',
              fontWeight: '400',
            },
          }),
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                {field.value && (
                  <IconButton onClick={onClearField}>
                    <HiX />
                  </IconButton>
                )}
                <IconButton onClick={openHandler(true)}>
                  <HiOutlineCalendar />
                </IconButton>
              </InputAdornment>
            ),
          },
        },
      }}
      {...props}
    />
  );
}

export default React.memo(FormDatePicker) as <T extends FieldValues>(
  props: RhfDatePickerProps<T>
) => React.JSX.Element;
