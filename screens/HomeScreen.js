import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function HomeScreen(props) {

  const navigateToList = () => {
    props.navigation.navigate('List')
  }

  return (
    <View>
      <Text>DataTinderi app moikku</Text>
      <Button onPress={navigateToList} title={'List'}/>
      <StatusBar style="auto" />
    </View>
  )
}