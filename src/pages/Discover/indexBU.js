import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconInput2, IconSD_Pengajuan, IconSD_Approv, IconSD_Revisi, IconKonsutruksi, 
  IconCu, IconKomponen, IconLayouting, IconMekanik, IconWiring, } from '../../assets';
import {BiruKu, Darkred} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

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
          const isDrafterOrAdmin = user.division === 'Drafter' || user.division === 'Admin';
          const isProductionOrAdmin = user.division === 'Production' || user.division === 'Admin';
          this.setState({isDrafterOrAdmin});
          this.setState({isProductionOrAdmin});
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
    const {isDrafterOrAdmin} = this.state;
    const {isProductionOrAdmin} = this.state;
    return (
      <View style={styles.page}>
        <View style={{marginTop: 30, marginBottom: 10}}><Text 
          style={styles.BigTitle}>Production Monitoring </Text></View>
        <ScrollView style={{flex: 1, alignSelf: 'center', width: '100%'}}>
          <View style={styles.container}>
            <View style={{marginBottom: 30}}>
              <Text style={styles.Progress}> Shopdrawing Progress</Text>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.icon}>
                <TouchableOpacity style={{marginTop: 22}} 
                  onPress={() => { this.props.navigation.navigate('SD_Submission')}}>
                  <IconSD_Pengajuan style={{alignSelf: 'center', marginTop: -70}} />
                  <Text style={styles.titleIcon}>Submission</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('SD_Revisi')}}>
                  <IconSD_Revisi style={{alignSelf: 'center', marginTop: -50}}/>
                  <Text style={styles.titleIcon}>Revision</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('SD_Approval')}}>
                  <IconSD_Approv style={{alignSelf: 'center', marginTop: -50, marginHorizontal:-12}}/>
                  <Text style={styles.titleIcon}>Approved</Text>
                </TouchableOpacity>
              </View>
            </View>

            {isDrafterOrAdmin && (
              <Input title="Input Shopdrawing Progress"
              onPress={() => this.props.navigation.navigate('FormShopdrawing')} />
            )}
          </View>
          <View style={styles.container}>
            <View><Text style={styles.Progress}> Material Procurement</Text></View>
            <View style={styles.wrapper}>
              <View style={styles.icon}>
                <TouchableOpacity style={{marginHorizontal: -8}} 
                  onPress={() => {this.props.navigation.navigate('FormProcurement')}}>
                  <IconKonsutruksi style={{alignSelf: 'center', marginTop: -5}}/>
                  <Text style={styles.titleIcon}>Construction</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ConstructionOrder')}}>
                  <IconCu style={{alignSelf: 'center', marginTop: -5}} />
                  <Text style={styles.titleIcon}>Busbar Cu</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity style={{marginHorizontal: -7}}
                  onPress={() => {this.props.navigation.navigate('FormFabrication')}}>
                  <IconKomponen style={{alignSelf: 'center', marginTop: -5}} />
                  <Text style={styles.titleIcon}>Component</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View><Text style={styles.Progress}> Fabrication Progress</Text></View>
            <View style={styles.wrapper}>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('PageLayouting')}}>
                  <IconLayouting style={{alignSelf: 'center', marginTop: -5, marginHorizontal: 3}}/>
                  <Text style={styles.titleIcon}>Layouting</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('PageMechanic')}}>
                  <IconMekanik style={{alignSelf: 'center', marginTop: -5, marginHorizontal: -3}}/>
                  <Text style={styles.titleIcon}>Mechanic</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity style={{marginHorizontal: -7}} 
                  onPress={() => {this.props.navigation.navigate('PageWiring')}}>
                  <IconWiring style={{alignSelf: 'center',marginTop: -5,marginHorizontal: 3}}/>
                  <Text style={styles.titleIcon}>Wiring</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View><Text style={styles.Progress}> Finishing</Text></View>
            <View style={styles.wrapper}>
              <View style={styles.iconEnd}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('TestReport')}}>
                    <MaterialCommunityIcons name="archive-check-outline" color={'#10324A'} size={50}/>  
                  <Text style={styles.titleIcon}>Tested</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconEnd}>
                <TouchableOpacity style={{marginHorizontal: -7}}
                  onPress={() => {this.props.navigation.navigate('DeliveryReport')}}>
                    <MaterialCommunityIcons name="truck-delivery-outline" color={Darkred} size={50}/>
                  <Text style={styles.titleIcon}>Delivery</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isProductionOrAdmin && (
              <Input title="Input Finishing Date"
              onPress={() => this.props.navigation.navigate('FormFinishing')} />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Discover;

const styles = StyleSheet.create({
  Progress: {
    paddingHorizontal: 10,
    paddingTop: 5,
    color: BiruKu,
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  container: {
    alignContent: 'center',
    backgroundColor: '#D4D6D3',
    marginVertical: 5,
    paddingBottom: 15,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  BigTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Acme-Regular',
    color: BiruKu,
  },
  icon: {
    borderWidth: 3,
    padding: 15,
    borderRadius: 10,
    borderColor: BiruKu,
  },
  iconEnd: {
    borderWidth: 3,
    paddingHorizontal: '16.5%',
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: BiruKu,
  },
  titleIcon: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: BiruKu,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 3,
    marginBottom: -10,
  },
  wrapper: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    width: '100%',
  }
});