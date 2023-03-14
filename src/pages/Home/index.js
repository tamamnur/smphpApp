import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import {HeaderInformation, Layanan} from '../../components'
import RecapProject from './recapProject';
import { BiruKu } from '../../utils/constant';
import Memo from './Memo';
import { LogoAdd } from '../../assets';
import { useNavigation } from '@react-navigation/native';
 

const Home = () => { 
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <View style={styles.Header}>
        <Text style={styles.selamat}>Wellcome,</Text>
          <View style={{marginBottom: -10, marginTop: -10}}>
            <HeaderInformation /></View>
            <RecapProject />
            <TouchableOpacity style={styles.iconAdd}>
                    <LogoAdd onPress={() => navigation.navigate('CreateProject')}/>
                </TouchableOpacity>
              <Memo />
              <TouchableOpacity style={{alignItems: 'flex-end', marginHorizontal: 14}}>
                    <Text onPress={() => navigation.navigate('MemoPage')}
                    style={styles.seeMore}>See More . . .</Text>
                </TouchableOpacity>
            </View>
          </View>)
};

export default Home;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  Header:{
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  smp: {
    fontSize: 14
  },
  TextBold: {
    fontSize: 16,
    fontFamily: "Poppins-Bold"
  },
  wrapperSMPHP:{
    paddingHorizontal: 30,
    marginTop: 20
  },
  layanan:{
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  selamat:{
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginLeft: 20,
    color: BiruKu
  },

  iconAdd:{
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginBottom: 50,
    marginTop: -60,
    flex: 1
  },
  seeMore:{
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 13,
    marginTop: -22,
    color: '#BA0A3F',
    elevation: 10
  }
});