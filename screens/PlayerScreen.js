import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function PlayerSCreen(props) {

  const navigateToHome = () => {
    props.navigation.navigate('Home')
  }

  return (
    <View>
      <Text>Player page</Text>
      <Button onPress={navigateToHome} title={'Home'}/>
      <StatusBar style="auto" />
    </View>
  )
}