import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import PressableButton from '../components/PressableButton';

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
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input}
                placeholder='Email'
                onChangeText={setEmail}
                value={email}
                placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={setPassword}
                value={password} 
                placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry={true} 
                placeholder='Confirm Password'
                onChangeText={setConfirm}
                value={confirmPassword}
                placeholderTextColor="#aaa"
            />

            <PressableButton
                pressedFunction={signupHandler}
                pressedStyle={styles.button}
                defaultStyle={styles.button}
                >
                <Text style={styles.buttonText}>Register</Text>
            </PressableButton>

            <PressableButton
                pressedFunction={loginHandler}
                pressedStyle={styles.button}
                defaultStyle={styles.button}
                >
                <Text style={styles.buttonText}>Already registered? Login</Text>
            </PressableButton>
        </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
},
input: {
    height: 50,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#309797',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
},
label: {
  color: '#333',
  alignSelf: 'flex-start',
  marginLeft: '10%',
  fontWeight: 'bold',
  marginTop: 10,
},
button: {
    backgroundColor: '#309797',
    width: '80%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
},
buttonText: {
    color: '#fff',
    fontWeight: 'bold',
},
});