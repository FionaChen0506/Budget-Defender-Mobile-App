import React, { useState } from 'react';
import { View, Text, Button, Modal, TimePickerAndroid,StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import {verifyPermission,NotificationManager  } from '../components/NotificationManager';
import NotificationManager from '../components/NotificationManager';
import { scheduleDailyNotification, cancelNotification } from '../components/NotificationManager';
import LinearGradientComp from '../components/LinearGradient';


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

    const formattedHour = parseInt(time.getHours());
    const formattedMinute = parseInt(time.getMinutes());
    const formattedTime = `${formattedHour}:${formattedMinute}`;

    // Pass the formatted time to NotificationManager 
    //console.log('Formatted Time:', formattedTime);
    scheduleDailyNotification(formattedHour,formattedMinute)

  };   

  return (
    <LinearGradientComp>
    <View>
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

        <Button title="Cancel Notifications" onPress={cancelNotification} />
        
    </View>
    </LinearGradientComp>
  );
};

export default NotificationSetting;
