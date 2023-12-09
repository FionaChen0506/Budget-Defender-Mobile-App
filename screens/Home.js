import React from 'react';
import { View, Text, Pressable,StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import PressableButton from '../components/PressableButton';
import EntriesList from '../components/EntriesList';
import Colors from '../styles/Colors';
import BudgetSummary from '../components/BudgetSummary';
import SelectMonthForHome from '../components/SelectMonthForHome';
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryChart from '../components/CategoryChart';
import { MaterialIcons } from '@expo/vector-icons';
import PieChartManager from '../components/PieChartManager';
import LineChartManager from '../components/LineChartManager';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch categoryData EXAMPLE
    const sampleCategoryData = [
      { name: 'Food', spending: 200 },
      { name: 'Transportation', spending: 50 },
      { name: 'Entertainment', spending: 100 },
    ];
    setCategoryData(sampleCategoryData);
  }, []);

  const navigation = useNavigation();
  //const [selectedMonth, setSelectedMonth] = useState('');
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const handleAddPress = () => {
    // Navigate to the "Add An Expense" screen
    navigation.navigate('Add An Expense');
  };

  const handleMonthChange = (month) => {
    console.log('Selected Month:', month);
    // Update the state with the selected month
    setSelectedMonth(month);
  };

  const handleToolPress = () => {
    // Navigate to the "Currency Exchange Tool" screen
    navigation.navigate('Currency Exchange Tool');
  };

  return (
    <View style={styles.container}>
      <SelectMonthForHome onMonthChange={handleMonthChange} />
      <BudgetSummary selectedMonth={selectedMonth}/>

      {/* <EntriesList navigation={navigation} /> */}
      
      {/* category chart example */}
      {/* <CategoryChart categoryData={categoryData} selectedMonth={selectedMonth} /> */}
      <LineChartManager selectedMonth={selectedMonth} />
      {/* <PieChartManager selectedMonth={selectedMonth} /> */}
      <View style={styles.addButtonContainer}>
        <PressableButton
          pressedFunction={handleAddPress}
          pressedStyle={styles.addButtonPressed}
          defaultStyle={styles.addButtonDefault}
        >
          <Ionicons name="add" size={28} color="white" />
        </PressableButton>
      </View>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addButtonContainer: {
    alignItems: 'center',
    marginVertical: '5%',
  },
  addButtonPressed: {
    backgroundColor: 'grey', 
    marginHorizontal: '5%',
    width: windowWidth * 0.25,
    padding: windowHeight * 0.01,
    alignItems: 'center',
  },
  addButtonDefault: {
    backgroundColor: Colors.buttonBackground,
    marginHorizontal: '5%',
    width: windowWidth * 0.25, 
    padding: windowHeight * 0.01,
    alignItems: 'center',
  },

  CurrencyExchangeContainer: {
    flex:1,
    justifyContent:'center',
    flexDirection: 'row',
  },

  toolButtonPressed: {
    backgroundColor: 'grey', 
    marginHorizontal: 10,
    //width:'60%',
    padding: 6,
    //alignItems: 'center',
  },
  toolButtonDefault: {
    backgroundColor: Colors.entryBackground,
    marginHorizontal: 10,
    //width:'60%',
    padding: 6,
    //alignItems: 'center',
  },
  toolButtonText: {
    color:Colors.entryTextDark,
    fontSize: 17,
  },
})
