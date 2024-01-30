import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../../utils/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputProgress from '../../components/inputProgress';
import Title2 from '../../components/Title2';
import Header from '../../components/HeaderToDiscover';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const PageConstruction = () => {
  const isMountedRef = useRef(true);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firestore().collection('User').doc(currentUser.uid).onSnapshot(doc => {
      if (isMountedRef.current) {
        const user = doc.data();
        const isLogistic = user.division === 'Logistic' || user.division === 'Admin'
        setDivision(isLogistic)
      }
    })
    return () => {unsubscribe()}
  },[])

  const navigation = useNavigation();
  const [division, setDivision] = useState(false)
  const currentUser = firebase.auth().currentUser
  // useEffect(() => {
  //   firestore().collection('User').doc(currentUser.uid).onSnapshot(doc => {
  //   })
  // })
  // return () => {unsub}
  return (
    <View style={{marginTop: 20}}>
      <Header/><Title2 TxtTitle={'CONSTRUCTION / BOX'} SubTitle={'- MONITORING -'} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('ConstructionOrder')}>
          <View style={styles.box}>
            <AntDesign name="profile" color={BiruKu} size={50} />
            <Text style={styles.desc}>Purchase</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ConstructionSchedule')}>
          <View style={styles.box}>
            <AntDesign name="hourglass" color={BiruKu} size={50} />
            <Text style={styles.desc}>Schedule</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ConstructionRealized')}>
          <View style={styles.box}>
            <AntDesign name="carryout" color={BiruKu} size={50} />
            <Text style={styles.desc}>Realized</Text>
          </View>
        </TouchableOpacity>
      </View>
      {division && (
        <InputProgress onPress={() => navigation.navigate('FormPOConstruction')} />
      )}
    </View>
  );
};

export default PageConstruction;
const styles = StyleSheet.create({
  desc: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
  },
  container: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 25,
    borderColor: BiruKu,
    borderWidth: 1.5,
  },
});