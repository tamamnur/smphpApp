import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconInput2, IconSD_Pengajuan, IconSD_Approv, IconSD_Revisi, IconKonsutruksi, 
  IconCu, IconKomponen, IconLayouting, IconMekanik, IconWiring, } from '../../assets';
import {BiruKu, Darkred} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/MaterialIcons';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/HeaderUserInfo';
import { BigTitle, DiscTitle, iconDisc } from '../../utils/fontStyles';

const height = Dimensions.get('window').height;
const iconSize = height*0.142;
const Input = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{flexDirection: 'row', marginTop: 4, alignSelf: 'center', marginBottom: -15}}>
        <View style={{marginTop: 2}}><IconInput2 /></View>
        <View>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15, color: 'blue', marginLeft: 5, marginVertical: 5}}>
            {props.title} </Text></View>
      </View>
    </TouchableOpacity>
  );
};


class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted : false,  
      isDrafterOrAdmin: false,
      isProductionOrAdmin: false,
    };
  }
  componentDidMount() {
    this.setState({isMounted: true});
    const currentUser = firebase.auth().currentUser;
    this.unsubscribe = firestore().collection('User')
      .doc(currentUser.uid).onSnapshot(doc => {
        if(this.state.isMounted) {
          const user = doc.data();
          const isDrafter = user.division === 'Drafter' || user.division ==='Marketing';
          const isProduction = user.division === 'Production';
          const isSales = user.division === 'Marketing';
          // const isProductionOrAdmin = user.division === 'Production' || user.division === 'Admin';
          // this.setState({isProductionOrAdmin});
          this.setState({isDrafter, isProduction});
          // this.setState({isProduction});
        }
      });
  }
  componentWillUnmount(){
    this.setState({isMounted: false});
    if(this.unsubscribe){
      this.unsubscribe();
    }
  }

  render() {
    const {isDrafter, isProduction} = this.state; 
    // const {isProduction}= this.state
    // const {isProductionOrAdmin} = this.state;
    return (
      <View style={styles.page}><Header/>
        <Text style={[DiscTitle, {marginTop: 30}]}>Production Monitoring </Text>
        <ScrollView style={{flex: 1, alignSelf: 'center', width: '100%'}}>
            <View style={styles.wrapper}>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => {
                  const pageSD = isDrafter ? 'PageShopdrawing' : 'TableShopdrawing';
                  this.props.navigation.navigate(pageSD)
                }}>
                  <Icon name='file-cad-box' size={iconDisc} color={'#EF476F'}/>
                  <Text style={styles.titleIcon}>Shopdrawing</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity 
                  onPress={() => {this.props.navigation.navigate('PageProcurement')}}>
                  <Icon name='store-outline' size={iconDisc} color={'#EDAE49'}/>
                  <Text style={styles.titleIcon}>Procurement</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.icon}>
                <TouchableOpacity 
                  onPress={() => {this.props.navigation.navigate('PageFabrication')}}>
                  <IconE name='engineering' size={iconDisc} color={'#06D6A0'}/>
                  <Text style={styles.titleIcon}>Fabrication</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => {
                  const page = isProduction ? 'PageFinishing' : 'TableFinishing';
                  this.props.navigation.navigate(page)}}>
                  <Icon name='progress-check' size={iconDisc} color={'#118AB2'}/>
                  <Text style={styles.titleIcon}>Test & Delivery</Text>
                </TouchableOpacity>
              </View>
              </View>
        </ScrollView>
      </View>
    );
  }
}

export default Discover;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  BigTitle: {
    marginLeft: 10,
    fontSize: 30,
    fontFamily: 'Acme-Regular',
    color: BiruKu,
    marginBottom:10
  },
  icon: {
    // borderWidth: 3,
    borderWidth: height*.0035,
    borderColor: BiruKu,
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 'auto',
  },
  titleIcon: {
    fontFamily: 'Poppins-Medium',
    fontSize: height*.02,
    color: BiruKu,
    alignContent: 'center',
    alignSelf: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  }
});