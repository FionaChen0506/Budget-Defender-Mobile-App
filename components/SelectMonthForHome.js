import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useEffect } from 'react';

const SelectMonthForHome = ({ onMonthChange }) => {
  //const [selectedMonth, setSelectedMonth] = useState('');
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - i);
    return {
      label: `${month.getFullYear()}-${(month.getMonth() + 1).toString().padStart(2, '0')}`,
      value: `${month.getFullYear()}-${(month.getMonth() + 1).toString().padStart(2, '0')}`,
    };
  });

  return (
    <RNPickerSelect
    placeholder={{}}  
    default={{ label: currentMonth, value: currentMonth }}
      items={months}
      onValueChange={(value) => {
        setSelectedMonth(value);
        onMonthChange(value);
      }}
      style={{
        inputIOS: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30,
          backgroundColor: 'white',
          width: '50%',
          alignSelf:'center',
        },
        inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderWidth: 0.5,
          borderColor: 'purple',
          borderRadius: 8,
          color: 'black',
          paddingRight: 30,
          backgroundColor: 'white',
        },
      }}
      value={selectedMonth}
    />
  );
};

export default SelectMonthForHome;
