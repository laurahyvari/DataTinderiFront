import React from 'react'
import { Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, Dimensions } from 'react-native'
const maxWidth = Math.round(Dimensions.get('window').width * 0.8)
const maxHeight = Math.round(Dimensions.get('window').height * 0.4)
export default function MatchModal (props) {
  const toggleModal = () => {
    props.setModalVisible(!props.modalVisible)
  }

  console.log(props.imageID, 'modalaiohje')
  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={props.modalVisible}

        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>It's A Match!</Text>
            {props.imageID && <Image
              style={styles.cardImage}
              source={{
                uri: `https://images.cdn.yle.fi/image/upload/w_${maxWidth},h_${maxHeight},c_limit/${props.imageID}`
              }}
            />}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <Image
                  source={require('./images/heart.png')}
                  style={styles.icons}
                  resizeMode='contain'
                />

              </TouchableOpacity>

              <TouchableOpacity style={styles.button} activeOpacity={0.5}>

                <Image
                  source={require('./images/share.png')}
                  style={styles.icons}
                  resizeMode='contain'

                />

              </TouchableOpacity>

            </View>
            <Pressable
              style={styles.buttonClose}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#2176AE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  centeredView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },

  // Tämä hoitaa modaalin koon
  modalView: {
    flex: 1,
    margin: '10%',
    marginTop: '30%',
    marginBottom: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingEnd: 8,
    paddingStart: 8,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  icons: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20
  },
  buttonOpen: {
    backgroundColor: '#2176AE'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    flex: 0,
    flexDirection: 'row'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  cardImage: {
    resizeMode: 'contain',
    flex: 2,
    width: 250,
    height: 250,
    borderRadius: 50
  }
})
