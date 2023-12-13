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
          hour: chosenHour,
          minute: chosenMinute,
          //type:'daily',
          repeats: true
        },
      });
      // console.log("notification at:" ,chosenHour,chosenMinute)
    } catch (err) {
      console.log("schedule notification error ", err);
    }
  };

}

export const scheduleDailyNotification = async (chosenHour, chosenMinute) => {
  // delete old notifications before adding a new one
  await Notifications.cancelAllScheduledNotificationsAsync();  
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
          hour: chosenHour,
          minute: chosenMinute,
          //type:'daily',
          repeats: true
        },
      });
      console.log("notification at:" ,chosenHour,chosenMinute)
    } catch (err) {
      console.log("schedule notification error ", err);
    }
};

export async function cancelNotification(){
  await Notifications.cancelAllScheduledNotificationsAsync();
}