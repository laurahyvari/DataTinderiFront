import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function PlayerSCreen(props) {

  const navigateToHome = () => {
    props.navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text>Player page</Text>
      <Button onPress={navigateToHome} title={'Home'}/>
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