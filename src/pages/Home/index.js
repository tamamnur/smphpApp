import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { Component } from 'react'
import {HeaderInformation, Layanan} from '../../components'
import RecapProject from './recapProject';
import { BiruKu } from '../../utils/constant';
import Memo from './Memo';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      layanan: 'shopdrawing'
    }
    }

    clicklayanan(value) {
      this.setState({
        layanan:value
      })
    }

  render() {
    return (
      <View style={styles.page}>
             <View style={styles.Header}>
             <Text style={styles.selamat}>Selamat Datang,</Text>
             <View style={{marginBottom: -10, marginTop: -10}}>
                <HeaderInformation /></View>
              <RecapProject />
              <Memo />
            </View>
{/* 
            <View style={styles.layanan}>
                <Layanan
                 title="Shopdrawing" 
                onPress={() => this.clicklayanan('shopdrawing')}
                active={this.state.layanan === 'shopdrawing' ? true : false}
                />
                <Layanan
                 title="Procurement" 
                onPress={() => this.clicklayanan('procurement')}
                active={this.state.layanan === 'procurement' ? true : false}
                />
                <Layanan
                 title="Pabrikasi" 
                onPress={() => this.clicklayanan('pabrikasi')}
                active={this.state.layanan === 'pabrikasi' ? true : false}
                />
            </View> */}
          </View>
    )
  }
}

   

export default Home;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    //backgroundColor: '#FFF'
  },
  Header:{
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  smp: {
    fontSize: 14
  },
  TextBold: {
    fontSize: 16,
    fontFamily: "Poppins-Bold"
  },
  wrapperSMPHP:{
    paddingHorizontal: 30,
    marginTop: 20
  },
  layanan:{
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  selamat:{
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginLeft: 20,
    color: BiruKu
  }



});