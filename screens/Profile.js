import React, { useState } from 'react';
import EditBudgetLimit from '../components/EditBudgetLimit'
import { View, Text, TouchableOpacity } from 'react-native';
import { query,collection,where, getDocs } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { updateInBudgetsDB } from '../firebase/firebaseHelper';

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userUid = auth.currentUser.uid;

  // Function to fetch the entryId based on userUid
const getBudgetEntryId = async (userUid) => {
  try {
    const budgetsQuery = query(
      collection(database, 'Budgets'),
      where('user', '==', userUid)
    );

    const budgetsSnapshot = await getDocs(budgetsQuery);

    if (!budgetsSnapshot.empty) {
      // there's only one budget entry per user
      const entryId = budgetsSnapshot.docs[0].id;
      return entryId;
    } else {
      console.log('No budget entry found for the user');
      return null;
    }
  } catch (err) {
    console.error('Error fetching budget entry ID:', err);
    return null;
  }
};

  const handleSaveBudgetLimit = async (newBudgetLimit) => {
    const entryId = await getBudgetEntryId(userUid);
    console.log('Updating budget limit:', newBudgetLimit);
    console.log('Updating entryId:', entryId);
    if (entryId) {
      const updatedEntry = {
        limit: newBudgetLimit,
      };

      // Call the updateInDB function to update the entry
      await updateInBudgetsDB(entryId, updatedEntry);
    }
  };

  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{userUid}</Text>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={{ color: 'blue' }}>Edit Budget Limit</Text>
      </TouchableOpacity>

      <EditBudgetLimit
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveBudgetLimit}
      />
    </View>
  );
};

export default Profile;