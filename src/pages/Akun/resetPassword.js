import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {LogoSmpHP, IconBack} from '../../assets';
import {BiruKu} from '../../utils/constant';
import InputData from '../../components/InputData';
import Button6 from '../../components/Button6';
import {useNavigation} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';

export default function ResetPassword() {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);

  const handleResetPassword = () => {
    if (email === '') {
      setEmailErr(true);
      setError('Anda belum memasukan alamat email anda.');
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
          'Konfirmasi untuk reset password telah dikirim. Silahkan periksa email Anda',
          [
            { text: 'OK', onPress: () => { navigation.navigate('Login'); }, },
          ],
        );
      })
      .catch(error => {
        Alert.alert('Reset Password', 'Terjadi kesalahan saat mengirim email untuk reset password.')
        console.log(error);
        setError(
          'Terjadi kesalahan mengirim email untuk reset password, Pastikan email terdaftar.',
        );
      });
  };

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginVertical: 30,
        }}>
        <IconBack onPress={() => navigation.goBack()} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Text style={styles.title}>RESET PASSWORD</Text>
      <InputData label="Email" onChangeText={email => setEmail(email)} />
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