import {View, Text, StyleSheet, TextInput, ScrollView, 
  Dimensions, Alert, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../../utils/constant';
import firestore from '@react-native-firebase/firestore';
import Button from '../../components/Button6';
import ErrorMessage from '../../components/errorMessage';

const MemoEdit = props => {
  const id = props.route.params.id;
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const memoSubscriber = firestore().collection('Memo')
    .doc(id).onSnapshot(doc => {
      const memoData = doc.data();
      setSubject(memoData.Subject);
      setMessage(memoData.Message);
    });
    return () => {memoSubscriber()}
  }, [props.route.params.id]);

  const handleSaveEdit = async () => {
    if(!subject.trim() || !message.trim()) {
      setError('Please fill in all required fields.')
      setTimeout(() => {setError(null)},2000)
      return
    } else {
      const dateEdit = new Date()
      firestore().collection('Memo').doc(id).update({
        Subject: subject, Message: message, status: 'Edited', 
        Created: firestore.Timestamp.fromDate(dateEdit)
      })
      .then(() => {
        navigation.replace('MemoPage')
        ToastAndroid.show('Memo '+subject+' have been edited.', ToastAndroid.LONG)
      })
      .catch(error => {Alert.alert('Error', error)})
      console.log('error ',error)
    }
  }
  return (
    <View>
      <ScrollView style={{marginVertical: 20}}>
        <View style={styles.desc}>
          <View style={{width: '20%'}}>
            <Text style={styles.label}>Subject</Text>
          </View>
          <View style={{marginLeft: 8, width: '95%'}}>
          <TextInput
              style={styles.txtInput}
              placeholder="Project (issue)"
              placeholderTextColor={'gray'}
              value={subject}
              onChangeText={text => setSubject(text)}
            />
          </View>
        </View>
        <View style={{flex: 1, height: DDD * 0.6}}>
          <TextInput
            multiline
            placeholder="Write your message here..."
            placeholderTextColor={'gray'}
            style={styles.txtArea}
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <ErrorMessage txt={error} />
          <Button bgColor={BiruKu} text={'Post Edited'}
            fontColor={'white'} onPress={handleSaveEdit}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default MemoEdit;
const DDD = Dimensions.get('window').height;
const styles = StyleSheet.create({
  desc: {
    marginBottom: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
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
    paddingVertical: 5,
    marginVertical:2,
    textAlignVertical: 'center',
    width: '80%',
    height: 40,
  },
});
