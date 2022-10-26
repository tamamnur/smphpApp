import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { LogoForSignUp } from '../../assets'
import { BiruKu } from '../../utils/constant'
import InputDataProject from '../../components/InputDataProject'
import Button from '../../components/Button'
import Title from '../../components/Title'
import PanelNameInput from './panelNameInput'
import { navigation } from '@react-navigation/native-stack'

// const CreateProject = () => {
  export default class CreateProject extends Component {
  render(){
    return (
    <View style={styles.page}>
      {/* <View style={{alignItems: 'flex-end', marginTop: 35, marginEnd: 40}}>
        <Image source ={LogoForSignUp} /></View>
        <Text style={styles.title}> NEW PROJECT</Text> */}
        <Title TxtTitle="NEW PROJECT"/>
        <InputDataProject label="ProjectID"/>
        <InputDataProject label="Project Name"/>
        <InputDataProject label="Customer"/>
        <InputDataProject label="PO Number"/>
        <InputDataProject label="PO Date"/>
        
        {/* <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate('NamePanelInput')}>
          <Text Countinue/>
        </TouchableOpacity> */}
        
        <Button text="Continue" color={BiruKu} 
        onPress={() => this.props.navigation.navigate('PanelNameInput')}
        />
   </View>
  )
}}

// export default CreateProject;

const styles = StyleSheet.create({
  page:{
    flex:1,
    marginTop: 20
    },
  title:{
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: BiruKu,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 25,
  },
  btn:{
    height: 50,
    width: 100,
    backgroundColor: 'gray',
    borderRadius: 50
  }
})