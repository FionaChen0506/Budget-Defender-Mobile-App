import { View, Text, TextInput, Button, Modal,StyleSheet, Pressable } from 'react-native';
import { database,auth } from "../firebase/firebaseSetup";
import { useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import React, { useLayoutEffect,useState } from 'react'
import PressableButton from './PressableButton';

const EditBudgetLimit = ({ isVisible, onClose, onSave }) => {
  const [newBudgetLimit, setNewBudgetLimit] = useState('');

  const handleUpdate = () => {
    // Validate the new budget limit
    if (!newBudgetLimit || isNaN(parseFloat(newBudgetLimit)) || parseFloat(newBudgetLimit) <= 0) {
      alert('Please enter a valid budget limit greater than 0.');
      return;
    }

    // Call the onSave function to update the budget limit
    onSave(parseFloat(newBudgetLimit));

    // Close the modal
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Set Your Budget Limit:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new budget limit"
            keyboardType="numeric"
            value={newBudgetLimit}
            onChangeText={setNewBudgetLimit}
          />
          <View style={styles.buttonContainer}>
          <PressableButton
            pressedFunction={onClose}
            pressedStyle={styles.buttonPressed}
            defaultStyle={styles.buttonDefault}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </PressableButton>
          <PressableButton
            pressedFunction={handleUpdate}
            pressedStyle={styles.buttonPressed}
            defaultStyle={styles.buttonDefault}
          >
            <Text style={styles.buttonText}>Save</Text>
          </PressableButton>


          {/* <Button title="Cancel" onPress={onClose} style={{width:30}} />
          <Button title="OK" onPress={handleUpdate} style={{width:30}} /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF7D4',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonDefault: {
    backgroundColor: "#FFE382",
    opacity: 1,
    borderRadius: 4,
    padding: 5,
    width:'35%',
    height: 45,
    justifyContent: 'center',
    alignItems:'center',
  },
  buttonPressed: {
    backgroundColor: '#aaa',
    opacity: 0.5,
    borderRadius: 4,
    padding: 5,
    width:'35%',
    justifyContent: 'center',
    alignItems:'center',
  },
  buttonText: {
    color: '#1B4242', 
    fontSize: 17,
    fontWeight:'bold',
  },
});

export default EditBudgetLimit;
