import {Text,View,ScrollView,TouchableOpacity} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/HeaderToDiscover';
import {BiruKu} from '../../utils/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TitlePages} from '../../components/ButtonPages';
import { icon, iconSize, titleIcon, wrapper } from '../../utils/fontStyles';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const PageShopdrawing = () => {
  const [isDrafter, setIsDrafter] = useState(false);
  const isMountedRef = useRef(true);
  const navigation = useNavigation();
  useEffect(() => {
    isMountedRef.current = true;
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firestore().collection('User').doc(currentUser.uid)
      .onSnapshot(doc =>{
        if(isMountedRef.current) {
          const user = doc.data()
          setIsDrafter(user.division === 'Drafter');
      }
    })
    return () => {
      isMountedRef.current = false
      unsubscribe()
    };
  }, []);

  return (
    <ScrollView style={{marginTop: 20}}>
      <Header /><TitlePages Title={'Shopdrawing'} />
      <View style={[wrapper, {marginTop: -40}]}>
        <View style={icon}>
          <TouchableOpacity onPress={() => {
            const pageInput = isDrafter ? 'FormShopdrawing' : 'FormShopdrawingSales';
            navigation.navigate(pageInput)}}>
            <View style={{alignSelf: 'center'}}>
              <Icon name="content-save-edit-outline" size={iconSize} color={BiruKu}/>
            </View>
            <Text style={[titleIcon,{color:BiruKu}]}>Input Progress</Text>
          </TouchableOpacity>
        </View>
        <View style={[icon,{paddingHorizontal: 32}]}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableShopdrawing')}}>
            <Icon name="calendar-multiselect" size={iconSize} color={'salmon'} />
            <Text style={[titleIcon, {color: 'salmon'}]}>Monitoring</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PageShopdrawing;