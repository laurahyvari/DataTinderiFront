import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import ListScreen from './screens/ListScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen 
          name="List"
          component={ListScreen}
          options={{ title: 'List' }}
        />
      </Stack.Navigator>
    {/*}
      <View style={styles.container}>
        <Text>DataTinderi app moikku</Text>
        <StatusBar style="auto" />
      </View>
    {*/}
    </NavigationContainer>
  );
}


