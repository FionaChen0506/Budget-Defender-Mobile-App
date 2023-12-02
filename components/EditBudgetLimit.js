import { View, Text, TextInput, Button, Modal,StyleSheet } from 'react-native';
import { database,auth } from "../firebase/firebaseSetup";
import { useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import React, { useLayoutEffect,useState } from 'react'

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
          <Button title="OK" onPress={handleUpdate} />
          <Button title="Cancel" onPress={onClose} />
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
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
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
});

export default EditBudgetLimit;
