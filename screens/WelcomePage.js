import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PressableButton from '../components/PressableButton';
import Colors from '../styles/Colors';

export default function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Budget Defender!</Text>
      <PressableButton
        pressedFunction={() => navigation.navigate('Login')} 
        pressedStyle={styles.pressedButton}
        defaultStyle={styles.defaultButton}
        >
        <Text style={styles.buttonText}>Log In</Text>
      </PressableButton>
       
      <PressableButton
        pressedFunction={() => navigation.navigate('Signup')} 
        pressedStyle={styles.pressedButton}
        defaultStyle={styles.defaultButton}
        >
        <Text style={styles.buttonText}>Sign Up</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333', 
  },
  pressedButton: {
    backgroundColor: Colors.mintGreen,
    marginBottom: 10,
    opacity: 0.5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 200, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  defaultButton: {
    backgroundColor: Colors.mintGreen,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 200, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#FFF', 
    fontSize: 20,
  },
});
