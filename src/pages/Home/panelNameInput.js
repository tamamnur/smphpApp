import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import { IconBack, IconAdd, LogoSmpHP } from '../../assets'
import { BiruKu } from '../../utils/constant'
import InputDataProject from '../../components/InputDataProject'
import Title from '../../components/Title'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'

const PanelNameInput = ({route}) => {
  const {ProjectId} = route.params;

  const [formQty, setFormQty] = useState(1);
  const navigation = useNavigation();

  const forms = [...new Array(formQty)];
  
  const [pnameInput, setPnameInput] = useState([]);

  const onPnameInputChange = (value,index) => {
    const PanelName = pnameInput.slice()
    PanelName[index] = value;
    setPnameInput(PanelName)
  }

  const handlePnameInput = async () => {
       
    const batch = firestore().batch();
    
    pnameInput.forEach((item, index) => {
      batch.set(firestore().doc(`Project/${ProjectId}/PanelName/${index+1}`), {pnameInput:item});
    })
    
    batch.commit().then(response => {
      console.log('pname input was successfull');
    }).catch(err => {
      console.error(err);
    })

    navigation.replace("SecuredNav")
  }

  return (    
  <View style={styles.page}>
      <View style={styles.header}>
          {/* <IconBack onPress={'CreateProject'} style={{marginTop: 10, marginLeft: 30}}/> */}
          <LogoSmpHP style={{marginLeft: 180}}/>
      </View>
        <Title TxtTitle="PANEL NAMES INPUT"/>
        {
          forms.map((item, index) => {
            return (
            <InputDataProject 
              label="Panel Name"
              key={index.toString()}
              
              onChangeText={(value)=>{onPnameInputChange(value,index)}}
              />)
          })
        }
        
        <TouchableOpacity style={styles.iconAdd}>
          <IconAdd onPress={() => setFormQty((prev) => prev + 1)}/>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.btn} onPress={handlePnameInput}>
        {/* onPress={()=> navigation.navigate('Home')}> */}
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'Poppins-Bold', fontSize: 16}}>Create Project</Text>
        </TouchableOpacity>
        
   </View>
)
}

export default PanelNameInput

const styles = StyleSheet.create({
  page:{
    marginTop: 20
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
  iconAdd:{
    marginLeft: 105,
    marginBottom: 45,
    flex: 2
  }
})