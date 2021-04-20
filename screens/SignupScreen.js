import * as React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity

} from 'react-native'
import axios from 'axios'
import { useState } from 'react'
import { Text, Input } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

export default function SignupScreen ({ navigation }) {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toggle, setToggle] = useState(true)

  const handleSignUp = async () => {
    // FIXME - tämä try catch ei koskaan palauta virhettä. Siirtyy aina login.
    try {
      await axios.post('https://data-tinder-back.herokuapp.com/register', {
        email: email,
        firstName: firstname,
        lastName: lastname,
        password: password
      }).then(() => navigation.navigate('Login'))
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>register</Text>

      <Input
        containerStyle={styles.inputBox}
        value={firstname}
        onChangeText={(firstname) => setFirstName(firstname)}
        placeholder="Firstname"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={lastname}
        onChangeText={(lastname) => setLastName(lastname)}
        placeholder="Lastname"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
        leftIcon={<Ionicons name="ios-mail" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={password}
        inputStyle={{ color: 'white' }}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
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
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
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
    backgroundColor: '#FAA00F',
    borderColor: '#FAA00F',
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
