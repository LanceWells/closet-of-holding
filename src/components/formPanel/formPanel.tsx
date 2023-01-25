import { Button, FormControl, Input, InputLabel, InputProps, MenuItem, Select, SelectProps } from '@mui/material';
import React, { useMemo } from 'react';
import { getImgFromResponse } from '../../common/pages/fetchHelpers';
import styles from './formPanel.module.scss';

type Selectable = string | number

export type SelectInputProps<T extends Selectable> = {
  label: string;
  options: {
    value: T;
    label: string;
  }[];
  value: T;
  onChange: (e: T) => void;
};

export function SelectInput<T extends Selectable>(props: SelectInputProps<T>) {
  const {
    label,
    options,
    value,
    onChange,
  } = props;

  const labelVal = useMemo(() => label.toLowerCase().replace(' ', '-'), [label]);
  const menuOpts = useMemo(() => options.map((opt) => (
    <MenuItem key={String(opt.value)} value={opt.value}>
      {opt.label}
    </MenuItem>
  )), [options]);

  return (
    <FormControl
      id={labelVal}
      sx={{ minWidth: 240, maxWidth: 240 }}>
      <InputLabel
        id={labelVal+'-label'}>
        {label}
      </InputLabel>
      <Select
        onChange={(e) => {
          const val = e?.target?.value;
          onChange((val ?? '') as T);
        }}
        value={value}>
        {menuOpts}
      </Select>
    </FormControl>
  );
}

export type MultiSelectInputProps<T extends Selectable> = {
  label: string;
  options: {
    value: T;
    label: string;
  }[];
  value: Array<T>;
  onChange: (e: Array<T>) => void;
};

export function MultiSelectInput<T extends Selectable>(props: MultiSelectInputProps<T>) {
  const {
    label,
    options,
    value,
    onChange,
  } = props;

  const labelVal = useMemo(() => label.toLowerCase().replace(' ', '-'), [label]);
  const menuOpts = useMemo(() => options.map((opt) => (
    <MenuItem key={String(opt.value)} value={opt.value}>
      {opt.label}
    </MenuItem>
  )), [options]);

  return (
    <FormControl
      id={labelVal}
      sx={{ minWidth: 240, maxWidth: 240 }}>
      <InputLabel
        id={labelVal+'-label'}>
        {label}
      </InputLabel>
      <Select
        multiple
        onChange={(e) => {
          const val = e?.target?.value;

          if (typeof val === 'string') {
            onChange(val.split(',') as Array<T>);
          } else if (Array.isArray(val)) {
            onChange(val as Array<T>);
          }
        }}
        value={value}>
        {menuOpts}
      </Select>
    </FormControl>
  );
}

export type ImageInputProps = {
  label: string;
  file?: File;
  required?: boolean;
  onChange: (value: File) => void;
  inputProps?: InputProps;
}

export function ImageInput(props: ImageInputProps) {
  const {
    label,
    file,
    required,
    onChange,
  } = props;

  const labelVal = useMemo(() => label.toLowerCase().replace(' ', '-'), [label]);
  const isRequired = required === undefined ? true : required;

  return (
    <FormControl
      id={labelVal}
      sx={{ minWidth: 240, maxWidth: 240 }}>
      <InputLabel
        shrink={true}
        id={labelVal+'-label1'}>
        {`${isRequired ? '❗ ' : ''}` + label}
      </InputLabel>
      <Input
        id={labelVal}
        type='file'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e?.target?.files?.length) {
            onChange(e.target.files[0]);
          }
        }}
        required={isRequired}
        inputProps={{ accept: 'image/png' }} />
    </FormControl>
  );
}

export type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextInput(props: TextInputProps) {
  const {
    label,
    value,
    onChange,
  } = props;

  const labelVal = useMemo(() => label.toLowerCase().replace(' ', '-'), [label]);

  return (
    <FormControl
      id={labelVal+'-control'}
      sx={{ minWidth: 240, maxWidth: 240 }}>
      <InputLabel
        id={labelVal+'-label'}>
        {label}
      </InputLabel>
      <Input
        id={labelVal}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
        type='text' />
    </FormControl>
  );
}

export type NumberInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export function NumberInput(props: NumberInputProps) {
  const {
    label,
    value,
    onChange,
  } = props;

  const labelVal = useMemo(() => label.toLowerCase().replace(' ', '-'), [label]);

  return (
    <FormControl
      id={labelVal+'-control'}
      sx={{ minWidth: 240, maxWidth: 240 }}>
      <InputLabel
        id={labelVal+'-label'}>
        {label}
      </InputLabel>
      <Input
        id={labelVal}
        onChange={(e) => onChange(parseInt(e.target.value))}
        value={value}
        required
        type='number' />
    </FormControl>
  );
}

export type FormPanelProps = {
  formProps?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
};

export function FormPanel(props: React.PropsWithChildren<FormPanelProps>) {
  const {
    formProps,
    children,
  } = props;

  return (
    <form className={styles['form-panel']} {...formProps}>
      {children}
    </form>
  );
}
