import {View, Text, StyleSheet, TextInput, ToastAndroid, ScrollView, Dimensions, } from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Title from '../../components/Title1';
import Division from '../../components/Division';
import Header from '../../components/Header';
import {BiruKu} from '../../utils/constant';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Button from '../../components/Button6';
import ErrorMessage from '../../components/errorMessage';

const DDD = Dimensions.get('window').height;
console.log(DDD);
const MemoCreate = () => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [division, setDivision] = useState('');
  const [displayName, setDisplayName] = useState('');
  const currentUser = firebase.auth().currentUser;
  const [attn, setAttn] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const errorMessage = (error, errorInfo) => {
    errorInfo(error);
    setTimeout(() => {
      errorInfo('');
    }, 3000);
  };

  useEffect(() => {
    const unsubscribe = firestore().collection('User').doc(currentUser.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const user = documentSnapshot.data();
          setDivision(user.division);
        }
      });
    return () => {unsubscribe()}
  }, []);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {setDisplayName(currentUser.displayName)}
    });
    return () => {unsubscribe()}
  }, []);
  // console.log(currentUser.displayName, division);
  const handleSubmit = () => {
    if (!attn) {
      return errorMessage(`You haven't specified a recipient`, setError);
    } if (!subject) {
      return errorMessage(`You haven't filled in a subject.`, setError);
    } if (!message) {
      return errorMessage(`You haven't provided a message.`, setError);
    } else {
      const Created = new Date();
      firestore().collection('Memo').add({
          From: currentUser.displayName,
          FromDivision: division,
          ToDivision: attn,
          Subject: subject,
          Message: message,
          Created: firestore.Timestamp.fromDate(Created),
        })
        .then(() => {
          console.log('Memo published');
          ToastAndroid.show('Memo Published', ToastAndroid.LONG);
          navigation.replace('MemoPage');
        })
        .catch(error => {alert('Error', error)});
    }
  };
  console.log(attn, subject, message);
  return (
    <View>
      <ScrollView style={{marginVertical: 20}}>
        <Header/><Title TxtTitle="CREATE MEMO" />
        <ErrorMessage txt={error} />
        <View style={styles.desc}>
          <View style={{width: '20%'}}>
            <Text style={styles.label}>To / Attn.</Text>
            <Text style={styles.label}>Subject</Text>
          </View>
          <View style={{marginLeft: 8, width: '95%'}}>
            <Division
              values={attn}
              onValueChange={text => {setAttn(text)}}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Project (issue)"
              placeholderTextColor={'gray'}
              value={subject}
              onChangeText={text => setSubject(text)}
            />
          </View>
        </View>
        <View style={{flex: 1, height: DDD*0.6}}>
          <TextInput
            multiline
            placeholder="Write your message here..."
            placeholderTextColor={'gray'}
            style={styles.txtArea}
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <Button bgColor={BiruKu} text={'Publish'} fontColor={'white'} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MemoCreate;
const styles = StyleSheet.create({
  desc: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    height: '15%',
  },
  label: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
    height: 45,
    textAlignVertical: 'center',
    marginBottom: 5,
  },
  txtArea: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
    borderWidth: 1.5,
    borderColor: BiruKu,
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 10,
    height: '55%',
    width: '90%',
    textAlign: 'justify',
    textAlignVertical: 'top',
  },
  txtInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginVertical: 12,
    textAlignVertical: 'center',
    width: '80%',
    height: 40,
  },
});