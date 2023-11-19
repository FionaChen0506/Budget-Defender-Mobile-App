import { StyleSheet, Pressable, View, Text, Alert,} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import PressableButton from './PressableButton';
import { deleteFromDB } from '../firebase/firebaseHelper';


const DeleteButton = ({ entryId, onDeleteSuccess }) => {
    const handleDelete = () => {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this entry?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                await deleteFromDB(entryId);
                onDeleteSuccess(); // A callback to update the UI after deletion
              } catch (error) {
                console.log(error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };
  
    return (
      <PressableButton
        pressedFunction={handleDelete}
        pressedStyle={styles.buttonPressed}
        defaultStyle={styles.buttonDefault}
      >
        <Ionicons name="ios-trash-outline" size={24} color="white" />
      </PressableButton>
    );
  };
  
export default DeleteButton;

const styles = StyleSheet.create({
  buttonDefault: {
    backgroundColor: 'gray', 
    opacity: 1,
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: 'gray', 
    opacity: 0.5
  },
})