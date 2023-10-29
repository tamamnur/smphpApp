import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BiruKu} from '../utils/constant';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const height = Dimensions.get('window').height
const HeaderInformation = () => {
  const navigation = useNavigation();
  const [date] = useState(moment);
  const currentUser = firebase.auth().currentUser;
  const [division, setDivision] = useState('');
  const currentTime = moment()
  let greeting = 'Wellcome';
  if(currentTime.isBefore(moment('11:00', 'HH:mm'))) {
    greeting = 'Good Morning'
  } if (currentTime.isBefore(moment('17:00', 'HH:mm'))) {
    greeting = 'Good Afternoon'
  } else {greeting = 'Good Evening'}
  useEffect(() => {
    const subscribe = firestore().collection('User')
      .doc(currentUser.uid).onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const user = documentSnapshot.data();
          setDivision(user.division);
        }
      });
    return () => {subscribe()}
  }, []);

  return (
    <View style={{height: height*.19}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Akun')}>
          <Icon name='account-circle' color={'#6371A3'} size={height*.12}/>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.user}>{currentUser.displayName}</Text>
            <Text style={styles.divisi}> {division}</Text>
          </View>
        </TouchableOpacity>
        <View style={{width: '40%', marginRight: 5, alignSelf: 'center'}}>
          <Text style={styles.tanggal}>{date.format(`ddd, DD-MMM-YYYY`)}</Text>
          <Text style={styles.selamat}>{greeting}</Text>
        </View>
      </View> 
    </View>
  );
};

export default HeaderInformation;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 6,
  },
  user: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: height*.024,
    paddingLeft: 4,
    color: BiruKu,
  },
  divisi: {
    fontFamily: 'Poppins-MediumItalic',
    fontSize: height*.02,
    color: BiruKu,
    marginTop: -6,
  },
  tanggal: {
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 13,
    color: BiruKu,
    textAlign: 'right',
  },
  selamat: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    textAlign: 'right',
    color: BiruKu,
  },
});