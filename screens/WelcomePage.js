import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PressableButton from '../components/PressableButton';

export default function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
      <PressableButton
        pressedFunction={() => navigation.navigate('Login')} 
        pressedStyle={{ 
          backgroundColor: '#ff0000',
          marginBottom: 10,
        }}
        defaultStyle={{ 
          backgroundColor: '#ff0000',
          marginBottom: 10,
        }}
        >
        <Text>Log In</Text>
      </PressableButton>
       
      <PressableButton
        pressedFunction={() => navigation.navigate('Signup')} 
        pressedStyle={{ 
          backgroundColor: '#ff0000',
          marginBottom: 10,
        }}
        defaultStyle={{ 
          backgroundColor: '#ff0000',
          marginBottom: 10,
        }}
        >
        <Text>Sign Up</Text>
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
  },
});
