import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
      >
        <Tab.Screen 
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen 
          name="List"
          component={ListScreen}
          options={{ title: 'List' }}
        />
        <Tab.Screen 
          name="Player"
          component={PlayerScreen}
          options={{ title: 'Player' }}
        />
        <Tab.Screen 
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Tab.Navigator>
    {/*}
      <View style={styles.container}>
        <Text>DataTinderi app moikku</Text>
        <StatusBar style="auto" />
      </View>
    {*/}
    </NavigationContainer>
  );
}


