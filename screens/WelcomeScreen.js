
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'

export default function WelcomeScreen ({ onHideIntro }) {
  const [index, setIndex] = useState(0)

  const onNextPress = () => {
    setIndex(index + 1)
  }

  const onBackPress = () => {
    if (index >= 1) {
      setIndex(index - 1)
    }
  }

  if (index === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tervetuloa!</Text>
        <Text style={styles.text}>Tämän sovelluksen avulla voit nopeasti ja vaivattomasti tutustua Yle Areenan ohjelmatarjontaan.</Text>
        <Text style={styles.text}>Sovellus tallentaa tietoja siitä, minkälaisista ohjelmista pidät, ja suosittelee tykkäyksiesi perusteella juuri sinulle sopivaa sisältöä.</Text>
        <Button title='Jatka' onPress={onNextPress} />
        <StatusBar style="auto" />
      </View>
    )
  } else if (index === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kun törmäät kiinnostavalta vaikuttavaan sisältöön, pyyhkäise se <Text style={styles.bold}>oikealle</Text> tallentaaksesi tykkäyksesi.</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Edellinen' onPress={onBackPress} />
          </View>
          <View style={styles.button}>
            <Button title='Jatka' onPress={onNextPress} />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    )
  } else if (index === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Jos taas ehdotettu sisältö ei kiinnosta, pyyhkäise se <Text style={styles.bold}>vasemmalle</Text>.</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Edellinen' onPress={onBackPress} />
          </View>
          <View style={styles.button}>
            <Button title='Jatka' onPress={onNextPress} />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2176AE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    marginHorizontal: 36
  },
  text: {
    margin: 16,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
  bold: {
    fontWeight: 'bold',
    color: '#8ff0ff'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff'
  }

})
