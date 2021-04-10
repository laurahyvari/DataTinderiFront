import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, StyleSheet, Alert, Button } from 'react-native'

import firebase from '../config/Firebase'
export default function SettingsScreen () {
  async function logout () {
    try {
      await firebase.auth().signOut()
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => logout()} title="Logout" />

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282D4F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    borderColor: '#FF6C00',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }

})
