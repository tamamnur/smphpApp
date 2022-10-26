import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { LogoAdd, IconBack, LogoSmpHP } from '../../assets'
import Title2 from '../../components/Title2'
import Memo from './Memo'
import { BiruKu } from '../../utils/constant'
import MemoIndex from './MemoIndex'

export default class MemoPage extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
            <IconBack onPress={()=> this.props.navigation.navigate('Home')}/>
            <LogoSmpHP style={{marginLeft: 180 }}/>
        </View>
            <Text style={styles.title}>MEMO INTERNAL</Text>
            
        <ScrollView >
            <MemoIndex 
              proj='Adaro MSW' 
              day='Wednesday, 12 Oktober 2022'
              from="Marketing" 
              for="Drafter"
              due="04-10-2022"
              message="Untuk Proyek Adaro Mining Electrification Batch-5 mohon segera selesaikan gambar revisi sesuai dengan catatan pada Approval. Shopdrawing akan disubmit pada tanggal 16-10-2022."
            />
             <MemoIndex 
              proj="Sanbe Farma"
              day="Thursday, 01 Oktober 2022"
              from="Marketing" 
              for="Production"
              due="04-10-2022"
              message="Jadwal pengiriman panel GCP-DISTRIBUTION pada hari Selasa 04-10-2022, Mohon dikondisikan agar dapat dikirim sesuai jadwal tersebut."
            />
            <MemoIndex
              proj="Orchard Park Batam"
              day="Thursday, 27 Juli 2022"
              from="Marketing" 
              for="Drafter"
              due="04-10-2022"
              message="Mohon segera selesaikan gambar revisi sesuai dengan catatan pada Approval."
            />
            <MemoIndex
              proj="Orchard Park Batam"
              day="Thursday, 27 Juli 2022"
              from="Marketing" 
              for="Drafter"
              due="04-10-2022"
              message="Mohon segera selesaikan gambar revisi sesuai dengan catatan pada Approval."
            />
        </ScrollView>
            <TouchableOpacity style={{alignItems: 'flex-end', marginHorizontal: 30}}>
                <LogoAdd onPress={() => this.props.navigation.navigate('MemoCreate')}/>
            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    marginTop: 8,
    marginBottom: 6, 
    textAlign: 'center',
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: BiruKu
  }
})