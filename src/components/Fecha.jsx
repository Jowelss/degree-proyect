import { useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function Fecha({ setValue, initialDate }) {
  const [startDate, setStartDate] = useState(
    initialDate ? new Date(initialDate) : null,
  );

  useEffect(() => {
    setStartDate(initialDate ? new Date(initialDate) : null);
  }, [initialDate]);

  const handleChange = (date) => {
    setStartDate(date);

    setValue('fecha', date);
  };
  return (
    <div className='w-43'>
      <DatePicker
        className='coso'
        selected={startDate}
        onChange={handleChange}
        dateFormat={'dd/MM/yyyy'}
        placeholderText='Seleccionar fecha'
      />
    </div>
  );
}
