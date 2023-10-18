import {StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {HeaderInformation, Layanan} from '../../components';
import RecapProject from './recapProject';
import {BiruKu} from '../../utils/constant';
import Memo from './Memo';
import {LogoAdd} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
    {/* <ScrollView style={styles.page}> */}
      <View style={styles.Header}>
        <Text style={styles.selamat}>Wellcome,</Text>
        <View style={{marginBottom: -10, marginTop: -10}}>
          <HeaderInformation />
        </View>
        <RecapProject />
        <TouchableOpacity style={styles.iconAdd}>
          <LogoAdd onPress={() => navigation.navigate('ProjectCreate')} />
        </TouchableOpacity>
        <Memo />
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginHorizontal: 14}}>
          <Text
            onPress={() => navigation.navigate('MemoPage')}
            style={styles.seeMore}>
            See More . . .
          </Text>
        </TouchableOpacity>
      </View>
    {/* </ScrollView> */}
    </View>
  );
};

export default Home;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // height: windowHeight * 0.7
  },
  Header: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  smp: {
    fontSize: 14,
  },
  TextBold: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  wrapperSMPHP: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  layanan: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  selamat: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
    color: BiruKu,
  },

  iconAdd: {
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginTop: -30,
    marginBottom: 40,
    flex: 2,
  },
  seeMore: {
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 13,
    marginTop: -22,
    color: '#BA0A3F',
    elevation: 10,
  },
});
