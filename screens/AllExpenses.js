import { View, Text, StyleSheet } from 'react-native'
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
    <View style={styles.container}>
      <View style={styles.selectContainer}>
          <SelectMonthForHome onMonthChange={handleMonthChange} />
      </View>
      
      <PieChartManager selectedMonth={selectedMonth}/>
        
      <View style={styles.listContainer}>
        <EntriesList navigation={navigation} selectedMonth={selectedMonth} />
      </View>

    </View>
    </LinearGradientComp>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selectContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  listContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
})



  

