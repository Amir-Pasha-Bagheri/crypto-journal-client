import { ChangeEvent, forwardRef, memo, JSX } from 'react';
import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { toEnDigit } from 'utils';
import { UseControllerProps, useController, FieldValues, FieldError } from 'react-hook-form';

type RhfNumericTextFieldProps<T extends FieldValues> = {
  useCurrencyFormatter?: boolean;
} & TextFieldProps &
  UseControllerProps<T>;

const NumericFormatCustom = forwardRef<InputBaseComponentProps, NumericFormatProps>(
  (props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          if (onChange) {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            } as ChangeEvent<HTMLInputElement>);
          }
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  }
);

function FormNumericTextField<T extends FieldValues>({
  name,
  dir = 'ltr',
  label,
  control,
  rules,
  ...props
}: RhfNumericTextFieldProps<T>) {
  const helperTextHandler = (_: string, error: FieldError | undefined) => {
    if (error?.message) return error?.message;
    return null;
  };

  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    rules,
  });

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        e.target.value = toEnDigit(e.target.value);
        onChange(e);
      }}
      {...field}
      label={label}
      error={!!error}
      helperText={helperTextHandler(value as string, error)}
      variant="outlined"
      fullWidth
      InputProps={{
        dir,
        color: 'primary',
        inputComponent: NumericFormatCustom as any,
        className: 'tracking-widest',
        ...props.InputProps,
      }}
      InputLabelProps={{ color: 'primary' }}
      autoComplete="off"
    />
  );
}

export default memo(FormNumericTextField) as <T extends FieldValues>(
  props: RhfNumericTextFieldProps<T>
) => JSX.Element;
