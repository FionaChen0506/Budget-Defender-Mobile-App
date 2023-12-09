import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

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

  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1.5,
      borderColor: '#309797',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, 
      backgroundColor: '#FFFBF5',
      width: '70%',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      marginTop: 10,
      marginBottom: 10,
    },
    inputAndroid: {
      marginTop: 10,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#309797',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
      backgroundColor: '#FFFBF5',
      elevation: 3,
      marginBottom: 10,
    },
    placeholder: {
      color: '#b3b3b3',
    },
    iconContainer: {
      top: 15,
      right: 25,
    },
  };

  return (
    <RNPickerSelect
    placeholder={{}}  
    default={{ label: currentMonth, value: currentMonth }}
      items={months}
      onValueChange={(value) => {
        setSelectedMonth(value);
        onMonthChange(value);
      }}
      style={pickerSelectStyles}
      value={selectedMonth}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return <Ionicons name="md-arrow-down" size={24} color="#309797" />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
});


export default SelectMonthForHome;
