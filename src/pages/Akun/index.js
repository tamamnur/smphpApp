import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid, Alert, BackHandler, RefreshControl } from 'react-native';
import React, {useEffect, useState} from 'react';
import {LogoCubicle} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {CommonActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import InfoProjectL from '../../components/InfoProjectL';

const User = props => {
  const navigation = useNavigation();
  const [division, setDivision] = useState('');
  const [displayName, setDisplayName] = useState('');
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore().collection('User')
      .doc(currentUser.uid).onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const user = documentSnapshot.data();
          setDivision(user.division);
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {setDisplayName(currentUser.displayName)}
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogOut = () => {
    Alert.alert('Logout', 'Are you sure that you want to log out ?', [
      {text: 'Yes', onPress: () => {
        auth().signOut().then(() => {
          navigation.replace('PublicNav');
          ToastAndroid.show('User signed out!', ToastAndroid.SHORT);
        });
      }},
      {text: 'No', onPress: () => {
        ToastAndroid.show('You stay as '+currentUser.displayName, ToastAndroid.LONG)
      }},
    ]);
  };

  // const [refresh, setRefresh] = useState(false);
  // const handleReload = () => {
  //   setRefresh(true);
  //   setTimeout(()=>{setRefresh(false)
  //   }, 1000)
  // }
  const handleReload = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Akun'}],
      }),
    );
    setTimeout(() => {
      navigation.navigate('Akun');
    }, 1000);
  };

  const handleExit = () => {
    Alert.alert('Exit App','Are you sure that you want to exit the application ?',
      [{text: 'Yes', onPress: () => {BackHandler.exitApp()}},
        {text: 'No', onPress: () => { ToastAndroid.show(
          'You stay as ' + currentUser.displayName,ToastAndroid.LONG)},
      }],
    );
  };

  return (
    <ScrollView>
      <View style={styles.LogoSmpHP}><LogoCubicle/></View>
      <View style={{marginHorizontal: 10}}>
        <InfoProjectL label={'Division'} value={division}/>
        <InfoProjectL label={'Fullname'} value={displayName}/>
        <InfoProjectL label={'Email'} value={currentUser.email}/>
        <TouchableOpacity onPress={() => handleReload()}>
          <Text style={styles.btnRefresh}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 15, width: 200, marginBottom: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile Edit')}>
          <Text style={styles.btnR}>Edit Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btnR}>Add User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogOut()}>
          <Text style={styles.btnExit}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleExit()}>
          <Text style={styles.btnExit}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default User;
const styles = StyleSheet.create({
  LogoSmpHP: {
    marginTop: 35,
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnR: {
    marginTop: 14,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: '#FFF',
    width: 200,
    backgroundColor: BiruKu,
  },
  btnExit: {
    marginTop: 13,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BiruKu,
    color: BiruKu,
    width: 200,
  },
  btnRefresh: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'flex-end',
    paddingTop: 6,
    marginHorizontal:20,
    marginBottom: -10,
    borderRadius: 9,
    backgroundColor: BiruKu,
    borderColor: BiruKu,
    borderWidth: 2,
    width: 80,
  },
});