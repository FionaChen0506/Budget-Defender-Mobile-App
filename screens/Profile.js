import React, { useState,useEffect } from 'react';
import EditBudgetLimit from '../components/EditBudgetLimit'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { query,collection,where, getDocs } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { updateInBudgetsDB } from '../firebase/firebaseHelper';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles/Colors';
import PressableButton from '../components/PressableButton';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userUid = auth.currentUser.uid;
  const [user, setUser] = useState(auth.currentUser);

  // Use useEffect to update the user object when it changes
  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the local state with the new user object
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  
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

  const handleEditProfilePress = () => {
    // Navigate to the "Edit Profile" screen
    navigation.navigate('Edit Profile');
  };

  return (
    <View>
      <Text> Hi {auth.currentUser.email}</Text>
      <Text> Hi {user.displayName}</Text>
      <Text>{userUid}</Text>

      <View>
        <TouchableOpacity 
        onPress={() => handleEditProfilePress()} 
        style={styles.EditLimitContainer}>
          <Text style={styles.EditLimitText}>Edit My Profile</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

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
    marginVertical: "1%",
  },
  EditLimitText: {
    color: 'black',
    fontSize: 20,
    //fontWeight: 'bold',
    //marginBottom: 10,
  },
});