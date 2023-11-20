
import { View, Text, TextInput, Button, Modal } from 'react-native';
import { database,auth } from "../firebase/firebaseSetup";
import { updateBudgetForUser } from '../firebase/firebaseHelper';
import { writeToBudgetsDB } from '../firebase/firebaseHelper';
import { useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import React, { useLayoutEffect,useState } from 'react'

//NOT DONE
const EditBudgetLimit = ({route}) => {
    const userUid = auth.currentUser.uid;
    const { entryId, budget} = route.params;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [budgetLimit, setBudgetLimit] = useState(''); // Using string for TextInput value
  
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(database, 'Budgets'), where('user', '==', userUid)),
            (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const userBudget = doc.data().budget || 0;
                setBudgetLimit(userBudget.toString());
              });
            }
          );
      
          // Clean up the subscription when the component unmounts
          return () => {
            unsubscribe();
          };
    }, [userUid]);
  
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
  
    const handleSave = () => {
      // Call updateBudgetForUser to update the budget
    
      console.log('New Budget Limit:', parseFloat(budgetLimit));
      const updatedEntry = {
        budget: parseFloat(),
        category:editedCategory,
        description: editedDescription,
        date: editedDate,
      };

      // Call the updateInDB function to update the entry
      updateInDB(entryId, updatedEntry);
  
      // Close the modal
      toggleModal();
    };
  return (
    <View>
      <Text onPress={toggleModal}>Budget: $500</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Set Your Budget Limit</Text>
            <TextInput
              placeholder="Enter your budget"
              keyboardType="numeric"
              value={budgetLimit}
              onChangeText={(text) => setBudgetLimit(text)}
            />
            <Button title="OK" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditBudgetLimit;
