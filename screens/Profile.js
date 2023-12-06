import React, { useState,useEffect } from 'react';
import EditBudgetLimit from '../components/EditBudgetLimit'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import { query,collection,where, getDocs } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { updateInBudgetsDB } from '../firebase/firebaseHelper';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles/Colors';

const Profile = ({navigation,route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userUid = auth.currentUser.uid;
  const [user, setUser] = useState(auth.currentUser);
  const [updatedUsername, setUpdatedUsername] = useState(null);

  // set updated user name every time the user updates the profile
  useEffect(() => {
    if (route.params?.updateProfile) {
      console.log("profile is updated");
      setUpdatedUsername(user.displayName);
  
      // Set the update flag to false after handling the update
      navigation.setParams({ updateProfile: false });
    }
  }, [route.params?.updateProfile]);
  
  
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

  const handleChangePasswordPress = () => {
    // Navigate to the "Edit Profile" screen
    navigation.navigate('Change Password');
  };

  return (
    <View>
      <Text> Hi {auth.currentUser.email}</Text>
      <Text> Hi {user.displayName || updatedUsername}</Text>
      
      <View style={styles.avatarContainer}>
        {auth.currentUser.photoURL ? (
          <Image source={{ uri: auth.currentUser.photoURL }} style={styles.avatarImage} />
        ) : (
          <Text>No Avatar</Text>
        )}
      </View>
      <View>
        <TouchableOpacity 
        onPress={() => handleEditProfilePress()} 
        style={styles.EditLimitContainer}>
          <Text style={styles.EditLimitText}>Edit Profile</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity 
        onPress={() => handleChangePasswordPress()} 
        style={styles.EditLimitContainer}>
          <Text style={styles.EditLimitText}>Change Password</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity 
        onPress={() => setIsModalVisible(true)} 
        style={styles.EditLimitContainer}>
          <Text style={styles.EditLimitText}>Edit Budget Limit</Text>
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
  showImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',  
},
avatarContainer: {
  width: 120,
  height: 120,
  borderRadius: 60, // half of the width and height to make it a circle
  overflow: 'hidden', // hides the content outside the borderRadius
  marginBottom: 10,
  alignSelf: 'center',
  backgroundColor: 'lightgray', // background color or shades
  elevation: 5, // for Android shadows
  shadowColor: 'black', // for iOS shadows
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
},
avatarImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover', // maintains aspect ratio while covering the container
},
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