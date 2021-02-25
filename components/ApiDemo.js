import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import Api from '../utils/Api'

// tämä komponentti ei tee mitään tärkeää, toimii ainoastaan esimerkkinä utils/Api käytöstä
// TODO: poista tämä komponentti

export default function ApiDemo() {
  const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
      refreshSuggestions()
    }, [])

    const onRefreshPress = () => {
      refreshSuggestions()
    }

    // Api.getSuggestions() haluaa parametrina määrän kuinka monta ohjelma-ehdotusta haetaan
    // funktio palauttaa promisen joten täytyy käyttää async/await tai .then():iä vastauksen käsittelyyn
    const refreshSuggestions = async () => {
      const newSuggestions = await Api.getSuggestions(10)
      setSuggestions(newSuggestions)
    }

  return (
    <View>
      {suggestions.length > 0 && 
        suggestions.map(program => (
          <View key={program._id}>
            <Text>{program.title}</Text>
          </View>
        ))
      }
      <Button onPress={onRefreshPress} title='Refresh' />
    </View>
  )
}