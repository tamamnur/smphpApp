import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ToastAndroid, Alert, TextComponent } from 'react-native'
import React, {Component, useContext} from 'react'
import { LogoAkunPage, LogoSmpHP } from '../../assets'
import { BiruKu } from '../../utils/constant'
import AxioDataAkun from './axiosDataAkun'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

  
  const User = (props) => {
    const navigation = useNavigation();
    
    const confirmLogout = () => {
      Alert.alert(
        'Logout',
        'Are you sure that you want to log out ?', 
        [
          {
            text: "Yes",
            onPress: () => {
              auth()
              .signOut()
              .then(() => {
                navigation.replace('PublicNav')
                // console.log('User signed out!')
                ToastAndroid.show("User signed out!", ToastAndroid.SHORT);
              }
              );
            }
          }, 
          {
            text: "No",
            onPress: () => {
              console.log('No Pressed');
            }            
          }
        ]
      )
    }
    
    const handleLogOut = () => {
      confirmLogout({
      })
  
    }
    return (
        <ScrollView>
          <View style={styles.LogoSmpHP}><LogoSmpHP /></View>
          <View style={styles.LogoUser}><LogoAkunPage /></View>
        <View style={styles.container}>
          <View>
              <Text style={styles.left}>Division </Text>
              <Text style={styles.left}>Fullname </Text>
              <Text style={styles.left}>Username </Text>
              <Text style={styles.left}>Password </Text>
          </View>
          <View>
            <Text style={styles.right}>user.uid</Text>
            <Text style={styles.right}>Tamam Nur</Text>
            <Text style={styles.right}>tamam.nurq@gmail.com</Text>
            <Text style={styles.right}><AxioDataAkun /></Text>
            
          </View>
        </View>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}><Text style={styles.btnR}>
              Change Password</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={styles.btnR}>
              Add User</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogOut()}><Text style={styles.btnR}>
              Log Out</Text></TouchableOpacity>
        </ScrollView> 
             
      )
    }
  
export default  User;

const styles = StyleSheet.create({
  LogoSmpHP:{
    marginTop:30, 
    marginBottom:10,
    marginHorizontal: 20,
    flex: 2,
    alignItems: 'flex-end'
  },
  LogoUser:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  container:{
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  left:{
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 13,
    padding: 10,
    color: BiruKu
  },
  right:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: BiruKu,
    borderRadius: 5,
    marginBottom: 15,
    height: 45,
    width: 230,
    padding: 10,
    color: BiruKu
  },
  btnR:{
    marginHorizontal: 30,
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    color: '#FFF',
    width: 200,
    backgroundColor: BiruKu
  }
})