import * as React from 'react'
import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import LoggedInNav from './LoggedInNav'
import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WelcomeScreen from '../screens/WelcomeScreen'

export default function AuthNavigator () {
  const [token, setToken] = useState(null)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    const localToken = await AsyncStorage.getItem('uuid')

    if (localToken === null) {
      console.log('No user token found, first time login')
      const uuid = uuidv4()
      console.log('setting new token:', uuid)
      await AsyncStorage.setItem('uuid', uuid)
      setToken(uuid)
    } else {
      console.log('using user token:', localToken)
      setToken(localToken)
      setShowIntro(false)
    }
  }

  const onHideIntro = () => {
    setShowIntro(false)
  }

  if (token === null || showIntro) {
    return <WelcomeScreen onHideIntro={onHideIntro} />
  }

  return (
    <LoggedInNav />
  )
}
