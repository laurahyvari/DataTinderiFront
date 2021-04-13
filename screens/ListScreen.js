
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

export default function ListScreen ({ navigation }) {
  useEffect(() => {

  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {/*   {list.length > 0
          ? list.map(program => (
            <ListItem key={program._id} bottomDivider
              onLongPress={() => navigation.navigate('Player', { program })}>
              <ListItem.Content>
                <ListItem.Title>{program.title} </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron name='play' type='font-awesome' size={18} color="black"></ListItem.Chevron>
            </ListItem>))
          : null} */}

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
