import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({label, value, onChange, error, helperText}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker error={error} helperText={helperText} onChange={onChange} value={value} sx={{width: '100%'}} label={label} />
    </LocalizationProvider>
  );
}