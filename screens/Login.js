import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import PressableButton from '../components/PressableButton';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';


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
            console.log(error.code);
            if (error.code === "auth/invalid-login-credentials") {
                alert("Invalid email or password");
            }
            else if (error.code === "auth/wrong-password") {
                alert("Incorrect password");
            }
            else if (error.code === "auth/user-not-found") {
                alert("No user found with this email");
            }
            else {
            alert("Error logging in: " + error);
            }
            
        }
    }
    
  return (
    <View style = {styles.container}>
        <View style={styles.header}>
        <FontAwesome5 name="laugh-beam" size={30} color="white" />
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >

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
                pressedStyle={styles.buttonLoginPressed}
                defaultStyle={styles.buttonLoginDefault}
                >
                <Text style={styles.buttonLoginText}>Log In</Text>
            </PressableButton>

            <PressableButton
                pressedFunction={() => navigation.navigate('Signup')}
                pressedStyle={styles.buttonSignupPressed}
                defaultStyle={styles.buttonSignupDefault}
                >
                <Text style={styles.buttonSignupText}>New user? Create an account</Text>
            </PressableButton>
        </Animatable.View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#309797'
      },
      header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        alignItems: 'center',
    },
    footer: {
        flex: 3,
        backgroundColor: '#F2FFE9',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    text_header: {
        marginLeft: '5%',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
        color: '#2B2A4C',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 20,
    },
    buttonLoginDefault: {
        backgroundColor: '#309797',
        width: '80%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
    },
    buttonLoginPressed: {
        backgroundColor: '#309797',
        width: '80%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        opacity: 0.5,
    },
    buttonSignupDefault: {
        backgroundColor: '#F2FFE9',
        borderWidth: 2,
        borderColor: '#309797',
        width: '80%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
    },
    buttonSignupPressed: {
        backgroundColor: '#F2FFE9',
        borderWidth: 2,
        borderColor: '#309797',
        width: '80%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        opacity: 0.5,
    },
    buttonLoginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonSignupText: {
        color: '#309797',
        fontWeight: 'bold',
        fontSize: 16,
    },
});