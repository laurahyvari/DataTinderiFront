import React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native'

export default function MatchModal(props) {
  console.log(props)

  const toggleModal= () => {
    props.setModalVisible(!props.modalVisible)
    props.refreshSuggestions()
  }

  return (
    <View style={styles.centeredView}>
      <Modal
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
          </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
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