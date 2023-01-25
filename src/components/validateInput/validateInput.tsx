import { FormControl, InputLabel, Input, FormHelperText, InputProps, InputLabelProps, FormControlProps } from '@mui/material';
import React from 'react';

export type ErrState = {
  isValid: boolean;
  err: string;
}

export function NewErrState(): ErrState {
  return {
    isValid: true,
    err: '',
  };
}

export type ValidateInputFn = (e: React.ChangeEvent<HTMLInputElement>) => ErrState;

export type ValidateInputProps = {
  inputName: string;
  inputProps: Omit<InputProps, 'error' | 'name'>;
  inputLabelProps?: InputLabelProps;
  validateInput?: (...args: Parameters<ValidateInputFn>) => void;
  errState?: ErrState;
} & FormControlProps;

export default function ValidateInput(props: ValidateInputProps) {
  const {
    inputName,
    inputProps,
    inputLabelProps,
    validateInput,
    errState,
    ...other
  } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateInput) {
      validateInput(e);
    }
    if (inputProps.onChange) {
      inputProps.onChange(e);
    }
  };

  return (
    <FormControl {...other}>
      <InputLabel {...inputLabelProps}>{inputName}</InputLabel>
      <Input
        {...inputProps}
        name={inputName}
        error={!(errState?.isValid ?? true)}
        onChange={onChange}/>
      <FormHelperText error={!errState?.isValid}>{errState?.err}</FormHelperText>
    </FormControl>
  );
}

export const validateNonEmptyString: ValidateInputFn = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.length === 0) {
    return {
      isValid: false,
      err: 'This field is required',
    };
  }
  return {
    isValid: true,
    err: '',
  };
};

export const validatePositiveNumber: ValidateInputFn = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = parseInt(e.target.value) ?? 0;
  if (val <= 0) {
    return {
      isValid: false,
      err: 'Number must be > 0',
    };
  }
  return {
    isValid: true,
    err: '',
  };
};

export const validateNonNegativeeNumber: ValidateInputFn = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = parseInt(e.target.value) ?? 0;
  if (val < 0) {
    return {
      isValid: false,
      err: 'Number must be >= 0',
    };
  }
  return {
    isValid: true,
    err: '',
  };
};
