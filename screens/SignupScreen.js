import * as React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useState } from 'react'
import firebase, { db } from '../config/Firebase'
import { Text, Input } from 'react-native-elements'

import { Ionicons, FontAwesome } from '@expo/vector-icons'
export default function SignupScreen ({ navigation }) {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [toggle, setToggle] = useState(true)

  async function handleSignUp () {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const uid = userCredentials.user.uid

          db.ref('users').child(uid).child('details').set({
            firstname: firstname,
            lastname: lastname
          })
        })
        .then(() => navigation.navigate('Login'))
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>register</Text>

      <Input
        containerStyle={styles.inputBox}
        value={firstname}
        onChangeText={(firstname) => setFirstName(firstname)}
        placeholder="firstname"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={lastname}
        onChangeText={(lastname) => setLastName(lastname)}
        placeholder="lastname"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="email"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        leftIcon={<Ionicons name="ios-mail" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={password}
        inputStyle={{ color: 'white' }}
        onChangeText={(password) => setPassword(password)}
        placeholder="password"
        secureTextEntry={!!toggle}
        placeholderTextColor="white"
        leftIcon={<FontAwesome name="lock" size={24} color="white" />}
        rightIcon={
          toggle
            ? (
              <FontAwesome
                name="eye"
                size={24}
                color="white"
                onPress={() => {
                  setToggle(!toggle)
                  console.log(toggle)
                }}
              />
            )
            : (
              <FontAwesome
                name="eye-slash"
                size={24}
                color="white"
                onPress={() => {
                  setToggle(!toggle)
                  console.log(toggle)
                }}
              />
            )
        }
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>signup</Text>
      </TouchableOpacity>
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

  header: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white'
  },

  text: {
    color: 'white'
  },

  inputBox: {
    width: '85%',
    padding: 10,
    fontSize: 16,

    textAlign: 'center',
    color: 'white'
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
