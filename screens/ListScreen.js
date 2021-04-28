
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ListScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nothing here</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2176AE',
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
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }

})
