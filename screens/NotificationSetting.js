import React, { useState } from 'react';
import { View, Text, Button, Modal, TimePickerAndroid,StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import {verifyPermission,NotificationManager  } from '../components/NotificationManager';
import NotificationManager from '../components/NotificationManager';
import { cancelNotification } from '../components/NotificationManager';

const NotificationSetting = () => {
  const [chosenTime, setChosenTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date()); 

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmTime = (time) => {
    hideDatePicker();
    setSelectedTime(time);

    // Format the selected time without leading zero for single-digit hours and minutes
    // const formattedHour = time.getHours().toString().padStart(2, '0');
    // const formattedMinute = time.getMinutes().toString().padStart(2, '0');
    const formattedHour = time.getHours().toString();
    const formattedMinute = time.getMinutes().toString();
    const formattedTime = `${formattedHour}:${formattedMinute}`;

    // Pass the formatted time to NotificationManager 
    console.log('Formatted Time:', formattedTime);
    console.log('Formatted Hour:', formattedHour);
    // NotificationManager(formattedHour,formattedMinute)

  };   

  const handleTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: false,
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        const formattedTime = `${hour}:${minute}`;
        setSelectedTime(formattedTime);
        setModalVisible(false);
        //scheduleDailyNotification(hour, minute);
        NotificationManager(hour,minute)
      }
    } catch (error) {
      console.warn('Error opening time picker', error);
    }
  };

  return (
    <View>
      <Text>Notification Settings</Text>
      <Button title="Allow Daily Notifications" onPress={showDatePicker} />

        <DateTimePickerModal
          testID="dateTimePicker"
          isVisible={isDatePickerVisible}
          value={chosenTime}
          onCancel={hideDatePicker}
          mode="time"
          is24Hour={true}
          onConfirm={confirmTime}
        />

        <NotificationManager/>
        <Button title="Cancel Notifications" onPress={cancelNotification} />
        
    </View>
  );
};

export default NotificationSetting;
