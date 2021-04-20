import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

const Card = ({ cardData }) => {
  // käytetään näitä arvoja jo ohjelman kuvaa haettaessa (alempana Image-komponentin source)
  // pienemmän kuvan hakeminen on nopeampaa ja joka tapauksessa se olisi skaalattu mahtumaan kortille
  const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
  const maxHeight = Math.round(Dimensions.get('window').height * 0.4)

  return (
    <View style={styles.card} key={cardData._id}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{cardData.title.fi || 'Ohjelman nimi'}</Text>
        <Text style={styles.cardDescription}>{cardData.description ? cardData.description.fi : ''}</Text>
      </View>
      {cardData.image && <Image
        style={styles.cardImage}
        source={{
          uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${cardData.image.id}`
        }}
      />}
    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
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

export default Card
