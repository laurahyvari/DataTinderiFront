import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function PlayerSCreen({ navigation, route }) {

  const { program_id } = route.params.program.data;
  console.log(program_id);
  const navigateToHome = () => {
    props.navigation.navigate('Home')
  }

  return (
    <View>
      <Text>Player page</Text>
      <Button onPress={navigateToHome} title={'Home'} />
      <Text>{program_id}</Text>
      <StatusBar style="auto" />
    </View>
  )
}