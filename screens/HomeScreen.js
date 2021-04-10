
import React, { useState, useEffect } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Api from '../utils/Api'
import firebase from '../config/Firebase'
const renderCard = (cardData, cardIndex) => {
  // käytetään näitä arvoja jo ohjelman kuvaa haettaessa (alempana Image-komponentin source)
  // pienemmän kuvan hakeminen on nopeampaa ja joka tapauksessa se olisi skaalattu mahtumaan kortille
  const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
  const maxHeight = Math.round(Dimensions.get('window').height * 0.4)

  return (
    <View style={styles.card} key={cardData.id}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{cardData.title || 'Ohjelman nimi'}</Text>
        <Text style={styles.cardDescription}>{cardData.description ? cardData.description.fi : ''}</Text>
      </View>
      {cardData.image_id && <Image
        style={styles.cardImage}
        source={{
          uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${cardData.image_id.id}`
        }}
      />}
    </View>
  )
}

export default function HomeScreen () {
  const [cards, setCards] = useState([])

  const [swipeComponent, setSwipeComponent] = useState(null)

  useEffect(() => {
    refreshSuggestions()
  }, [])

  const refreshSuggestions = async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    const newSuggestions = await Api.getSuggestions(10, token)
    console.log(token)
    setCards(newSuggestions)
  }

  // TODO: korvataanko kaikkia swaippeja käsittelevä onSwiped -funktio mielummin erillisillä funktioilla?
  // esim. onLike(), onDislike() jne?
  // TODO: selvitettävä myös käytetäänkö edes kaikkia swipe -suuntia vai ei?
  const onSwiped = async (index, type) => {
    console.log(`on swiped ${type}`)
    if (type === 'right') {
      console.log(`LIKE: ${index}`)

      // Tämä tilamuuttujaan ja jonkinlainen refresh -metodi pitämään tokenia yllä.
      const token = await firebase.auth().currentUser.getIdToken()
      // Ei bueno, mut riittää demoon.
      await Api.addLike(cards[index].id, token)
    }
  }

  const onSwipedAllCards = () => {
    // TODO: halutaanko tehdä jotain kun kaikki haetut kortit on swaipattu? Esim. haetaan lisää ehdotuksia?
  }

  const onSwipeBack = () => {
    console.log('Back button pressed!')
    swipeComponent.swipeBack()
  }

  const onTapCard = () => {
    console.log('on card tapped')
    swipeComponent.swipeLeft()
  }

  return (
    <View style={styles.container}>
      { cards.length > 0
        ? (
          <Swiper
            ref={swiper => { setSwipeComponent(swiper) }}
            onSwiped={(index) => onSwiped(index, 'general')}
            onSwipedLeft={(index) => onSwiped(index, 'left')}
            onSwipedRight={(index) => onSwiped(index, 'right')}
            onSwipedTop={(index) => onSwiped(index, 'top')}
            onSwipedBottom={(index) => onSwiped(index, 'bottom')}
            onTapCard={onTapCard}
            cards={cards}
            cardVerticalMargin={80}
            renderCard={renderCard}
            onSwipedAll={onSwipedAllCards}
            stackSize={3}
            stackSeparation={15}
            overlayLabels={overlayLabels}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          >
            <Button onPress={onSwipeBack} title='Swipe Back' />
          </Swiper>
        )
        : (
          <></>
        )}
    </View>
  )
}

const labelStyle = {
  backgroundColor: 'black',
  borderColor: 'black',
  color: 'white',
  borderWidth: 1
}
const centerWrapperStyle = {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}
const rightWrapperStyle = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginTop: 30,
  marginLeft: 30
}
const leftWrapperStyle = {
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  marginTop: 30,
  marginLeft: -30
}

const overlayLabels = {
  bottom: {
    title: 'BLEAH',
    style: { label: labelStyle, wrapper: centerWrapperStyle }
  },
  left: {
    title: 'NOPE',
    style: { label: labelStyle, wrapper: leftWrapperStyle }
  },
  right: {
    title: 'LIKE',
    style: { label: labelStyle, wrapper: rightWrapperStyle }
  },
  top: {
    title: 'SUPER LIKE',
    style: { label: labelStyle, wrapper: centerWrapperStyle }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
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
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
