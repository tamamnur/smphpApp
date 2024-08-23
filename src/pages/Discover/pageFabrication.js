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

const PageFabrication = () => {
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
      <Header /><TitlePages Title={'Fabrication'} />
      <View style={[wrapper, {marginTop:-45}]}>
        <View style={icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableLayout')}}>
            <View style={{alignSelf: 'center'}}>
              <IconAnt name="layout" size={iconSize} color={'#EDAE49'}/>
            </View>
            <Text style={[titleIcon,{color:'#EDAE49'}]}>Layout</Text>
          </TouchableOpacity>
        </View>
        <View style={icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableMech')}}>
            <View style={{alignSelf: 'center'}}>
              <Icon name="tools" size={iconSize} color={'#EF476F'} />
            </View>
            <Text style={[titleIcon, {color: '#EF476F'}]}>Mechanical</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={wrapper}>
        <View style={icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableWiring')}}>
            <View style={{alignSelf: 'center', paddingBottom: 5}}>
              <Icon name="sitemap-outline" size={iconSize} color={'#118AB2'} />
            </View>
            <Text style={[titleIcon, {color: '#118AB2'}]}>Wiring</Text>
          </TouchableOpacity>
        </View>
        {division && <>
        <View style={icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('FormFabrication')}}>
            <View style={{alignSelf: 'center'}}>
              <Icon name="content-save-edit-outline" size={iconSize} color={'#06D6A0'}/>
            </View>
            <Text style={[titleIcon,{color:'#06D6A0'}]}>Input Progress</Text>
          </TouchableOpacity>
        </View>
        </> }
      </View>
    </ScrollView>
  );
};

export default PageFabrication;