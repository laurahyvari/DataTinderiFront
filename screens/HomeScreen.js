import React, { useState, useEffect } from 'react'
import Swiper from 'react-native-deck-swiper'
import { StyleSheet, View } from 'react-native'
import Api from '../utils/Api'
import Card from '../components/Card'
import MatchModal from '../components/MatchModal'

export default function HomeScreen () {
  const [cards, setCards] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    refreshSuggestions()
  }, [])

  const onSwiped = async (index, type, vote) => {
    const programType = cards[index].partOfSeries === undefined ? 'movies' : 'series'
    try {
      if (type === 'right' && cards[index].suggestionType === 'match') {
        await Api.addVote(cards[index]._id, programType, vote)
        setModalVisible(!modalVisible)
      } else {
        await Api.addVote(cards[index]._id, programType, vote)
        refreshSuggestions()
      }
    } catch (err) {
      console.log(err.message)
    }
  } 

  const refreshSuggestions = async () => {
    try {
      const newSuggestions = await Api.getSuggestions(1)
      setCards(newSuggestions)
      setLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <MatchModal
        program={cards}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        refreshSuggestions={refreshSuggestions}
        imageID={ cards.length > 0 ? cards[0].image.id : null}
      >
      </MatchModal>
        {!isLoading
          ? (
          <Swiper
            backgroundColor={styles.container.backgroundColor}
            onSwipedLeft={(index) => onSwiped(index, 'left', -1)}
            onSwipedRight={(index) => onSwiped(index, 'right', 1)}
            cards={cards}
            cardVerticalMargin={80}
            renderCard={(card) => {
              return <Card cardData={card} />
            }}
            onSwipedAll={() => setLoading(true)}
            stackSize={3}
            stackSeparation={15}
            overlayLabels={overlayLabels}
            animateOverlayLabelsOpacity
            animateCardOpacity
            verticalSwipe={false}
          >
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
    backgroundColor: '#2176AE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
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
