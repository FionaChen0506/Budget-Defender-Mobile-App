import React from 'react';
import { View, Text, Pressable,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import PressableButton from '../components/PressableButton';
import Colors from '../styles/Colors';

const Home = () => {
  const navigation = useNavigation();

  const handleAddPress = () => {
    // Navigate to the "Add An Expense" screen
    navigation.navigate('Add An Expense');
  };

  return (
    <View style={styles.container}>

      {/* Add button */}
      {/* <PressableButton
        pressedFunction={handleAddPress}
        pressedStyle={{
          backgroundColor: 'grey',
          borderRadius: 20, 
          padding: 10,
        }}
        defaultStyle={{
          backgroundColor: Colors.buttonBackground, 
          borderRadius: 20, 
          padding: 10, 
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </PressableButton> */}

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
    alignItems: 'center'
},
  addButtonContainer: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 20,
    padding: 6,
  },
  addButtonPressed: {
    backgroundColor: 'grey', 
    marginHorizontal: 30,
  },
  addButtonDefault: {
    backgroundColor: Colors.buttonBackground,
    marginHorizontal: 30,
  },
})
