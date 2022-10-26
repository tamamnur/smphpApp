import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { LogoSmpHP, IconNewSPG, IconNewSPK } from '../../assets';
import SDrawing from '../../components/SDrawing';
import Procurement from '../../components/Procurement';
import Fabrication from '../../components/Fabrication';
import { BiruKu, WarnaAbu, WarnaHijau, WarnaPutih } from '../../utils/constant';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state ={
      drawing: 'pengajuan',
      procurement: 'konstruksi',
      Fabrication: 'layouting'
    }}

    clickDrawing(value) {
      this.setState({
        drawing:value
      })
    }

    clickProcurement(value) {
      this.setState({
        procurement:value
      })
    }

    clickPabrikasi(value) {
      this.setState({
        pabrikasi:value
      })
    }
  
  render () {
    return (
      <ScrollView>
        <View style={styles.LogoSmpHP}><LogoSmpHP /></View>
        <Text style={styles.BigTitle}>Production Monitoring </Text>
        <View style={styles.SPGK}>
            <TouchableOpacity style={styles.SPG}>
              <IconNewSPG onPress={() => this.props.navigation.navigate('CreateSPG')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SPK}>
              <IconNewSPK onPress={() => this.props.navigation.navigate('CreateSPK')}/>
            </TouchableOpacity>
        </View>
          <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}>Shopdrawing Progress 
            {/* <Text style={styles.smp}> Shopdrawing
              </Text> */}
              </Text>    
          </View>

          <View style={styles.SDWrapp}>
            <TouchableOpacity >
              <SDrawing
                title="Pengajuan Shopdrawing" 
                // onPress={() => this.clickDrawing('Pengajuan Shopdrawing')}
                onPress={() => this.props.navigation.navigate('SD_Submission')}
                active={this.state.drawing === 'Pengajuan Shopdrawing' ? true : false}
                /></TouchableOpacity>
            <TouchableOpacity >
              <SDrawing 
                title="Approval Shopdrawing"
                onPress={() => this.props.navigation.navigate('SD_Revisi')} 
                // onPress={() => this.clickDrawing('Approval Shopdrawing')}
                active={this.state.drawing === 'Approval Shopdrawing' ? true : false}
                /></TouchableOpacity>
              <TouchableOpacity >
                <SDrawing
                  title="Revisi Shopdrawing" 
                  onPress={() => this.props.navigation.navigate('SD_Approval')}
                  // onPress={() => this.clickDrawing('Revisi Shopdrawing')}
                  active={this.state.drawing === 'Revisi Shopdrawing' ? true : false}
                  /></TouchableOpacity>
            </View>
            </View>

          <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}>Material Procurement 
            {/* <Text style={styles.smp}> Material              </Text> */}
            </Text>    
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
            </View>

          <View style={styles.Wrapper}>          
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}> Fabrication Progress 
            {/* <Text style={styles.smp}> Pabrikasi              </Text> */}
            </Text>    
          </View>
          <View style={styles.PabWrapp}>
            <TouchableOpacity>
              <Fabrication
                title="Layouting" 
                onPress={() => this.clickProcurement('Layouting')}
                active={this.state.procurement === 'Layouting' ? true : false}
                />
            </TouchableOpacity>
            <Fabrication
              title="Mechanic" 
              onPress={() => this.clickProcurement('Set. Busbar')}
              active={this.state.procurement === 'Set. Busbar' ? true : false}
              />
            <Fabrication
              title="Wiring" 
              onPress={() => this.clickProcurement('Wiring')}
              active={this.state.procurement === 'Wiring' ? true : false}
              />
            </View>
          </View>  

      </ScrollView>
      )
    }
  }     


  export default Discover;

const styles = StyleSheet.create({
  groupTitle:{
    paddingTop: 5,
    paddingHorizontal: 20,
    marginLeft: -10,

  },
  Progress:{
    color: '#324A5E',
    fontSize: 17,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold'
  },
  smp:{
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Acme-Regular'
  },
  SDWrapp:{
    flexDirection: 'row',
  },

  POWrapp:{
    flexDirection: 'row',
    marginHorizontal: -2,
    marginTop: -10 
  },
  PabWrapp:{
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingRight:10,
    marginTop: -10
  },
  Wrapper:{
    backgroundColor: '#D4D6D3',
    marginTop: 15,
    marginHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 20,
  },
  LogoSmpHP:{
    marginTop:30, 
    marginBottom:10,
    marginHorizontal: 20,
    flex: 2,
    alignItems: 'flex-end'
  },
  BigTitle:{
    marginHorizontal: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Acme-Regular',
    color: BiruKu    
  },
  SPGK:{
    flex: 2,
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center'
  },
  SPG:{
    marginLeft: 85
  },
  SPK:{
    marginHorizontal: 20
  }
})