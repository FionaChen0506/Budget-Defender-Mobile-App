import React, { useState } from 'react';
import EditBudgetLimit from '../components/EditBudgetLimit'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { query,collection,where, getDocs } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { updateInBudgetsDB } from '../firebase/firebaseHelper';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles/Colors';

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
      <View>
        <TouchableOpacity 
        onPress={() => setIsModalVisible(true)} 
        style={styles.EditLimitContainer}>
          <Text style={styles.EditLimitText}>Edit My Budget Limit</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <EditBudgetLimit
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveBudgetLimit}
      />
    </View>
  );
};

export default Profile;


const styles = StyleSheet.create({
  EditLimitContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.entryBackground, 
    padding: 5,
    width: "95%",
    justifyContent: 'space-between',
    borderRadius: 8,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3, 
    elevation: 4,
  },
  EditLimitText: {
    color: 'black',
    fontSize: 20,
    //fontWeight: 'bold',
    //marginBottom: 10,
  },
});