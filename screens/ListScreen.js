import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import firebase, { db } from "../config/Firebase";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.programTitle}>{props.program}</Text>
      <FontAwesome5 name={'play'} size={18} style={styles.playIcon} />
    </View>
  )
}

export default function ListScreen(props) {

  const [likes, setLikes] = useState([]);
  const user = firebase.auth().currentUser;
  const uid = user.uid;

  const navigateToPlayer = () => {
    props.navigation.navigate('Player')
  }

  useEffect(() => {
    getLikes();
    console.log(likes)
  }, []);

  const getLikes = () => {
    db.ref("users")
      .child(uid)
      .child("preferences/")
      .on("value", (snapshot) => {
        let data = [];
        snapshot.forEach((child) => {
          data.push(child.val()
          );
        });
        console.log(data)
        setLikes(data);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Oma lista</Text>
      <View style={styles.listContainer}>
        {likes.length > 0 ? likes.map(program => <ListItem key={program.program_id} program={program.program_id} />) : null}
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
