import React, { useState } from 'react';
import { View, Text, Button, Switch,StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { scheduleDailyNotification, cancelNotification } from '../components/NotificationManager';
import LinearGradientComp from '../components/LinearGradient';
import { useEffect } from 'react';
import { database, auth } from '../firebase/firebaseSetup';
import { collection,  getDocs, query, where,doc, onSnapshot } from "firebase/firestore";
import { updateInUsersDB } from '../firebase/firebaseHelper';
import { isTimestamp } from 'firebase/firestore';


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
          console.log('User document not found.');
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
    <View>
      {!isNotification&&
        <Button title="Set Daily Notifications" onPress={showDatePicker} />}
        <DateTimePickerModal
          testID="dateTimePicker"
          isVisible={isDatePickerVisible}
          value={chosenTime}
          onCancel={hideDatePicker}
          mode="time"
          is24Hour={true}
          onConfirm={confirmTime}
        />

        {/* {isNotification &&
        <Button title="Cancel Notifications" onPress={cancelNotificationHandler} />} */}
        {isNotification && (
          <View>
            <Text>Your Daily Notification is at: {formatTime(notificationTime)}</Text>
            <Button title="Cancel Notifications" onPress={cancelNotificationHandler} />
          </View>
      )}
    </View>
    </LinearGradientComp>
  );
};

export default NotificationSetting;
