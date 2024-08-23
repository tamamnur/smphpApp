import {Dimensions,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BiruKu} from '../utils/constant';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const height = Dimensions.get('window').height;
const HeaderUserInfo = () => {
  const navigation = useNavigation();
  const currentUser = firebase.auth().currentUser;
  const [division, setDivision] = useState('');
  useEffect(() => {
    const subscribe = firestore().collection('User').doc(currentUser.uid)
    .onSnapshot(documentSnapshot => {
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
        <Icon name="account-circle" color={'#6371A3'} size={height * 0.09} />
      </TouchableOpacity>
      <Text style={[styles.user,{fontFamily: 'Poppins-MediumItalic'}]}> {division} </Text>
      <Text style={styles.user}>{currentUser.displayName},</Text>
    </View>
  );
};

export default HeaderUserInfo;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    height: height * 0.1,
  },
  user: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: height * 0.024,
    paddingLeft: 4,
    color: BiruKu,
  },
});