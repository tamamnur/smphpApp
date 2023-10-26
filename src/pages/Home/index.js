import {StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {HeaderInformation, Layanan} from '../../components';
import RecapProject from './recapProject';
import {BiruKu} from '../../utils/constant';
import Memo from './Memo';
import {LogoAdd} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
    {/* <ScrollView style={styles.page}> */}
      <View style={styles.Header}>
        <Text style={styles.selamat}>Wellcome,</Text>
          <HeaderInformation />
        {/* <View style={{marginBottom: -10, marginTop: -10}}>
        </View> */}
        <RecapProject />
        <TouchableOpacity style={styles.iconAdd}>
          <LogoAdd onPress={() => navigation.navigate('ProjectCreate')} />
        </TouchableOpacity>
        {/* <Memo /> */}
        {/* <TouchableOpacity
          style={{alignItems: 'flex-end', marginHorizontal: 14}}>
          <Text
            onPress={() => navigation.navigate('MemoPage')}
            style={styles.seeMore}>
            See More . . .
          </Text>
        </TouchableOpacity> */}
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',marginTop: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('ProjectList')}>
          <View style={styles.box}>
            <Text style={styles.txtButton}>
            <Ionicons name="list-circle-sharp" color={'grey'} size={50} />
              List Project</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MemoPage')}>
          <View style={styles.box}>
            <Text style={styles.txtButton}>
            <Ionicons name="document-attach" color={BiruKu} size={50} />
              Memo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    {/* </ScrollView> */}
    </View>
  );
};

export default Home;

const windowHeight = Dimensions.get('window').height;
console.log('Height?',windowHeight*0.2)
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginBottom: 10,
    height: '100%',
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
    marginTop: -60,
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
  box: {
    marginTop: 10,
    alignItems: 'center',
    alignContent: 'center',
    // textAlignVertical:'center',
    // backgroundColor: '#E5E5E5',
    // backgroundColor: '#84A2AA',
    // paddingVertical: 5,
    borderColor: BiruKu,
    borderRadius: 15,
    borderWidth: 1.5,
    verticalAlign: 'center',
  },
  txtButton: {
    marginHorizontal: 20,
    // marginTop: 3,
    marginBottom: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
  },
});
