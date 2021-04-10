import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function PlayerSCreen ({ navigation, route }) {
  const { programId } = route.params.program.data
  console.log(programId)
  const navigateToHome = () => {
    navigation.navigate('Home')
  }

  return (
    <View>
      <Text>Player page</Text>
      <Button onPress={navigateToHome} title={'Home'} />
      <Text>{programId}</Text>
      <StatusBar style="auto" />
    </View>
  )
}
