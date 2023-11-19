import { View, Text } from 'react-native'
import React from 'react'
import EntriesList from '../components/EntriesList'

export default function AllExpenses({navigation}) {
  return (
    <View>
      <EntriesList navigation={navigation} />
    </View>
  )
}