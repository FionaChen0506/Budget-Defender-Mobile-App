import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { scheduleDailyNotification, cancelNotification } from '../components/NotificationManager';
import LinearGradientComp from '../components/LinearGradient';
import { useEffect } from 'react';
import { database, auth } from '../firebase/firebaseSetup';
import { collection,  getDocs, query, where,doc, onSnapshot } from "firebase/firestore";
import { updateInUsersDB } from '../firebase/firebaseHelper';
import { isTimestamp } from 'firebase/firestore';
import PressableButton from '../components/PressableButton';
import Colors from '../styles/Colors';


const NotificationSetting = () => {
  const [chosenTime, setChosenTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date()); 
  const [notificationTime, setNotificationTime] = useState(new Date());
  const userUid = auth.currentUser.uid;
  const [entryId, setEntryId] = useState('')
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, 'Users'), where('user', '==', auth.currentUser.uid)),
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          // Get the first document
          const userDoc = querySnapshot.docs[0];
          const entryId = userDoc.id;
          setEntryId(entryId);
          const userData = userDoc.data();
  
          // Now you can access the fields, e.g., userData.isNotification
          setIsNotification(userData.isNotification || false);
          setNotificationTime(userData.notificationTime || new Date());
        } else {
          // console.log('User document not found.');
        }
      },
      (err) => {
        console.log(err);
        if (err.code === 'permission-denied') {
          console.log('User does not have permission to access this collection');
        }
      }
    );
  
    return () => unsubscribe(); // Cleanup the listener when the component is unmounted
  }, [notificationTime]);
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmTime = (time) => {
    hideDatePicker();
    setSelectedTime(time);
    const updatedEntry = {
      isNotification: true,
      notificationTime: time,
    };

    updateInUsersDB(entryId, updatedEntry);
    setIsNotification(true)
    setNotificationTime(time)

    const formattedHour = parseInt(time.getHours());
    const formattedMinute = parseInt(time.getMinutes());
    const formattedTime = `${formattedHour}:${formattedMinute}`;
  
    // Pass the formatted time to NotificationManager 
    scheduleDailyNotification(formattedHour,formattedMinute)
  };   
  const cancelNotificationHandler = () => {
    setIsNotification(false);
    cancelNotification();
    const updatedEntry = {
      isNotification: false,
    };

    updateInUsersDB(entryId, updatedEntry);
  };
  function formatTime(time) {
    // console.log("notification time:", notificationTime)
    const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

    const formattedHour = date.getHours().toString().padStart(2, '0');
    const formattedMinute = date.getMinutes().toString().padStart(2, '0');
  
    return `${formattedHour}:${formattedMinute}`;
  }
  return (
    <LinearGradientComp>
    <View style={styles.container}>
      {!isNotification&&
        <PressableButton
          pressedFunction={showDatePicker}
          pressedStyle={styles.buttonPressed}
          defaultStyle={styles.buttonDefault}
        >
          <Text style={styles.buttonText}>Set Daily Notifications</Text>
        </PressableButton>
}
        <DateTimePickerModal
          testID="dateTimePicker"
          isVisible={isDatePickerVisible}
          value={chosenTime}
          onCancel={hideDatePicker}
          mode="time"
          is24Hour={true}
          onConfirm={confirmTime}
        />

        {isNotification && (
          <View style={styles.notificationTimeContainer}>
            <Text style={styles.notificationText}>Your Daily Notification is at: {formatTime(notificationTime)}</Text>
            <PressableButton
                pressedFunction={cancelNotificationHandler}
                pressedStyle={styles.buttonPressed}
                defaultStyle={styles.buttonDefault}
              >
                <Text style={styles.buttonText}>Cancel Notification</Text>
            </PressableButton>
          </View>
      )}
    </View>
    </LinearGradientComp>
  );
};

export default NotificationSetting;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:'10%',
    marginBottom: '10%',
    width:'90%',
    alignSelf:'center',
  },
  notificationTimeContainer: {
    justifyContent: 'center',
    alignItems:'center',
  },
  buttonDefault: {
    backgroundColor: Colors.buttonBackground,
    opacity: 1,
    borderRadius: 4,
    padding: 5,
    width:'90%',
    //height: '35%',
    //justifyContent: 'center',
    alignItems:'center',
  },
  buttonPressed: {
    backgroundColor: '#aaa',
    opacity: 0.5,
    borderRadius: 4,
    padding: 5,
    width:'90%',
    justifyContent: 'center',
    alignItems:'center',
  },
  buttonText: {
    color: 'white', 
    fontSize: 22,
    fontWeight:'bold',
  },
  notificationText:{
    fontSize: 22,
    marginBottom: "5%",
    textAlign:'center',
    color: Colors.settingText,
    fontWeight:'bold',
  },
});
