import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid, Alert, BackHandler, ActivityIndicator, Dimensions, } from 'react-native';
import React, {useEffect, useState} from 'react';
import {LogoCubicle} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {CommonActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window')

const User = props => {
  const navigation = useNavigation();
  const [division, setDivision] = useState('');
  const [displayName, setDisplayName] = useState('');
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const unsubsribe = firestore()
      .collection('User')
      .doc(currentUser.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const user = documentSnapshot.data();
          setDivision(user.division);
        }
      });
    return () => {
      unsubsribe();
    };
  }, []);
  useEffect(() => {
    const unsubsribe = auth().onAuthStateChanged(user => {
      if (user) {
        setDisplayName(currentUser.displayName);
      }
    });
    return () => {
      unsubsribe();
    };
  }, []);
  console.log(currentUser.displayName, currentUser.email, division);

  const handleLogOut = () => {
    Alert.alert('Logout', 'Are you sure that you want to log out ?', [
      {
        text: 'Yes',
        onPress: () => {
          auth()
            .signOut()
            .then(() => {
              navigation.replace('PublicNav');
              ToastAndroid.show('User signed out!', ToastAndroid.SHORT);
            });
        },
      },
      {
        text: 'No',
        onPress: () => {
          ToastAndroid.showWithGravity(
            'You stay as ' + currentUser.displayName,
            ToastAndroid.LONG,
            ToastAndroid.LONG,
          );
        },
      },
    ]);
  };
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
    Alert.alert(
      'Exit App',
      'Are you sure that you want to exit the application ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
        {
          text: 'No',
          onPress: () => {
            ToastAndroid.showWithGravity(
              'You stay as ' + currentUser.displayName,
              ToastAndroid.TOP,
              ToastAndroid.LONG,
            );
          },
        },
      ],
    );
  };

  return (
    <ScrollView>
      <View style={styles.LogoSmpHP}>
        <LogoCubicle />
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.left}>Division </Text>
          <Text style={styles.left}>Fullname </Text>
          <Text style={styles.left}>Email </Text>
        </View>
        <View>
          <Text style={styles.right}>{division}</Text>
          <Text style={styles.right}>{displayName}</Text>
          <Text style={styles.right}>{currentUser.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleReload()}>
        <Text style={styles.btnRefresh}>Refresh</Text>
      </TouchableOpacity>
      <View style={{marginHorizontal: 30, width: 200}}>
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
    marginTop: 30,
    flex: 1,
    alignItems: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  left: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 13,
    padding: 10,
    color: BiruKu,
    height: 45,
  },
  right: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: BiruKu,
    borderRadius: 5,
    marginBottom: 15,
    height: 45,
    // width: 230,
    width: width*0.6,
    padding: 10,
    color: BiruKu,
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
    marginHorizontal: 45,
    marginBottom: -10,
    borderRadius: 9,
    backgroundColor: BiruKu,
    borderColor: BiruKu,
    borderWidth: 2,
    width: 80,
  },
});