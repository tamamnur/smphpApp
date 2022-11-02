import { Text, View, StyleSheet } from 'react-native'
import React, { Component, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

// firestore()
//   .collection('collection')
//   .onSnapshot((querySnapshot) => {
//      console.log(querySnapshot)
//   })

export class Project extends Component {
    state = {
        user: {
            name: ""
        }
    }
    
    constructor(props) {
        super(props);
        this.getUser();
        console.log(error)
        this.subscriber = firestore().collection('users').doc
        ('SKFKOHO9kh9kmHy9THax').onSnapshot(doc => {
            this.setState({
                user: {
                    name: doc.data().name
                }
            })
        })
    }
    getUser = async () => {
        const userDocument = await firestore()
        .collection('users')
        .doc('SKFKOHO9kh9kmHy9THax').get()
        console.log(userDocument)
    }

  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.content}>
            Name : {this.state.user.name}</Text>
      </View>
    )
  }
}

export default Project

const styles = StyleSheet.create({
    page:{
        flex: 1,
        justifyContent: 'center',
    },
    content:{
        textAlign: 'center',
        fontSize: 20,

    }
})
