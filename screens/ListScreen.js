import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.programTitle}>{props.program.title}</Text>
      <FontAwesome5 name={'play'} size={18} style={styles.playIcon}/>
    </View>
  )
}

export default function ListScreen(props) {

  useEffect(() => {
    console.log('User liked these: ', props.likedPrograms)
  }, [])

  const navigateToPlayer = () => {
    props.navigation.navigate('Player')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Oma lista</Text>
      <View style={styles.listContainer}>
        {props.likedPrograms.map(program => <ListItem key={program.id} program={program} />)}
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 36,
    justifyContent: 'flex-start',
    textAlign: 'center',
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
    borderRadius: 4,
  },
  programTitle: {
    flex: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  playIcon: {
    flex: 1,
    marginVertical: 'auto'
  }
});
