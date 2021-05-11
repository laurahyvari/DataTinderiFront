import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native'
import Api from '../utils/Api'
import { Text, Card } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
const maxHeight = Math.round(Dimensions.get('window').height * 0.6)

export default function ListScreen ({ navigation }) {
  const [suositut, setSuositut] = useState([])
  const [kayttajaSuositukset, setKayttajaSuositukset] = useState([])
  const [loadingSuositut, setLoadingSuositut] = useState(true)
  const [loadingKayttajan, setLoadingKayttajan] = useState(true)
  const isFocused = useIsFocused()

  useEffect(() => {
    const haeSuositut = async () => {
      const haetut = await Api.getPopularPrograms()
      setSuositut(haetut)
      setLoadingSuositut(false)
    }

    const haeSuositukset = async () => {
      const haetutSuositukset = await Api.getRecommendations()
      setKayttajaSuositukset(haetutSuositukset)
      setLoadingKayttajan(false)
    }
    haeSuositut()
    haeSuositukset()
  }, [isFocused])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.sliderContainer}>
          <Text style={styles.header}>Suositut</Text>
          <ScrollView horizontal={true}>
            {loadingSuositut
              ? null
              : suositut.map((suosittu) => {
                return (
                  <TouchableOpacity onPress={() =>
                    navigation.navigate('Ohjelmatiedot', suosittu)

                  }
                  key={suosittu._id}>
                    <Card containerStyle={styles.cards}>
                      <View
                        style={styles.popularCard}
                        key={suosittu._id}>
                        {suosittu.image && <ImageBackground
                          style={styles.cardImage}
                          source={{
                            uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${suosittu.image.id}`
                          }}>
                          <Text style={styles.title}>{suosittu.title.fi || 'Ohjelman nimi'}</Text>
                        </ImageBackground>}
                      </View>
                    </Card>
                  </TouchableOpacity>
                )
              })}
          </ScrollView>
          <Text style={styles.header}>Saatat pitää näistä</Text>
          <ScrollView
            style={styles.scrollContainer}
            horizontal={true}>
            {loadingKayttajan
              ? null
              : kayttajaSuositukset.map((kayttajaSuositus) => {
                return (
                  <TouchableOpacity onPress={() =>
                    navigation.navigate('Ohjelmatiedot', kayttajaSuositus)
                  }
                  key={kayttajaSuositus._id}>
                    <Card containerStyle={styles.cards}>
                      <View
                        style={styles.popularCard}
                        key={kayttajaSuositus._id}>
                        {kayttajaSuositus.image && <ImageBackground
                          style={styles.cardImage}
                          source={{
                            uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${kayttajaSuositus.image.id}`
                          }}>
                          <Text style={styles.title}>{kayttajaSuositus.title.fi || 'Ohjelman nimi'}</Text>
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
    padding: 5
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20
  },
  cards: {
    margin: 0,
    padding: 0,
    borderWidth: 1,
    borderColor: '#000000a0',
    backgroundColor: '#2176AE'
  },
  popularCard: {
    height: maxWidth * 0.6,
    width: maxWidth * 0.6
  },
  sliderContainer: {
    marginTop: 10
  },
  cardImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0'
  }
})
