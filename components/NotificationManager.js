import { View, Text, Button, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export const verifyPermission = async () => {
  const status = await Notifications.getPermissionsAsync();
  if (status.granted) {
    return true;
  }
  const response = await Notifications.requestPermissionsAsync({
    ios: { allowBadge: true },
  });
  return response.granted;
};

export default function NotificationManager() {
  // const scheduleNotificationHandler = async (hour,minute) => {
    const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to send notification");
        return;
      }
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Budget-Defender",
          body: "Hi! It's time to record your expenses!",
        },
        trigger: { 
          // seconds: 5 ,
          hour: 23, // show this notification every day, 23:51
          minute: 51,
          //type:'daily',
          repeats: true
        },
      });
    } catch (err) {
      console.log("schedule notification error ", err);
    }
  };


  
  return (
    <View>
      <Button
        title="Remine me to record expenses daily"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}

export async function cancelNotification(){
  await Notifications.cancelAllScheduledNotificationsAsync();
}