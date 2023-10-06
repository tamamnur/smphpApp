import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, } from 'react-native';
import React, {Component} from 'react';
import { IconInput, IconInput2, } from '../../assets';
import SDrawing from '../../components/SDrawing';
import Procurement from '../../components/Procurement';
import Fabrication from '../../components/Fabrication';
import {BiruKu, Darkred} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Input = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{flexDirection: 'row',marginTop: 8,alignSelf: 'center',marginBottom: -15,}}>
        <View style={{marginTop: 2}}><IconInput2 /></View>
        <View>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'blue', marginLeft: 5, marginVertical: 5, }}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};  
const height = Dimensions.get('window').height;
class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{marginTop: 30, marginBottom: 5}}> 
          <Text style={styles.BigTitle}>Production Monitoring </Text>
        </View>
        <ScrollView style={{flex: 1, alignSelf: 'center'}}>
          <View style={styles.Wrapper}>
            <View style={styles.groupTitle}>
              <Text style={styles.Progress}>Shopdrawing Progress</Text>
            </View>
            <View style={styles.SDWrapp}>
              <TouchableOpacity>
                <SDrawing
                  title="Submission"
                  onPress={() =>
                    this.props.navigation.navigate('SD_Submission')
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <SDrawing
                  title="Revision"
                  onPress={() => this.props.navigation.navigate('SD_Revisi')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <SDrawing
                  title="Approval"
                  onPress={() => this.props.navigation.navigate('SD_Approval')}
                />
              </TouchableOpacity>
            </View>
            <Input
              title="Input Shopdrawing Progress"
              onPress={() => this.props.navigation.navigate('FormShopdrawing')}
            />
          </View>

          <View style={styles.Wrapper}>
            <View style={styles.groupTitle}>
              <Text style={styles.Progress}>Material Procurement</Text>
            </View>

            <View style={styles.POWrapp}>
              <Procurement
                title="Konstruksi"
                onPress={() => this.props.navigation.navigate('PageConstruction')}
                active={this.state.procurement === 'Konstruksi' ? true : false}
              />
              <Procurement
                title="Busbar Cu"
                onPress={() => this.props.navigation.navigate('PageBusbar')}
                active={this.state.procurement === 'Busbar Cu' ? true : false}
              />
              <Procurement
                title="Komponen"
                onPress={() => this.props.navigation.navigate('PageComponent')}
                active={this.state.procurement === 'Komponen' ? true : false}
              />
            </View>
          </View>

          <View style={styles.Wrapper}>
            <View style={styles.groupTitle}>
              <Text style={styles.Progress}> Fabrication Progress</Text>
            </View>
            <View style={styles.PabWrapp}>
              <TouchableOpacity>
                <Fabrication
                  title="Layouting"
                  onPress={() => this.props.navigation.navigate('PageLayouting')}
                  active={this.state.procurement === 'Layouting' ? true : false}
                />
              </TouchableOpacity>
              <Fabrication
                title="Mechanic"
                onPress={() => this.props.navigation.navigate('PageMechanic')}
                active={this.state.procurement === 'Set. Busbar' ? true : false}
              />
              <Fabrication
                title="W i r i n g"
                onPress={() => this.props.navigation.navigate('PageWiring')}
                active={this.state.procurement === 'Wiring' ? true : false}
              />
            </View>
          </View>
          <View style={styles.Wrapper}>
            <View><Text style={styles.Progress}> Finishing</Text></View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginBottom: -10, marginTop: 5}}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('FormFinishing')} 
                style={{marginHorizontal: 15, alignItems:'center'}}>
                <View >
                  <MaterialIcons name='input' color={'black'} size={35}/>
                </View>
                <Text style={{ color: '#10324A', fontFamily: 'Poppins-Regular', fontSize: 14, }}>
                  Input Progress
                </Text>
              </TouchableOpacity>
              <View>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('TestReport')}
                style={{alignItems:'center', marginHorizontal: 25}}>
                <View>
                  <AntDesign name="switcher" color={'#10324A'} size={35} />
                </View>
                <Text style={{ color: '#10324A', fontFamily: 'Poppins-Regular', fontSize: 14, }}>
                  Tested
                </Text>
              </TouchableOpacity>
              </View>
              <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DeliveryReport')}
                style={{alignItems:'center', marginHorizontal: 25}}>
                <View>
                  <MaterialCommunityIcons name="truck-delivery-outline" color={Darkred} size={35} />
                </View>
                <Text style={{ color: '#10324A', fontFamily: 'Poppins-Regular', fontSize: 14, paddingHorizontal: 10, }}>
                  Delivery
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Discover;

const styles = StyleSheet.create({
  groupTitle: {
    paddingTop: 5,
    // paddingHorizontal: 20,
    // marginLeft: -10,
  },
  Progress: {
    paddingHorizontal: 10,
    paddingTop: 5,
    color: BiruKu,
    fontSize: 16,
    // textAlign: 'left',
    fontFamily: 'Poppins-SemiBold',
    // fontFamily: 'Acme-Regular',
    // fontWeight: 'bold',
  },
  SDWrapp: {
    flexDirection: 'row',
  },

  POWrapp: {
    flexDirection: 'row',
    // marginHorizontal: 2,
    marginTop: -15,
  },
  PabWrapp: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: -15,
  },
  Wrapper: {
    backgroundColor: '#D4D6D3',
    marginVertical: 5,
    // marginHorizontal: 10,
    paddingBottom: 15,
    borderRadius: 20,
  },
  BigTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Acme-Regular',
    color: BiruKu,
  },
});