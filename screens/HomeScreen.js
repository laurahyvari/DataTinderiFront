import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import Api from '../utils/Api'

const renderCard = (cardData, cardIndex) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{cardData.title}</Text>
    </View>
  )
}

export default function HomeScreen(props) {

  const [cards, setCards] = useState([])
  const [swipedAllCards, setSwipedAllCards] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  const [swipeComponent, setSwipeComponent] = useState(null)

  useEffect(() => {
    refreshSuggestions()
  }, [])

  const refreshSuggestions = async () => {
    const newSuggestions = await Api.getSuggestions(10)
    console.log(newSuggestions);
    setCards(newSuggestions)
  }

  const onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  const onSwipedAllCards = () => {
    setSwipedAllCards(true)
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
      { cards.length > 0 ? (
      <Swiper
        ref={swiper => { setSwipeComponent(swiper) }}
        onSwiped={() => onSwiped('general')}
        onSwipedLeft={() => onSwiped('left')}
        onSwipedRight={() => onSwiped('right')}
        onSwipedTop={() => onSwiped('top')}
        onSwipedBottom={() => onSwiped('bottom')}
        onTapCard={onTapCard}
        cards={cards}
        cardIndex={cardIndex}
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
      ) : (
        <></>
      )}
    </View>
  )
}

const labelStyle = { backgroundColor: 'black', borderColor: 'black', color: 'white', borderWidth: 1 }
const centerWrapperStyle = { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
const rightWrapperStyle = { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 30, marginLeft: 30 }
const leftWrapperStyle = { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 30, marginLeft: -30 }

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
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  cardText: {

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
