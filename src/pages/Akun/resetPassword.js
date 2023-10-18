import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {LogoSmpHP, IconBack} from '../../assets';
import {BiruKu} from '../../utils/constant';
import InputDataUser from '../../components/InputDataUser';
import Button6 from '../../components/Button6';
import {useNavigation} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import Header from '../../components/Header';

export default function ResetPassword() {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);

  const handleResetPassword = () => {
    if (email === '') {
      setEmailErr(true);
      setError('You have not entered your email address.');
      return;
    }
    setEmailErr(false);
    setError('');
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Reset Password',
          'The password reset confirmation has been sent. \n Please check your email',
          [
            { text: 'OK', onPress: () => { navigation.navigate('Login'); }, },
          ],
        );
      })
      .catch(error => {
        Alert.alert('Reset Password', 'An error occurred while sending the email for password reset.')
        navigation.navigate('Login')
        // console.log(error);
        setError(
          'There was an error sending the email for password reset. Please make sure the email is registered.',
        );
      });
  };

  return (
    <ScrollView>
      {/* <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginVertical: 30,
        }}>
        <IconBack onPress={() => navigation.goBack()} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View> */}
      <Header />
      <Text style={styles.title}>RESET PASSWORD</Text>
      <InputDataUser label="Email" onChangeText={email => setEmail(email)} />
      {error ? (
        <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
          {error}
        </Text>
      ) : null}
      <Button6
        text="Reset Password" fontColor={'white'} bgColor={BiruKu}
        onPress={handleResetPassword}
      />
    </ScrollView>
  );
}
// password for all account : smphp2023
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: BiruKu,
    marginLeft: 35,
    marginVertical: 20,
  },
});