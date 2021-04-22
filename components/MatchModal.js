import React from 'react'
import { Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from 'react-native'

export default function MatchModal (props) {
  const toggleModal = () => {
    props.setModalVisible(!props.modalVisible)
  }

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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            <TouchableOpacity style={styles.button} activeOpacity={0.5}>

              <Image
                source={require('./images/heart.png')}
                style={styles.heart}
              />

              <Text style={styles.TextStyle}>Favorite </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.button} activeOpacity={0.5}>

              <Image
                source={require('./images/share.png')}
                style={styles.share}
              />

              <View style={styles.SeparatorLine} />

              <Text style={styles.TextStyle}> Share </Text>

            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2176AE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: '10%',
    marginTop: '40%',
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  share: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: 20,
    width: 20,
    flex: 1,
    flexDirection: 'row'
  },
  heart: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: 20,
    width: 20,
    flex: 1,
    flexDirection: 'row'
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    flexDirection: 'row'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
