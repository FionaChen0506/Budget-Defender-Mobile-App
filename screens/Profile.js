import React, { useState,useEffect } from 'react';
import EditBudgetLimit from '../components/EditBudgetLimit'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import { query,collection,where, getDocs } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { updateInBudgetsDB } from '../firebase/firebaseHelper';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles/Colors';
import { Entypo } from '@expo/vector-icons';

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


  const handleMyVisitedPlacesPress = () => {
    // Navigate to the "Visited Places" screen
    navigation.navigate('Visited Places');
  }

  return (
    <View>
        <View style={styles.userInfoContainer}>
        {/* Left side: Display name and visited places*/}
          {/* <View style={styles.displayNameContainer}>
            <Text style={styles.displayNameText}>
              Welcome, {user.displayName || updatedUsername}
            </Text>
          </View> */}

        <View style={styles.leftContent}>
          <View style={styles.displayNameContainer}>
              <Text style={styles.displayNameText}>
                    Welcome, {user.displayName || updatedUsername}
              </Text>
          </View>
          <View style={styles.visitedContainer}>
            <TouchableOpacity style={styles.visitedButton}
            onPress={() => handleMyVisitedPlacesPress()}>
            <Entypo name="star-outlined" size={24} color="#EAD33A" />
            <Text style={styles.myVisitedPlacesText}>My Visited Places</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.visitedButton}
            onPress={() => handleMyVisitedPlacesPress()}>
            <Entypo name="star-outlined" size={24} color="#EAD33A" />
            <Text style={styles.myVisitedPlacesText}>My Receipts</Text>
            </TouchableOpacity>
          </View>

        </View>

          {/* Right side: Avatar */}
          <View style={styles.avatarContainer}>
            {auth.currentUser.photoURL ? (
              <Image source={{ uri: auth.currentUser.photoURL }} style={styles.avatarImage} />
            ) : (
              <Image source={require('../assets/default-avatar.jpg')} style={styles.avatarImage} />
            )}
          </View>
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
        onPress={() => setIsModalVisible(true)} 
        style={styles.EditLimitContainer}>
          <Text style={styles.EditLimitText}>Edit Budget Limit</Text>
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


      <EditBudgetLimit
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveBudgetLimit}
      />

      <View>
        <TouchableOpacity 
        onPress={() => handleMyVisitedPlacesPress()} 
        style={styles.EditLimitContainer}>
          <Text style={styles.EditLimitText}>Notification Setting</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;


const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"95%",
    marginTop: "5%",
    marginBottom: "1%",
    alignSelf:'center',
    backgroundColor: Colors.entryBackground, 
    borderRadius: 8,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3, 
    elevation: 4,
  },
  leftContent: {
    flex: 1,
  },
  displayNameContainer: {
    flex: 1, // Takes 1/2 of the available space when name is too long
  },
  displayNameText: {
    marginTop: '8%',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  visitedContainer:{
    marginBottom: '3%',
  },
  visitedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'lightgray',
    //marginBottom: '10%',
    width:"70%",
    borderRadius: 5,
    padding:5,
    marginLeft: '5%',
  },
  myVisitedPlacesText: {
    fontSize: 16,
    marginLeft: '2%',
  },

avatarContainer: {
  width: 120,
  height: 120,
  borderRadius: 60, // half of the width and height to make it a circle
  overflow: 'hidden', // hides the content outside the borderRadius
  marginVertical: '6%',
  marginRight: '2%',
  //alignSelf: 'center',
  backgroundColor: 'gray',
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
    backgroundColor: 'transparent', 
    padding: 6,
    width: "95%",
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 4,
    marginVertical: "1%",
    marginHorizontal:"2%",
    borderWidth: 0.5,  // Add border
    borderColor: 'lightgray',

  },
  EditLimitText: {
    color: 'black',
    fontSize: 18,
    padding: 3,
  },
});