import React from 'react';
import { View, Text, Pressable,StyleSheet, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import PressableButton from '../components/PressableButton';
import EntriesList from '../components/EntriesList';
import Colors from '../styles/Colors';
import BudgetSummary from '../components/BudgetSummary';
import SelectMonthForHome from '../components/SelectMonthForHome';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import CategoryChart from '../components/CategoryChart';
import { MaterialIcons } from '@expo/vector-icons';
import PieChartManager from '../components/PieChartManager';
import LineChartManager from '../components/LineChartManager';
import { Dimensions } from 'react-native';
import LinearGradientComp from '../components/LinearGradient';
import * as Animatable from 'react-native-animatable';

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


  // const scaleAnim = useRef(new Animated.Value(1)).current; 

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(scaleAnim, {
  //         toValue: 1.1, 
  //         duration: 1000, 
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(scaleAnim, {
  //         toValue: 1,
  //         duration: 1000,
  //         useNativeDriver: true,
  //       }),
  //     ])
  //   ).start();
  // }, [scaleAnim]);

  // // Animated style
  // const animatedStyle = {
  //   transform: [{ scale: scaleAnim }],
  // };

  return (
    <LinearGradientComp>
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <SelectMonthForHome onMonthChange={handleMonthChange} />
      </View>
      <BudgetSummary selectedMonth={selectedMonth}/>

      <LineChartManager selectedMonth={selectedMonth} />

      {/* <View style={styles.addButtonContainer}> */}
        <Animatable.View 
          style={styles.addButtonContainer}
          animation="tada"
          iterationCount="infinite"
          // duration={1000}
          // easing="ease-in-out"
        >
        <PressableButton
          pressedFunction={handleAddPress}
          pressedStyle={styles.addButtonPressed}
          defaultStyle={styles.addButtonDefault}
        >
          <Ionicons name="add" size={50} color="#309797" />
        </PressableButton>
        </Animatable.View>
      {/* </View> */}

    </View>
    </LinearGradientComp>
  );
};

export default Home;

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
  addButtonContainer: {
    alignItems: 'center',
    marginVertical: '2%',
  },
  addButtonPressed: {
    backgroundColor: "#309797",
    marginHorizontal: '5%',
    paddingBottom: '5%',
    paddingLeft: '2%',
    width: windowWidth * 0.18, 
    height: windowWidth * 0.18,
    // padding: windowHeight * 0.01,
    opacity: 0.5,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: windowWidth * 0.18 / 2,
    borderWidth: 3,
    borderColor: '#FFF78A',
    shadowColor: '#FFF78A', 
    // shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,

  },
  addButtonDefault: {
    backgroundColor: "#FFE382",
    marginHorizontal: '5%',
    paddingBottom: '5%',
    paddingLeft: '2%',
    width: windowWidth * 0.18, 
    height: windowWidth * 0.18,
    // padding: windowHeight * 0.01,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: windowWidth * 0.18 / 2,
    borderWidth: 3,
    borderColor: '#309797',
    // shadowColor: '#309797', 
    // // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 0.8,
    // shadowRadius: 10,
    // elevation: 15,
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
