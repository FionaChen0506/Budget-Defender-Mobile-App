import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/firebaseSetup';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"


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
      //auth.currentUser.reload()
      alert('Username updated successfully!');
      //navigation.goBack();
      //navigation.goBack({ updatedUsername: newUsername });
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };
  

  return (
    <View>
      <Text>Email: {email}</Text>
      <Text>Current Username: {auth.currentUser.displayName}</Text>
      <TextInput
        placeholder="Enter new username"
        value={newUsername}
        onChangeText={(text) => setNewUsername(text)}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};


export default EditProfile

const styles = StyleSheet.create({})