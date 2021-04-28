import * as React from 'react'
import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import LoggedInNav from './LoggedInNav'
import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AuthNavigator () {
  const [token, setToken] = useState(null)

  useEffect(() => {
    getToken()
    console.log(token)
  }, [])

  const getToken = async () => {
    const localToken = await AsyncStorage.getItem('uuid')

    if (localToken === null) {
      const uuid = uuidv4()
      await AsyncStorage.setItem('uuid', uuid)
      setToken(uuid)
      console.log(token)
    } else {
      setToken(localToken)
      console.log(token)
    }
  }

  if (token === null) {
    return <View><Text>Loading</Text></View>
  }

  return (
    <LoggedInNav />
  )
}
