import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { BiruKu } from '../../utils/constant'
import CreateProject from './createProject'
import { NavigationAction } from '@react-navigation/native'

const PanelNameInput = () => {
  return (
    <View>
      <View style={{alignItems: 'flex-end', marginTop: 35, marginEnd: 40}}>
        <Image source ={LogoForSignUp} /></View>
        <Text style={styles.title}> NEW PROJECT</Text>
        
        {/* <Button text="Create Account" color={BiruKu} 
        onPress={() => this.props.navigation.navigate('CreateProject')}
        /> */}
        
        <TouchableOpacity style={styles.btn} onPress={()=> this.props.NavigationAction.navigate('CreateProject')}>
          <Text Countinue/>
        </TouchableOpacity>
      <Text>INPUT PANEL NAME'S</Text>
    </View>
  )
}

export default PanelNameInput

const styles = StyleSheet.create({
    btn:{
        height: 50,
        width: 50,
        backgroundColor: 'gray',
        borderRadius: 50
    }
})