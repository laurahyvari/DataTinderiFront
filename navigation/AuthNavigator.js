import * as React from 'react'
import { useState, useEffect, createContext } from 'react'
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'
import firebase from '../config/Firebase'

export default function AuthNavigator () {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged (user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  if (initializing) return null

  return user
    ? (
      <AuthContext.Provider value={user}>
        <LoggedInNav />
      </AuthContext.Provider>
    )
    : (
      <LoggedOutNav />
    )
}
export const AuthContext = createContext(null)
