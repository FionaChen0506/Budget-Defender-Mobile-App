import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import SaveCancelButtons from '../components/SaveCancelButtons';
import LinearGradientComp from '../components/LinearGradient';

const ChangePassword = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const user = auth.currentUser;

    const handleChangePassword = async () => {
        if (!password || !confirmPassword) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
          }
          if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
          }
        try {
          // Call authentication module to update the password
          await updatePassword(user, password);
    
          Alert.alert('Success', 'Password updated successfully. Please log in again.');
          // Perform a logout action
          auth.signOut()
        } catch (error) {
          console.error('Error updating password:', error);
          if (error.code === 'auth/requires-recent-login') {
            Alert.alert(
                'Error',
                'For security reasons, you need to log in again before changing the password.'
              );
          } 
          else if (error.code === "auth/weak-password") {
            alert("Password must be at least 6 characters");
        }
          else {
          Alert.alert('Error', 'Failed to update password. Please try again.');
        }
        }
      };

    function cancelHandler() {
        navigation.goBack(); 
    }
  return (
    <LinearGradientComp>
    <View>
            <View style={styles.container}>
                <Text style={styles.label}>New Password</Text>
                <TextInput 
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='New Password'
                    onChangeText={setPassword}
                    value={password} 
                    placeholderTextColor="#aaa"
                />
                <Text style={styles.label}>Confirm New Password</Text>
                <TextInput 
                    style={styles.input}
                    secureTextEntry={true} 
                    placeholder='Confirm New Password'
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholderTextColor="#aaa"
                />
            </View>
      <SaveCancelButtons onCancel={cancelHandler} onSave={handleChangePassword} />
    </View>
    </LinearGradientComp>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
    container:{
        marginBottom: "10%",
        alignItems:'center'
    },
    input: {
        height: 50,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        borderColor: '#309797',
        borderRadius: 5,
        padding: 10,
        //marginLeft: '5%',
    },
    label: {
        color: '#2B2A4C',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        fontWeight: 'bold',
        marginTop: "5%",
        fontSize: 18,
    },
})