import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen(props) {

  const navigateToList = () => {
    props.navigation.navigate('List')
  }

  return (
    <View style={styles.container}>
      <Text>DataTinderi app moikku</Text>
      <Button onPress={navigateToList} title={'List'}/>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});