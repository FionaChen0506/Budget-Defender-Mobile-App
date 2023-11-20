import React from 'react';
import { View, Text, Pressable,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import PressableButton from '../components/PressableButton';
import EntriesList from '../components/EntriesList';
import Colors from '../styles/Colors';
import BudgetSummary from '../components/BudgetSummary';

const Home = () => {
  const navigation = useNavigation();

  const handleAddPress = () => {
    // Navigate to the "Add An Expense" screen
    navigation.navigate('Add An Expense');
  };

  return (
    <View style={styles.container}>
      <BudgetSummary/>
      <EntriesList navigation={navigation} />
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
    flex: 1, 
    justifyContent: 'center', 
    //alignItems: 'center'
},
  addButtonContainer: {
    alignItems: 'center',
    marginVertical:'5%',
  },
  addButtonPressed: {
    backgroundColor: 'grey', 
    marginHorizontal: 30,
    width:'25%',
    padding: 10,
    alignItems: 'center',
  },
  addButtonDefault: {
    backgroundColor: Colors.buttonBackground,
    marginHorizontal: 30,
    width:'25%',
    padding: 10,
    alignItems: 'center',
  },
})
