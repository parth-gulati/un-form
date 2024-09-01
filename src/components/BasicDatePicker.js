import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';

export default function BasicDatePicker({label, value, onChange, error, disabled, helperText}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField error={error} disabled={disabled} helperText={helperText} onChange={onChange} value={value} sx={{width: '100%'}} label={label} required />
    </LocalizationProvider>
  );
}