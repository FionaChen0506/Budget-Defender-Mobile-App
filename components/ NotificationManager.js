import { View, Text, Button, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
  const verifyPermission = async () => {
    const status = await Notifications.getPermissionsAsync();
    if (status.granted) {
      return true;
    }
    const response = await Notifications.requestPermissionsAsync({
      ios: { allowBadge: true },
    });
    return response.granted;
  };
  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to send notification");
        return;
      }
      Notifications.scheduleNotificationAsync({
        content: {
          title: "first notification",
          body: "OUR FIRST NOTIFICATION EVER!",
          data: { url: "https://google.com" },
        },
        trigger: { seconds: 5 },
      });
    } catch (err) {
      console.log("schedule notification error ", err);
    }
  };
  return (
    <View>
      <Button
        title="Remine me to add a goal daily"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}