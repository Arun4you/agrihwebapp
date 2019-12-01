import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({onChange})=> 
{
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

export default ReactDatePicker