import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from "lottie-react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
      paddingRight: 20, 
      backgroundColor: '#FFFBF5',
      width: windowWidth * 0.3,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 15,
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
  };

  return (
    <View style={styles.container}>
      <LottieView
            source={require('../images/calendar-lottie.json')}
            autoPlay
            loop
            style={styles.calendarLottie}
          />

    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#309797', alignSelf: 'center', marginTop: 10, marginBottom: 10}}>Select Month</Text>
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
      // Icon={() => {
      //   return <Ionicons name="md-arrow-down" size={24} color="#309797" />;
      // }}
    />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,

  },
  calendarLottie: {
    width: 60,
    height: 60,
    // marginRight: 20,
  },
});


export default SelectMonthForHome;
