import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IconDefaultUser} from '../../assets';
import {BiruKu} from '../../utils/constant';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const HeaderInformation = () => {
  const navigation = useNavigation();
  const [date] = useState(moment);
  const currentUser = firebase.auth().currentUser;
  const [division, setDivision] = useState('');
  useEffect(() => {
    const subscribe = firestore().collection('User')
      .doc(currentUser.uid).onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const user = documentSnapshot.data();
          setDivision(user.division);
        }
      });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Akun')}>
        <View style={{flexDirection: 'row'}}>
          <IconDefaultUser />
          <View style={{paddingLeft: 10}}>
            <Text style={styles.user}>{currentUser.displayName}</Text>
            <Text style={styles.divisi}> {division}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{width: '40%'}}>
        <Text style={styles.tanggal}>{date.format(`ddd, DD-MMM-YYYY`)}</Text>
      </View>
    </View>
  );
};

export default HeaderInformation;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    marginBottom: 6,
  },
  user: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    paddingLeft: 3,
    color: BiruKu,
  },
  divisi: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: BiruKu,
  },
  tanggal: {
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 13,
    marginTop: 40,
    marginRight: 5,
    color: BiruKu,
    textAlign: 'right',
  },
});