import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import firebase from '../config/Firebase'
import { FontAwesome } from '@expo/vector-icons'
import { Button, Text, Input } from 'react-native-elements'

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [toggle, setToggle] = useState(true)

  async function login () {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> DataTinder </Text>

      <Input
        containerStyle={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="email"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        leftIcon={<FontAwesome name="envelope-o" size={24} color="white" />}
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

      <TouchableOpacity style={styles.button} onPress={() => login()}>
        <Text style={styles.buttonText}>Kirjaudu sisään</Text>
      </TouchableOpacity>
      <Button
        buttonStyle={styles.registerBtn}
        title="Rekisteröi tili"
        onPress={() => navigation.navigate('Signup')}
      />

      <View style={styles.forgot}>
        <Button
          buttonStyle={styles.forgotBtn}
          title="Salasana unohtunut?"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>
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

  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15
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
  buttonSignup: {
    fontSize: 12
  },

  forgot: {
    bottom: 0,
    position: 'absolute'
  },

  forgotBtn: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#A0204C',
    borderColor: '#A0204C',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },

  registerBtn: {
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#23103A',
    borderColor: '#23103A',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  }
})
