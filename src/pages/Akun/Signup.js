import {Text, ScrollView, StyleSheet, View, ToastAndroid} from 'react-native';
import React, {useState, useEffect, Component, useContext} from 'react';
import {IconBack, LogoForSignUp, LogoSmpHP} from '../../assets';
import Button from '../../components/Button6';
import {BiruKu} from '../../utils/constant';
import InputDataUser from '../../components/InputDataUser';
import Division from '../../components/Division';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Title1 from '../../components/Title1';
import Header from '../../components/Header';

const isValidObjField = obj => {
  return Object.values(obj).every(value => value.trim());
};

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate('');
  }, 3000);
};

const isValidEmail = value => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(value);
};

const Signup = props => {
  const navigation = useNavigation();
  const [regisInfo, setRegisInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    division: '',
  });

  const [error, setError] = useState('');
  const {division, displayName, email, password, confirmPassword} = regisInfo;
  const handleOnchangeText = (value, fieldName) => {
    setRegisInfo(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const isValidForm = () => {
    if (!isValidObjField(regisInfo))
      return updateError('Required all fields!', setError);
    if (!displayName.trim() || displayName.length < 4)
      return updateError('Invalid fullname', setError);
    if (!isValidEmail(email)) return updateError('Invalid email', setError);
    if (!email.trim() || email.length < 4)
      return updateError('Invalid email', setError);
    if (!password.trim() || password.length < 6)
      return updateError('Password is too short', setError);
    if (password !== confirmPassword)
      return updateError('Password confirmation does not match', setError);
    return true;
  };
  const submitForm = () => {
    console.log(regisInfo);
    {
      isValidForm() ? handleSignup() : error;
    }
  };

  const handleSignup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        user.updateProfile({
          displayName: displayName,
          division: division,
        });
        return firestore().collection('User').doc(user.uid).set({
          division: regisInfo.division,
        });
      })
      .then(() => {
        navigation.replace('SecuredNav');
        ToastAndroid.show(
          'User account created & signed in!',
          ToastAndroid.TOP,
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          return updateError(
            "That's email address is already in use",
            setError,
          );
        }
        if (error.code === 'auth/invalid-email') {
          return updateError("That's email address is invalid");
        }
        console.error(error);
      });
  };

  return (
    <ScrollView style={{marginBottom: 30}}>
      {/* <View
        style={{alignSelf: 'flex-end', marginTop: 30, marginHorizontal: 30}}>
        <LogoSmpHP />
      </View> */}
      <Header/>
      <Title1 TxtTitle={'REGISTER'} />
      {/* <Text style={styles.title}>REGISTER </Text> */}
      <View style={{marginHorizontal: 25, width: '90%', justifyContent: 'center', alignItems:'center'}}>
        {/* <View style={{width: '90%', marginHorizontal: 20}}> */}
          <View style={{ width: '100%', paddingLeft: 8}}>
          <Text style={styles.subTitle}>Division </Text>
          </View>
          {/* <View style={{ width: '100%'}}> */}
            <Division
              onValueChange={value => handleOnchangeText(value, 'division')}
            />
          {/* </View> */}

          <InputDataUser
            label="Fullname"
            onChangeText={value => handleOnchangeText(value, 'displayName')}
          />
          <InputDataUser
            label="Email"
            onChangeText={value => handleOnchangeText(value, 'email')}
          />
          <InputDataUser
            label="Password"
            secureTextEntry
            onChangeText={value => handleOnchangeText(value, 'password')}
          />
          <InputDataUser
            label="Confirm Password"
            secureTextEntry
            onChangeText={value => handleOnchangeText(value, 'confirmPassword')}
          />
        {/* </View> */}
      </View>
      <View style={{marginHorizontal: 40}}>
        <Button
          text="Create Account"
          fontColor={'white'}
          bgColor={BiruKu}
          onPress={submitForm}
        />
      </View>
      {error ? (
        <Text
          style={{
            color: 'red',
            fontSize: 14,
            textAlign: 'center',
            marginTop: 20,
          }}>
          {error}
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 20,
    color: BiruKu,
    marginHorizontal: 35,
    marginVertical: 0,
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: BiruKu,
    marginStart: 10,
    marginTop: 10,
    // marginBottom: -5,
  },
  area: {
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: BiruKu,
    marginHorizontal: 48,
    marginTop: 5,
    marginBottom: 20,
    elevation: 9,
    height: 45,
    fontSize: 13,
    justifyContent: 'center',
  },
  pickStyl: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  checkBox: {
    marginHorizontal: 45,
    marginTop: 10,
    flexDirection: 'row',
  },
  Term: {
    color: BiruKu,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
});
