import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import PressableButton from '../components/PressableButton';
import { writeToBudgetsDB } from '../firebase/firebaseHelper';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

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
            // Create a new budget entry for the user
            const newBudgetEntry = {
                limit: 0.00, // Set the limit to 0.00 as a float
            };
        
            // Write the new budget entry to the Budgets collection
            await writeToBudgetsDB(newBudgetEntry);
            console.log(userCred);
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                alert("Invalid email");
            }
            else if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            }
            else if (error.code === "auth/weak-password") {
                alert("Password must be at least 6 characters");
            }
            else {
            alert("Error signing up" + error);
            }
        }
    }


  return (
    <View style = {styles.container}>
        <View style={styles.header}>
            <FontAwesome5 name="laugh-wink" size={30} color="white" />
            <Text style={styles.text_header}>Welcome!</Text>
        </View>

        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >

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
                pressedFunction={loginHandler}
                pressedStyle={styles.buttonLoginPressed}
                defaultStyle={styles.buttonLoginDefault}
                >
                <Text style={styles.buttonLoginText}>Sign Up</Text>
            </PressableButton>

            <PressableButton
                pressedFunction={() => navigation.navigate('Login')}
                pressedStyle={styles.buttonSignupPressed}
                defaultStyle={styles.buttonSignupDefault}
                >
                <Text style={styles.buttonSignupText}>Log In</Text>
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
        flex: 4,
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
        marginTop: 5,
        fontSize: 20,
    },
buttonLoginDefault: {
    backgroundColor: '#309797',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
},
buttonLoginPressed: {
    backgroundColor: '#309797',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
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
    marginTop: 20,
},
buttonSignupPressed: {
    backgroundColor: '#F2FFE9',
    borderWidth: 2,
    borderColor: '#309797',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
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
    fontSize: 20,
},
});