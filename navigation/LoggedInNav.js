import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import ListScreen from '../screens/ListScreen'
import ProgramDetails from '../screens/ProgramDetails'
import { createStackNavigator } from "@react-navigation/stack"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function App() {

  const ListScreenStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Suositukset" component={ListScreen} />
        <Stack.Screen name="Ohjelmatiedot" component={ProgramDetails} />
      </Stack.Navigator>
    )
  }
  const TabComponent = () => {
    return (
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
              )
            } else if (route.name === 'Suositukset') {
              return (
                <Ionicons
                  name={'list'}
                  size={size}
                  color={color}
                />
              )
            }
          }
        }
        )}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showLabel: false
        }}
        sceneContainerStyle={styles.container}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Suositukset" component={ListScreenStack} />
      </Tab.Navigator>
    )
  }


  return (

    <NavigationContainer>
      <TabComponent />
    </NavigationContainer >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  }
})
