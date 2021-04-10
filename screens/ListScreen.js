
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import Api from '../utils/Api'
import firebase from '../config/Firebase'

//
// const ListItem = (props) => {
//   return (
//     <View style={styles.listItem}>
//       <Text style={styles.programTitle}>{props.program}</Text>
//       <FontAwesome5 name={'play'} size={18} style={styles.playIcon} />
//     </View>
//   )
// }

export default function ListScreen ({ navigation }) {
  ''
  const [likes, setLikes] = useState([])

  useEffect(() => {
    getLikes()
  }, [])

  const getLikes = async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    const response = await Api.getLikes(token)
    console.log(response)
    setLikes(response)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {likes.length > 0
          ? likes.map(program => (
            <ListItem key={program.key} bottomDivider
              onLongPress={() => navigation.navigate('Player', { program })}>
              <ListItem.Content>
                <ListItem.Title>{program.data.program_id} </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron name='play' type='font-awesome' size={18} color="black"></ListItem.Chevron>
            </ListItem>))
          : null}

      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 36,
    justifyContent: 'flex-start',
    textAlign: 'center'
  },
  listTitle: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  listContainer: {},
  listItem: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    padding: 8,
    textAlign: 'left',
    borderColor: '#E8E8E8',
    borderWidth: 2,
    borderRadius: 4
  },
  programTitle: {
    flex: 6,
    fontWeight: 'bold',
    fontSize: 16
  },
  playIcon: {
    flex: 1,
    marginVertical: 'auto'
  }
})
