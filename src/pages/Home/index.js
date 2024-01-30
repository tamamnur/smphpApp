import {StyleSheet,Text,View,Dimensions,TouchableOpacity} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import HeaderInformation from '../../components/HeaderInformation';
import RecapProject from './recapProject';
import {BiruKu} from '../../utils/constant';
import {LogoAdd} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const navigation = useNavigation();
  const [division, setDivision] = useState(false)
  const isMountedRef = useRef(true);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser
    const unsubscribe = firestore().collection('User').doc(currentUser.uid).onSnapshot(doc => {
      if (isMountedRef.current) {
        const user = doc.data()
        const isRight = user.division === 'Marketing' || user.division === 'Admin'
        setDivision(isRight)
      }
    })
    return() => {unsubscribe()}
  },[])
  return (
    <View style={styles.page}>
      <HeaderInformation />
      <RecapProject />
      {division && (
      <TouchableOpacity style={styles.iconAdd}>
        <LogoAdd onPress={() => navigation.navigate('ProjectCreate')} />
      </TouchableOpacity>
      )}

      <View style={styles.boxWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('ProjectList')}>
          <View style={styles.box}>
            <Icon name="book-multiple" color={BiruKu} size={height * 0.05} />
            <Text style={styles.txtButton}>Projects</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MemoPage')}>
          <View style={styles.box}>
            <Icon name="android-messages" color={BiruKu} size={height * 0.05} />
            <Text style={styles.txtButton}>Memo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  iconAdd: {
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginTop: -60,
    marginBottom: 40,
    flex: 2,
  },
  boxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 8,
    height: height * 0.09,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.4,
    height: height * 0.06,
    paddingHorizontal: 10,
    alignContent: 'center',
    borderColor: BiruKu,
    borderRadius: 15,
    borderWidth: 1.5,
    verticalAlign: 'center',
  },
  txtButton: {
    marginLeft: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
  },
});