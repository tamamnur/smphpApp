import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BiruKu, Darkred} from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import LoadingComponent from '../../components/LoadingComponent';
import FormatDateTime from '../../components/FormatDateTime';

const MemoView = (props) => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [memo, setMemo] = useState({
    Created: '',
    From: '',
    FromDivision: '',
    ToDivision: '',
    Subject: '',
    Message:''
  })
  useEffect(() => {
    const id = props.route.params.id
    const memoSubscriber = firestore().collection('Memo').doc(id).onSnapshot(async doc => {
      const getDate = doc.data().Created.toDate()
      const created = FormatDateTime(getDate)
      setMemo({
        Created: created,
        From: doc.data().From,
        FromDivision: doc.data().FromDivision,
        ToDivision: doc.data().ToDivision,
        Subject: doc.data().Subject,
        Message: doc.data().Message,
        status: doc.data().status ? doc.data().status : '' 
      })
    })
    setIsLoading(false)
    return() => {memoSubscriber()}
  }, [props.route.params.id])

  const handleDelete = async () => {
    Alert.alert('Delete Memo', 'Are you sure you want to delete this Memo ?',
    [{text: 'Cancel', style: 'cancel'},
     {text: 'Delete', style: 'destructive', onPress: async() => {
      try {
        const id = props.route.params.id
        await firestore().collection('Memo').doc(id).delete()
        ToastAndroid.show('Memo about '+subject+' have been deleted.', ToastAndroid.SHORT)
        navigation.replace('MemoPage')
      } catch (error) {
        Alert.alert('Error', 'An error occured while deleting the memo')
        navigation.replace('MemoPage')
      }
     }}]
    )
  }
  return (
    <ScrollView style={{marginBottom: 20, flex: 1}}>
      {isLoading ? (<LoadingComponent/>) :
      (<>
      <View style={styles.MemoContainer}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{memo.Subject}</Text>
        </View>
        <View style={styles.recap}>
          <Text style={styles.for}>From : {memo.From}   (Div.{memo.FromDivision}) </Text>
          <Text style={styles.for}>To : {memo.ToDivision}</Text>
          <Text style={styles.message}>{memo.Message}</Text>
          <Text style={styles.time}>{memo.status}  {memo.Created}</Text>
        </View>
      </View>
        
      <View style={{marginRight: 25, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('MemoEdit', {id: props.route.params.id})} 
          style={{flexDirection: 'row', marginLeft: 40}}>
          <MIcon name="note-edit-outline" color={BiruKu} size={25} />
          <Text style={styles.time}> Edit Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleDelete} 
          style={{flexDirection: 'row'}}>
          <MIcon name="delete" color={Darkred} size={25} />
          <Text style={styles.delete}> Delete</Text>
        </TouchableOpacity>
      </View>
      </>)}
    </ScrollView>
  );
};

export default MemoView;

const styles = StyleSheet.create({
  MemoContainer: {
    width: '90%',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#F9F9F9',
    elevation: 10,
  },
  titleWrap: {
    backgroundColor: '#84A2AA',
    height: 60,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 100,
    elevation: 8,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFF',
    textAlignVertical: 'center',
    marginHorizontal: 20,
    marginTop: 5,
  },
  recap: {
    marginHorizontal: 15,
    marginVertical: 6,
  },
  time: {
    fontSize: 13,
    fontFamily: 'Poppins-Italic',
    color: BiruKu,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  delete: {
    fontSize: 13,
    fontFamily: 'Poppins-Italic',
    color: Darkred,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  for: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: BiruKu,
  },
  message: {
    color: BiruKu,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlign: 'justify',
    marginVertical: 10,
    marginHorizontal: 5,
  },
});