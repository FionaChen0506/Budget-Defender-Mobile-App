import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationManager from '../components/NotificationManager'
import * as Notifications from "expo-notifications";


const NotificationSetting = () => {
  return (
    <View>
      <NotificationManager />
    </View>
  )
}

export default NotificationSetting

const styles = StyleSheet.create({})