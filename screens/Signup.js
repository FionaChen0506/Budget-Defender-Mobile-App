import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';

export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    const loginHandler = () => {
        console.log("login pressed");
        navigation.replace("Login");
    }

    const signupHandler = async () => {
        if (!email || !password || !confirmPassword) {
            alert("Please fill out all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCred);
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                alert("Invalid email");
            }
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            }
            alert("Error signing up" + error);
        }
    }


  return (
    <View style = {styles.container}>

      <Text>Email</Text>
      <TextInput 
        style={styles.input}
        placeholder='Email'
        onChangeText={setEmail}
        value={email}
        />
      <Text>Password</Text>
      <TextInput 
        style={styles.input}
        secureTextEntry={true}
        placeholder='Password'
        onChangeText={setPassword}
        value={password} 
      />
      <Text>Confirm Password</Text>
      <TextInput 
        style={styles.input}
        secureTextEntry={true} 
        placeholder='Confirm Password'
        onChangeText={setConfirm}
        value={confirmPassword}
      />

      <Button title="Register" onPress={signupHandler} />
      <Button title="Already registered? Login" onPress={() => navigation.navigate('Login')} />
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