import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

export default function ListScreen(props) {

  useEffect(() => {
    console.log('User liked these: ', props.likedPrograms)
  }, [])

  const navigateToPlayer = () => {
    props.navigation.navigate('Player')
  }

  return (
    <View>
      <Text>List page</Text>
      <Button onPress={navigateToPlayer} title={'Player'}/>
      <StatusBar style="auto" />
    </View>
  )
}