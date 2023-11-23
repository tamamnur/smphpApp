import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../../utils/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputProgress from '../../components/inputProgress';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const PageBusbar = () => {
  const navigation = useNavigation();
  const [isDivision, setIsDivision] = useState(false)
  const currentUser = firebase.auth().currentUser
  useEffect(()=> {
    firestore().collection('User').doc(currentUser.uid).onSnapshot(doc => {
    const user = doc.data()
    const isLogistic = user.division === 'Logistic' || user.division === 'Admin'
    setIsDivision(isLogistic)
    })
  })
  return (
    <View style={{marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        <IconBack onPress={() => navigation.goBack()} style={{marginTop: 10, marginLeft: 30}} />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center', marginVertical: 50}}>
        <Text style={styles.title}>BUSBAR Cu{'\n'}- MONITORING -</Text>
      </View>
      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=> navigation.navigate('BusbarOrder')}>
          <View style={{alignItems: 'center', backgroundColor: '#E5E5E5', paddingVertical: 25, borderWidth: 1, borderColor: BiruKu}}>
            <AntDesign name="profile" color={BiruKu} size={50} />
            <Text style={styles.desc}>Purchase</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BusbarSchedule')}>
          <View style={{alignItems: 'center', backgroundColor: '#E5E5E5', paddingVertical: 25, borderWidth: 1, borderColor: BiruKu, marginHorizontal: 10}}>
            <AntDesign name="hourglass" color={BiruKu} size={50} />
            <Text style={styles.desc}>Schedule</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BusbarRealized')}>
          <View style={{alignItems: 'center', backgroundColor: '#E5E5E5', paddingVertical: 25, borderWidth: 1, borderColor: BiruKu}}>
            <AntDesign name="carryout" color={BiruKu} size={50} />
            <Text style={styles.desc}>Realized</Text>
          </View>
        </TouchableOpacity>
      </View>
      {isDivision && (
        <InputProgress onPress={()=> navigation.navigate('FormPOBusbar')}/>
      )}
    </View>
  );
};

export default PageBusbar;
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
});