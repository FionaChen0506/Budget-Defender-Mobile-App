import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const SelectMonthForHome = ({ onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

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
      default={{ label: '2023-11', value: '2023-11' }}
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
