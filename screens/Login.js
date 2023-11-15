import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async () => {
        if (!email || !password ) {
            alert("Please fill out all fields");
            return;
        }

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCred);
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                alert("Invalid email");
            }
            if (error.code === "auth/wrong-password") {
                alert("Incorrect password");
            }
            if (error.code === "auth/user-not-found") {
                alert("No user found with this email");
            }

            alert("Error logging in: " + error);
            
        }
    }
    
  return (
    <View style = {styles.container}>
      <Text>Email</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder='Email'
        />
      <Text>Password</Text>
      <TextInput 
        style={styles.input}   
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        placeholder='Password' 
        />

        <Button title="Login" onPress={loginHandler} />
        <Button title="New user? Create an account" onPress={() => navigation.navigate('Signup')} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});