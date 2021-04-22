import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

export default function card (props) {
  // käytetään näitä arvoja jo ohjelman kuvaa haettaessa (alempana Image-komponentin source)
  // pienemmän kuvan hakeminen on nopeampaa ja joka tapauksessa se olisi skaalattu mahtumaan kortille
  const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
  const maxHeight = Math.round(Dimensions.get('window').height * 0.4)

  return (
    <View style={styles.card} key={props.cardData._id}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{props.cardData.title.fi || 'Ohjelman nimi'}</Text>
        <Text style={styles.cardDescription}>{props.cardData.description ? props.cardData.description.fi : ''}</Text>
      </View>
      {props.cardData.image && <Image
        style={styles.cardImage}
        source={{
          uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${props.cardData.image.id}`
        }}
      />}
    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 2 }
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  cardText: {},
  cardImage: {
    resizeMode: 'contain',
    flex: 2
  }

})
