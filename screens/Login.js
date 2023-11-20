import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import PressableButton from '../components/PressableButton';

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
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder='Email'
                placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput 
                style={styles.input}   
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder='Password'
                placeholderTextColor="#aaa"
            />

            <PressableButton
                pressedFunction={loginHandler}
                pressedStyle={styles.button}
                defaultStyle={styles.button}
                >
                <Text style={styles.buttonText}>Login</Text>
            </PressableButton>

            <PressableButton
                pressedFunction={() => navigation.navigate('Signup')}
                pressedStyle={styles.button}
                defaultStyle={styles.button}
                >
                <Text style={styles.buttonText}>New user? Create an account</Text>
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
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});