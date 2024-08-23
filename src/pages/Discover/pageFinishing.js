import {Text,View,ScrollView,TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/HeaderToDiscover';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {TitlePages} from '../../components/ButtonPages';
import { titleIcon, wrapper, icon, iconSize } from '../../utils/fontStyles';

const PageFinishing = () => {
  const navigation = useNavigation();
  const [division, setDivision] = useState(false);
  const isMountedRef = useRef(true);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firestore().collection('User').doc(currentUser.uid)
    .onSnapshot(doc => {
      if (isMountedRef.current) {
        const user = doc.data();
        const isLogistic = user.division === 'Production';
        setDivision(isLogistic);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView style={{marginTop: 20}}>
      <Header /><TitlePages Title={'Test and Delivery'} />
      <View style={[wrapper, {marginTop:-45}]}>
        <View style={icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableFinishing')}}>
            <View style={{alignSelf: 'center'}}>
              <Icon name="archive-check-outline" size={iconSize} color={'#06D6A0'}/>
            </View>
            <Text style={[titleIcon,{color:'#06D6A0', fontSize: 14.5}]}>Test & Delivery</Text>
          </TouchableOpacity>
        </View>
        <View style={icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('FormFinishing')}}>
            <View style={{alignSelf: 'center'}}>
              <Icon name="content-save-edit-outline" size={iconSize} color={'#118AB2'}/>
            </View>
            <Text style={[titleIcon,{color:'#118AB2'}]}>Input Progress</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PageFinishing;