import React, { useState,useEffect } from 'react';
import EditBudgetLimit from '../components/EditBudgetLimit'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import { query,collection,where, getDocs } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { updateInBudgetsDB } from '../firebase/firebaseHelper';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles/Colors';
import LottieView from "lottie-react-native";
import { Dimensions } from 'react-native';
import LinearGradientComp from '../components/LinearGradient';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

  const handleNotificationSettingPress = () => {
    // Navigate to the "Notification Setting" screen
    navigation.navigate('Notification Setting');
  }

  return (
    <LinearGradientComp>
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
      <Animatable.View
        animation="fadeInDownBig"
        >
        <View style={styles.userInfoContainer}>
          <View style={styles.leftContent}>
            <View style={styles.displayNameContainer}>
                <Text style={styles.displayNameText}>
                      Welcome, {user.displayName || updatedUsername}
                </Text>
            </View>
            <View style={styles.visitedContainer}>
              <TouchableOpacity style={styles.visitedButton}
              onPress={() => handleMyVisitedPlacesPress()}>
              <AntDesign name="star" size={24} color="#EAD33A" />
              <Text style={styles.myVisitedPlacesText}>My Visited Places</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.visitedButton}
              onPress={() => handleMyVisitedPlacesPress()}>
              <AntDesign name="star" size={24} color="#EAD33A" />
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
      </Animatable.View>

      
      <View style={{flex:0.1, justifyContent:'space-between', width:'100%', alignSelf:'center'}}>
        <TouchableOpacity 
        onPress={() => handleEditProfilePress()} 
        style={styles.EditLimitContainer}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <AntDesign name="edit" size={24} color="#163020" />
          <Text style={styles.EditLimitText}> Edit Profile</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{flex:0.1,justifyContent:'space-between', width:'100%', alignSelf:'center'}}>
        <TouchableOpacity 
        onPress={() => setIsModalVisible(true)} 
        style={styles.EditLimitContainer}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name="wallet-outline" size={24} color="#163020" />
          <Text style={styles.EditLimitText}> Edit Budget Limit</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{flex:0.1,justifyContent:'space-between', width:'100%', alignSelf:'center'}}>
        <TouchableOpacity 
        onPress={() => handleChangePasswordPress()} 
        style={styles.EditLimitContainer}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name="key-outline" size={24} color="#163020" />
          <Text style={styles.EditLimitText}> Change Password</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <EditBudgetLimit
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveBudgetLimit}
      />

      <View style={{flex:0.1,justifyContent:'space-between', width:'100%', alignSelf:'center'}}>
        <TouchableOpacity 
        onPress={() => handleNotificationSettingPress()} 
        style={styles.EditLimitContainer}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name="notifications-outline" size={24} color="#163020" />
          <Text style={styles.EditLimitText}> Notifications Setting</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{flex:0.3,justifyContent:'space-between', width:'100%', alignSelf:'center'}}>
        <LottieView
              source={require('../images/saving-lottie.json')}
              autoPlay
              loop
              style={styles.analysisLottie}
            />
      </View>
              
    </View>
    

    </LinearGradientComp>
  );
};

export default Profile;


const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"90%",
    padding: 8,
    marginTop: "3%",
    // marginBottom: "5%",
    alignSelf:'center',
    backgroundColor: '#309797', 
    borderRadius: 8,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 8, 
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
    color: 'white',
  },
  visitedContainer:{
    marginBottom: '3%',
  },
  visitedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    //marginBottom: '10%',
    width:"85%",
    borderRadius: 5,
    padding:5,
    marginLeft: '5%',
    marginTop: '5%',
    backgroundColor: '#acd5d5',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  myVisitedPlacesText: {
    fontSize: 16,
    marginLeft: '2%',
    color: '#163020',
  },

avatarContainer: {
  width: 120,
  height: 120,
  borderRadius: 60, // half of the width and height to make it a circle
  borderWidth: 3,
  borderColor: 'white',
  overflow: 'hidden', // hides the content outside the borderRadius
  marginVertical: '6%',
  marginRight: '3%',
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
    backgroundColor: '#83c1c1',
    padding: 6,
    width: "90%",
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 4,
    // marginVertical: "1%",
    // marginHorizontal:"2%",
    borderWidth: 0.5,  // Add border
    borderColor: 'lightgray',
    alignSelf:'center',
  },
  EditLimitText: {
    color: '#163020',
    fontSize: 18,
    padding: 3,
    fontWeight: 'bold',
  },

  analysisLottie: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
});