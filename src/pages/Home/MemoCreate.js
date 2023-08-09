import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { IconBack, LogoSmpHP } from '../../assets'
import { BiruKu } from '../../utils/constant'
import Title2 from '../../components/Title2'
import InputData from '../../components/InputData'
import Division from '../../components/Division'

export default class MemoCreate extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       division : ['Admin','Direktur','Drafter','Logistics','Production','Sales'],
  //   }
  // }

    render(){
    return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
          <IconBack onPress={() => this.props.navigation.navigate('Home')} style={{marginTop: 10, marginLeft: 30}}/>
          <LogoSmpHP style={{marginLeft: 180}}/>
      </View>
        <Title2 TxtTitle="MEMO INTERNAL"/>
        <View>
          <Text style={styles.label} >From</Text>
        </View>
        <Division />
        <View>
          <Text style={styles.label} >For</Text>
        </View>
        <Division />
        <InputData label="Project"/>
        <InputData label="Due Date" />
        {/* <DateInput /> */}
        <View><Text style={styles.label}>Message</Text>
        <TextInput style={styles.txtArea} multiline 
          // onChangeText={(val) => setMessage(val)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate('MemoPage')}>
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'Poppins-Bold', fontSize: 16}}>Create Memo</Text>
        </TouchableOpacity>
        
   </ScrollView>
  )
}}

const styles = StyleSheet.create({
  page:{
    marginTop: 30,
    flex: 1
    },
  header:{
    flexDirection: 'row',
  },
  btn:{
    color: '#FFF',
    backgroundColor: BiruKu,
    marginTop: 35,
    marginHorizontal: 55,
    paddingHorizontal: 10,
    paddingVertical: 14,
    elevation: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center'
  },
  area:{
    backgroundColor: '#EDEDED', 
    borderRadius:5,
    borderWidth: 1,
    borderColor: BiruKu,
    marginHorizontal: 48,
    marginTop: 5,
    marginBottom: 5, 
    elevation: 1,
    height: 40,
    fontSize: 11,
    justifyContent: 'center',
 },
 pickStyl:{
    fontSize: 13,
    fontFamily: 'Poppins-Regular'
},
label:{
  fontSize: 14,
  fontFamily: "Poppins-Regular",
  color: BiruKu,
  marginHorizontal: 30,
  marginLeft: 50,
  marginTop: 10
},
txtArea:{
  borderWidth: 1,
  borderColor: BiruKu,
  borderRadius: 5,
  marginHorizontal: 50,
  padding: 10,
  height: 100,
  textAlign: 'justify',
  textAlignVertical: 'top',
  
},
values:{
  marginBottom: 15,
  height: 40,
  width: 230,
  paddingVertical: 10,
},
txtInput:{
  borderWidth: 1,
  borderColor: BiruKu,
  borderRadius: 5,    
  height: 35,
  padding: 10,
  marginVertical: 8,
  width: 240
},
})