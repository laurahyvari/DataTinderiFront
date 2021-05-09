
import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'
import Api from '../utils/Api'
import { Text, Card } from 'react-native-elements'
import { useIsFocused } from "@react-navigation/native";
const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
const maxHeight = Math.round(Dimensions.get('window').height * 0.4)

export default function ListScreen({ navigation }) {
  const [suositut, setSuositut] = useState([])
  const [kayttajaSuositukset, setKayttajaSuositukset] = useState([])
  const [loadingSuositut, setLoadingSuositut] = useState(true)
  const [loadingKayttajan, setLoadingKayttajan] = useState(true)
  const isFocused = useIsFocused();

  useEffect(() => {
    const haeSuositut = async () => {
      const haetut = await Api.getPopularPrograms()
      setSuositut(haetut);
      setLoadingSuositut(false)
    }
    haeSuositut()
    console.log("Moi")
  }, [isFocused])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sliderContainer}>
          <Text style={styles.header}>Suositut</Text>
          <ScrollView horizontal={true}>
            {loadingSuositut
              ? null
              : suositut.map((suosittu) => {
                return (
                  <TouchableOpacity onPress={() =>
                    console.log(suosittu.image.id)
                  }
                    key={suosittu._id}>
                    <Card containerStyle={styles.cards}>
                      <View key={suosittu._id}>
                        {suosittu.image && <Image
                          style={styles.cardImage}
                          source={{
                            uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${suosittu.image.id}`
                          }}
                        />}
                        <Text style={styles.title}>{suosittu.title.fi || 'Ohjelman nimi'}</Text>

                      </View>
                    </Card>
                  </TouchableOpacity>
                )
              })}
          </ScrollView>
          <Text style={styles.header}>Saatat pitää näistä</Text>
          <ScrollView horizontal={true}>
          
            {loadingSuositut
              ? null
              : suositut.map((suosittu) => {
                return (
                  <TouchableOpacity onPress={() =>
                    console.log(suosittu.image.id)
                  }
                    key={suosittu._id}>
                    <Card containerStyle={styles.cards}>
                      <View key={suosittu._id}>
                        {suosittu.image && <Image
                          style={styles.cardImage}
                          source={{
                            uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${suosittu.image.id}`
                          }}
                        />}
                        <Text style={styles.title}>{suosittu.title.fi || 'Ohjelman nimi'}</Text>

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
    backgroundColor: '#2176AE'
  },

  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },

  cards: {
    borderWidth: 0,
    backgroundColor: "black",
  },

  sliderContainer: {
    marginTop: 50,
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 50
  },

  cardImage: {
    width: 300,
    height: 300,
    backgroundColor: "#000"
  },

  title: {
    fontSize: 24,
    justifyContent: "center",
    backgroundColor: "#000",
    color: "white",
    alignSelf: "center",
  },

})
