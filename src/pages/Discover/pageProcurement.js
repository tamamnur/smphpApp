import {Text,View,ScrollView,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/HeaderToDiscover';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {BiruKu} from '../../utils/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {TitlePages} from '../../components/ButtonPages';
import { titleIcon } from '../../utils/fontStyles';

const PageProcurement = () => {
  const navigation = useNavigation();
  const [division, setDivision] = useState(false);
  const isMountedRef = useRef(true);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firestore().collection('User').doc(currentUser.uid)
    .onSnapshot(doc => {
      if (isMountedRef.current) {
        const user = doc.data();
        const isLogistic = user.division === 'Logistic';
        setDivision(isLogistic);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView style={{marginTop: 20}}>
      <Header /><TitlePages Title={'Procurement'} />
      <View style={styles.wrapper}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableConstruction')}}>
            <View style={{alignSelf: 'center'}}>
              <IconAnt name="calculator" size={iconSize} color={'#118AB2'}/>
            </View>
            <Text style={[titleIcon,{color:'#118AB2'}]}>Construction</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.icon,{paddingHorizontal: 32}]}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableBusbar')}}>
            <Icon name="library-shelves" size={iconSize} color={'#06D6A0'} />
            <Text style={[titleIcon, {color: '#06D6A0'}]}>Busbar Cu</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('TableComponent')}}>
            <View style={{alignSelf: 'center'}}>
              <Icon name="integrated-circuit-chip" size={iconSize} color={'#EF476F'} />
            </View>
            <Text style={[titleIcon, {color: '#EF476F'}]}>Component</Text>
          </TouchableOpacity>
        </View>
        {division && <>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => {navigation.navigate('FormProcurement')}}>
            <View style={{alignSelf: 'center'}}>
              <Icon name="content-save-edit-outline" size={iconSize} color={'#EDAE49'}/>
            </View>
            <Text style={[titleIcon,{color:'#EDAE49'}]}>Input Progress</Text>
          </TouchableOpacity>
        </View>
        </> }
      </View>
    </ScrollView>
  );
};

export default PageProcurement;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const iconSize = height * 0.1;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: -10,
    marginBottom: 30,
  },
  icon: {
    borderWidth: height * 0.0035,
    borderColor: BiruKu,
    borderRadius: 10,
    width: width*.38,
    padding: 20,
    marginBottom: 15
    // paddingHorizontal: 30
  }
});