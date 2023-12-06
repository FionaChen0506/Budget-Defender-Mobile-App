import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/firebaseSetup';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import SaveCancelButtons from '../components/SaveCancelButtons';


const EditProfile = ({navigation}) => {
  const user = auth.currentUser;
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    // Fetch the current user's information when the component mounts
    const fetchUserData = async () => {
      try {
        setEmail(user.email);
        setUsername(user.displayName);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      // Update the username (displayName) in the Firebase Authentication
      await updateProfile(user, {
        displayName: newUsername,
      });

      // Update the local state
      setUsername(newUsername);
      // Reset the newUsername state
      setNewUsername('');
      alert('Username updated successfully!');
      navigation.goBack();
      navigation.navigate('Profile', { updateProfile: true });
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  function cancelHandler() {
    navigation.goBack(); 
}
  

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>Email: {email}</Text>
        <Text style={styles.label}>Username: {auth.currentUser.displayName}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter New Username"
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
        />
      </View>
      <SaveCancelButtons onCancel={cancelHandler} onSave={handleSave} />
    </View>
  );
};


export default EditProfile

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