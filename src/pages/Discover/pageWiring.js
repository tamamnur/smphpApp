import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../../utils/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputProgress from '../../components/inputProgress';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const PageWiring = () => {
  const navigation = useNavigation();
  const [isDivision, setIsDivision] = useState(false)
  const currentUser = firebase.auth().currentUser
  useEffect(()=> {
    firestore().collection('User').doc(currentUser.uid).onSnapshot(doc =>{
      const user = doc.data()
      const isProduction = user.division === 'Production' || user.division === 'Admin'
      setIsDivision(isProduction)
    })
  })
  return (
    <View style={{marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        <IconBack
          onPress={() => navigation.goBack()}
          style={{marginTop: 10, marginLeft: 30}}
        />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <View
        style={{flexDirection: 'row', alignSelf: 'center', marginVertical: 50}}>
        <Text style={styles.title}>WIRING {'\n'}- FABRICATION -</Text>
      </View>
      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('WiringStart')}>
          <View style={styles.wrapper}>
            <AntDesign name="playcircleo" color={'orange'} size={80} />
            <Text style={styles.desc}>Start</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WiringFinish')}>
          <View style={styles.wrapper}>
            <AntDesign name="carryout" color={'orange'} size={80} />
            <Text style={styles.desc}>Finish</Text>
          </View>
        </TouchableOpacity>
      </View>
      {isDivision && (
        <InputProgress onPress={() => navigation.navigate('FormFBWiring')} />
      )}
    </View>
  );
};

export default PageWiring;
const styles = StyleSheet.create({
  desc: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
  },
  title: {
    marginHorizontal: 12,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: BiruKu,
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 20,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: BiruKu,
    paddingHorizontal: 30,
    marginHorizontal: 20,
  },
});
