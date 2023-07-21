import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, {Component} from 'react';
import {LogoSmpHP, IconNewSPG, IconNewSPK, IconAdd, IconInput} from '../../assets';
import SDrawing from '../../components/SDrawing';
import Procurement from '../../components/Procurement';
import Fabrication from '../../components/Fabrication';
import {BiruKu, WarnaAbu, WarnaHijau, WarnaPutih} from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = (props) => {
  const navigation = useNavigation();
  return(
    <TouchableOpacity onPress={props.onPress}>
      <View style={{flexDirection: 'row', marginTop: 8, alignSelf: 'center', marginBottom: -15}}>
        <View>
          <IconInput/>
        </View>
        <View>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14, color: BiruKu, marginLeft: 5, marginTop: 3}}>
          {props.title}
        </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.LogoSmpHP}>
          {/* <LogoSmpHP /> */}
        </View>
        <Text style={styles.BigTitle}>Production Monitoring </Text>
        <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}>
              Shopdrawing Progress
            </Text>
          </View>

          <View style={styles.SDWrapp}>
            <TouchableOpacity>
              <SDrawing
                title="Submission"
                onPress={() => this.props.navigation.navigate('SD_Submission')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SDrawing
                title="Approval"
                onPress={() => this.props.navigation.navigate('SD_Revisi')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SDrawing
                title="Revision"
                onPress={() => this.props.navigation.navigate('SD_Approval')}
              />
            </TouchableOpacity>
          </View>
            <Input 
              title="Input Progress"
              onPress={()=> this.props.navigation.navigate('FormShopdrawing')}
            />
        </View>

        <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}>Material Procurement</Text>
          </View>

          <View style={styles.POWrapp}>
            <Procurement
              title="Konstruksi"
              onPress={() => this.props.navigation.navigate('SD_Approval')}
              // onPress={() => this.clickProcurement('Konstruksi')}
              active={this.state.procurement === 'Konstruksi' ? true : false}
            />
            <Procurement
              title="Busbar Cu"
              onPress={() => this.props.navigation.navigate('SD_Approval')}
              // onPress={() => this.clickProcurement('Busbar Cu')}
              active={this.state.procurement === 'Busbar Cu' ? true : false}
            />
            <Procurement
              title="Komponen"
              onPress={() => this.clickProcurement('Komponen')}
              active={this.state.procurement === 'Komponen' ? true : false}
            />
          </View>
          <Input 
              title="Input Progress"
              onPress={()=> this.props.navigation.navigate('FormProcurement')}
            />
        </View>

        <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}> Fabrication Progress</Text>
          </View>
          <View style={styles.PabWrapp}>
            <TouchableOpacity>
              <Fabrication
                title="Layouting"
                // onPress={() => this.clickProcurement('Layouting')}
                active={this.state.procurement === 'Layouting' ? true : false}
              />
            </TouchableOpacity>
            <Fabrication
              title="Mechanic"
              // onPress={() => this.clickProcurement('Set. Busbar')}
              active={this.state.procurement === 'Set. Busbar' ? true : false}
            />
            <Fabrication
              title="Wiring"
              // onPress={() => this.clickProcurement('Wiring')}
              active={this.state.procurement === 'Wiring' ? true : false}
            />
          </View>
          <Input 
              title="Input Progress"
              onPress={()=> this.props.navigation.navigate('FormFabrication')}
            />
        </View>
        <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}> Delivery</Text>
          </View>
          <View style={{flexDirection: 'row',alignSelf: 'center', marginVertical: -10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('FormDelivery')}>
              <View style={{marginLeft: 40}}>
                <MaterialCommunityIcons name='truck-delivery-outline' color={'blue'} size={35}/>
              </View>
              <Text style={{color: 'blue', fontFamily: 'Poppins-Medium', fontSize: 14, paddingHorizontal: 10,}}>
                    Input Progress</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </ScrollView>
    );
  }
}

export default Discover;

const styles = StyleSheet.create({
  groupTitle: {
    paddingTop: 5,
    paddingHorizontal: 20,
    marginLeft: -10,
  },
  Progress: {
    color: '#324A5E',
    fontSize: 17,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  smp: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Acme-Regular',
  },
  SDWrapp: {
    flexDirection: 'row',
  },

  POWrapp: {
    flexDirection: 'row',
    marginHorizontal: -2,
    marginTop: -15,
  },
  PabWrapp: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingRight: 10,
    marginTop: -15,
  },
  Wrapper: {
    backgroundColor: '#D4D6D3',
    marginTop:  3,
    marginHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 20,
  },
  LogoSmpHP: {
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 20,
    flex: 2,
    alignItems: 'flex-end',
  },
  BigTitle: {
    marginHorizontal: 20,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Acme-Regular',
    color: BiruKu,
  },
  SPGK: {
    flex: 2,
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  SPG: {
    marginLeft: 85,
  },
  SPK: {
    // marginHorizontal: 20,
  },
});
