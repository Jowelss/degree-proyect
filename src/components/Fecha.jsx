import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function Fecha({ setValue }) {
  const [startDate, setStartDate] = useState(new Date());
  setValue('fecha', startDate.toISOString().split('T')[0]);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat={'dd/MM/yyyy'}
    />
  );
}
