import {ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import InputProgress from '../../components/inputProgress';
import {ButtonStart, ButtonFinish, TitlePages} from '../../components/ButtonPages';
const PageLayouting = () => {
  const navigation = useNavigation();
  const isMountedRef = useRef(true);
  const [isDivision, setIsDivision] = useState(false);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firestore().collection('User').doc(currentUser.uid).onSnapshot(doc => {
      if (isMountedRef.current) {
        const user = doc.data();
        const isProduction = user.division === 'Production' || user.division === 'Admin'
        setIsDivision(isProduction)
      }
    })
    return () => {unsubscribe()}
  },[])
  return (
    <ScrollView style={{marginTop: 20}}><Header/>
    <TitlePages Title={'LAYOUTING'} Subtitle={'FABRICATION'}/>
      <View style={{alignSelf: 'center', flexDirection: 'row', marginBottom: 20}}>
        <ButtonStart onPress={()=>navigation.navigate('LayoutingStart')}/>
        <ButtonFinish onPress={()=> navigation.navigate('LayoutingFinish')}/>
         </View>
      {isDivision && (
        <InputProgress onPress={() => navigation.navigate('FormFBLayouting')} />
      )}
    </ScrollView>
  );
};

export default PageLayouting;