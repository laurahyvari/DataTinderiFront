import  'react-native-gesture-handler'
import React from 'react';

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from './screens/HomeScreen'
import ListScreen from './screens/ListScreen'
import PlayerScreen from './screens/PlayerScreen'
import SettingsScreen from './screens/SettingsScreen'

const Tab = createBottomTabNavigator();

import { Text, View } from 'react-native';
import ApiDemo from './components/ApiDemo';


export default function App() {

  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'List') {
              return (
                <Ionicons
                  name={'list'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Player') {
              return (
                <Entypo
                  name={'video'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Settings') {
              return (
                <FontAwesome5
                  name={focused ? 'user-alt' : 'user'}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showLabel: false
        }}
        sceneContainerStyle={styles.container}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Player" component={PlayerScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>

      
      
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


