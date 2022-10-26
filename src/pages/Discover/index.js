import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { font } from '../../assets';
import { HeaderInformation, Layanan } from '../../components';
import { fonts } from '../../assets/font';
import Drawing from '../../components/Drawing';
import Procurement from '../../components/Procurement';
import Pabrikasi from '../../components/Pabrikasi';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { WarnaAbu, WarnaHijau, WarnaPutih } from '../../utils/constant';


class Discover extends Component {
  constructor(props) {
    super(props);
    this.state ={
      drawing: 'pengajuan',
      procurement: 'konstruksi',
      pabrikasi: 'layouting'
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
        <HeaderInformation />
          <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}>Progress 
            <Text style={styles.smp}> Shopdrawing
              </Text></Text>    
          </View>

          <View style={styles.SDWrapp}>
            <Drawing
              title="Pengajuan Shopdrawing" 
              onPress={() => this.clickDrawing('Pengajuan Shopdrawing')}
              active={this.state.drawing === 'Pengajuan Shopdrawing' ? true : false}
              />
            <Drawing
              title="Approval Shopdrawing" 
              onPress={() => this.clickDrawing('Approval Shopdrawing')}
              active={this.state.drawing === 'Approval Shopdrawing' ? true : false}
              />
            <Drawing
              title="Revisi Shopdrawing" 
              onPress={() => this.clickDrawing('Revisi Shopdrawing')}
              active={this.state.drawing === 'Revisi Shopdrawing' ? true : false}
              />
            </View>
            </View>

          <View style={styles.Wrapper}>
          <View style={styles.groupTitle}>
            <Text style={styles.Progress}>Pengadaan 
            <Text style={styles.smp}> Material
              </Text></Text>    
          </View>

          <View style={styles.POWrapp}>
            <Procurement
              title="Konstruksi" 
              onPress={() => this.clickProcurement('Konstruksi')}
              active={this.state.procurement === 'Konstruksi' ? true : false}
              />
            <Procurement
              title="Busbar Cu" 
              onPress={() => this.clickProcurement('Busbar Cu')}
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
            <Text style={styles.Progress}>Progress 
            <Text style={styles.smp}> Pabrikasi
              </Text></Text>    
          </View>
          <View style={styles.PabWrapp}>
            <Pabrikasi
              title="Layouting" 
              onPress={() => this.clickProcurement('Layouting')}
              active={this.state.procurement === 'Layouting' ? true : false}
              />
            <Pabrikasi
              title="Mekanik" 
              onPress={() => this.clickProcurement('Set. Busbar')}
              active={this.state.procurement === 'Set. Busbar' ? true : false}
              />
            <Pabrikasi
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
    color: '#919191',
    fontSize: 17,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold'
  },
  smp:{
    fontSize: 20,
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

  }
})