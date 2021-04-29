import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

export default function card (props) {
  // käytetään näitä arvoja jo ohjelman kuvaa haettaessa (alempana Image-komponentin source)
  // pienemmän kuvan hakeminen on nopeampaa ja joka tapauksessa se olisi skaalattu mahtumaan kortille
  const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
  const maxHeight = Math.round(Dimensions.get('window').height * 0.4)

  function movieCard() {
    return (
      <View style={styles.card} key={props.cardData._id}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{props.cardData.title.fi}</Text>
          <Text style={styles.punchLine}>{props.cardData.shortDescription ? props.cardData.shortDescription.fi : ''}</Text>
          <Text style={styles.cardDescription}>{props.cardData.description ? props.cardData.description.fi : ''}</Text>
          <View style={styles.age}>
            <Text>{props.cardData.contentRating.ageRestriction === 0 
              ? props.cardData.contentRating.title.fi : `Ikäraja: ${props.cardData.contentRating.ageRestriction}+`}
            </Text>
          </View>
        </View>
        <View style={styles.cardImage}>
          {props.cardData.image && 
          <Image
            style={styles.image}
            source={{
              uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${props.cardData.image.id}`
            }}
          />}
        </View>
      </View>
    )
  }

  function seriesCard() {
    return (
      <View style={styles.card} key={props.cardData._id}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{props.cardData.partOfSeries.title.fi}</Text>
          <Text style={styles.punchLine}>{props.cardData.partOfSeries.shortDescription ? props.cardData.partOfSeries.shortDescription.fi : ''}</Text>
          <Text style={styles.cardDescription}>{props.cardData.partOfSeries.description ? props.cardData.partOfSeries.description.fi : ''}</Text>
          <View style={styles.age}>
            <Text>{props.cardData.contentRating.ageRestriction === 0 
              ? props.cardData.contentRating.title.fi : `Ikäraja: ${props.cardData.contentRating.ageRestriction}+`}
            </Text>
          </View>
        </View>
        <View style={styles.cardImage}>
          {props.cardData.partOfSeries.image && 
          <Image
            style={styles.image}
            source={{
              uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${props.cardData.partOfSeries.image.id}`
            }}
          />}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {props.cardData.partOfSeries === undefined ? movieCard() : seriesCard()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  punchLine: {
    fontSize: 18,
  },  
  card: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 2 }
  },
  cardTextContainer: {
    marginLeft: '2%',
    marginRight: '2%',
    height: '60%',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardDescription: {
  },
  cardImage: {
    height: '40%'
  },
  age: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%'
  },
  image: {
    resizeMode: 'cover',
    flex: 1
  }
})
