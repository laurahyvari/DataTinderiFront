
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

export default function HomeScreen () {
  const [cards, setCards] = useState([])
  const [swipeComponent, setSwipeComponent] = useState(null)
  const [token, setToken] = useState(null);

  const fetchToken = async () => {
    const fetchedToken = await firebase.auth().currentUser.getIdToken();
    setToken(fetchedToken);
  }

  const refreshSuggestions = async () => {
    const newSuggestions = await Api.getSuggestions(10, token)
    setCards(newSuggestions)
  }

  // TODO: korvataanko kaikkia swaippeja käsittelevä onSwiped -funktio mielummin erillisillä funktioilla?
  // esim. onLike(), onDislike() jne?
  // TODO: selvitettävä myös käytetäänkö edes kaikkia swipe -suuntia vai ei?
  const onSwiped = async (index, type) => {
    const programType = cards[index].partOfSeries === undefined ? 'movies' : 'series'
    let vote = 0
    switch (type) {
    case 'right':
      vote = 1
      await Api.addVote(cards[index]._id, programType, vote, token)
      break
    case 'left':
      vote = -1
      await Api.addVote(cards[index]._id, programType, vote, token)
      break
    }
  }

  const onSwipeBack = () => {
    console.log('Back button pressed!')
    swipeComponent.swipeBack()
  }

  useEffect(() => {
    fetchToken();
  }, [])

  useEffect(() => {
    if (token !== null) {
      refreshSuggestions();
    }
  }, [token])

  return (
    <View style={styles.container}>
      {cards.length > 0
        ? (
          <Swiper
            ref={swiper => { setSwipeComponent(swiper) }}
            onSwiped={(index) => onSwiped(index, 'general')}
            onSwipedLeft={(index) => onSwiped(index, 'left')}
            onSwipedRight={(index) => onSwiped(index, 'right')}
            cards={cards}
            cardVerticalMargin={80}
            renderCard={renderCard}
            onSwipedAll={() => refreshSuggestions}
            stackSize={3}
            stackSeparation={15}
            overlayLabels={overlayLabels}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            verticalSwipe={false}
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
  left: {
    title: 'NOPE',
    style: { label: labelStyle, wrapper: leftWrapperStyle }
  },
  right: {
    title: 'LIKE',
    style: { label: labelStyle, wrapper: rightWrapperStyle }
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
