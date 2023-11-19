import { View, Text } from 'react-native'
import React from 'react'
import EntriesList from '../components/EntriesList'

export default function AllExpenses({navigation}) {
  return (
    <View>
      <Text>AllExpenses</Text>
      <EntriesList navigation={navigation} />
    </View>
  )
}