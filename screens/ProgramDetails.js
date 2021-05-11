import React from 'react'
import { useState, useEffect } from 'react'
import { Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Api from '../utils/Api'
import { useIsFocused } from '@react-navigation/native'
import { Text, Card } from 'react-native-elements'

const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
const maxHeight = Math.round(Dimensions.get('window').height * 0.4)

export default function ProgramDetails({ route, navigation, }) {
  // käytetään näitä arvoja jo ohjelman kuvaa haettaessa (alempana Image-komponentin source)
  // pienemmän kuvan hakeminen on nopeampaa ja joka tapauksessa se olisi skaalattu mahtumaan kortille
  const [suositukset, setSuositukset] = useState([])
  const [loadingSuositut, setLoadingSuositut] = useState(true)
  const isFocused = useIsFocused()

  useEffect(() => {
    const haeSuositukset = async () => {
      const haetut = await Api.getSimilarPrograms(program._id)
      setSuositukset(haetut)
      setLoadingSuositut(false)
    }
    haeSuositukset()
    
  }, [isFocused])
  
  const program = route.params

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card} key={program._id}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{program.title.fi}</Text>
            <Text style={styles.punchLine}>{program.shortDescription ? program.shortDescription.fi : ''}</Text>
            <Text style={styles.cardDescription}>{program.description ? program.description.fi : ''}</Text>
            <Text style={styles.age}>{program.contentRating.ageRestriction 
              ? `Ikäraja: ${program.contentRating.ageRestriction} +`
              : 'Ikäraja: Ei tiedossa'}
            </Text>
          </View>
          <View style={styles.showImage}>
            {program.image &&
              <Image
                style={styles.image}
                source={{
                  uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${program.image.id}`
                }}
              />}
          </View>
        </View>
        <View style={styles.recommendations}>
          <Text style={styles.recommendationsTitle}>Lisää samankaltaisia</Text>
          <ScrollView horizontal={true}>
            {loadingSuositut
              ? null
              : suositukset.map((suositus) => {
                return (
                  <TouchableOpacity onPress={() =>
                    navigation.navigate("Ohjelmatiedot", suositus)

                  }
                  key={suositus._id}>
                    <Card containerStyle={styles.cards}>
                      <View
                        style={styles.popularCard} 
                        key={suositus._id}>
                        {suositus.image && <ImageBackground
                          style={styles.cardImage}
                          source={{
                            uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${suositus.image.id}`
                          }}>
                            <Text style={styles.imageTitle}>{suositus.title.fi || 'Ohjelman nimi'}</Text>
                          </ImageBackground>}
                      </View>
                    </Card>
                  </TouchableOpacity>
                )
              })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2176AE',
  },
  punchLine: {
    fontSize: 18,
    color: 'white'
  },
  card: {
    marginTop: 20,
    flex: 1,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: '2%',
    marginRight: '2%',
  },
  cardTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  showImage: {
    height: maxHeight,
    justifyContent: 'flex-end'
  },
  age: {
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
  },
  recommendationsTitle: {
    margin: '2%',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cards: {
    margin:0,
    padding: 0,
    borderWidth: 1,
    borderColor: '#000000a0',
    backgroundColor: '#2176AE'
  },
  popularCard: {
    height: maxWidth * 0.6,
    width: maxWidth * 0.6,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  imageTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  cardDescription: {
    color: 'white'
  }
})
