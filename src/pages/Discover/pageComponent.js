import {View, ScrollView} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import InputProgress from '../../components/inputProgress';
import Header from '../../components/HeaderToDiscover';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ButtonOrder, ButtonRealized, ButtonSchedule, TitlePages} from '../../components/ButtonPages';

const PageComponent = () => {
  const navigation = useNavigation();
  const [division, setDivision] = useState(false)
  const isMountedRef = useRef(true);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firestore().collection('User').doc(currentUser.uid).onSnapshot(doc => {
      if (isMountedRef.current) {
        const user = doc.data();
        const isLogistic = user.division === 'Logistic' || user.division === 'Admin'
        setDivision(isLogistic)
      }
    })
    return () => {unsubscribe()}
  },[])

  return (
    <ScrollView style={{marginTop: 20}}>
      <Header/><TitlePages Title={'COMPONENT'} Subtitle={'MONITORING'} />
      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        <ButtonOrder onPress={() => navigation.navigate('ComponentOrder')}/>
        <ButtonSchedule onPress={() => navigation.navigate('ComponentSchedule')}/>
        <ButtonRealized onPress={() => navigation.navigate('ComponentRealized')}/>
      </View>
      {division && (<InputProgress onPress={() => navigation.navigate('FormPOComponent')}/>)}
    </ScrollView>
  );
};

export default PageComponent;