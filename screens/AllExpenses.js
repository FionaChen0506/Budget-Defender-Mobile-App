import { View, Text } from 'react-native'
import React from 'react'
import EntriesList from '../components/EntriesList'
import SelectMonthForHome from '../components/SelectMonthForHome';
import PieChartManager from '../components/PieChartManager'
import { useState } from 'react';
import LinearGradientComp from '../components/LinearGradient';

export default function AllExpenses({navigation}) {

  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleMonthChange = (month) => {
    console.log('Selected Month:', month);
    // Update the state with the selected month
    setSelectedMonth(month);
  };

  return (
    <LinearGradientComp>
    <View>
      <SelectMonthForHome onMonthChange={handleMonthChange} />
      <PieChartManager selectedMonth={selectedMonth}/>
      <EntriesList navigation={navigation} selectedMonth={selectedMonth} />
    </View>
    </LinearGradientComp>
  )
}