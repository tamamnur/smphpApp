import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import { IconBack, IconAdd, LogoSmpHP } from '../../assets'
import { BiruKu } from '../../utils/constant'
import InputDataProject from '../../components/InputDataProject'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import Title2 from '../../components/Title2'

const PanelNameInput = ({route}) => {
  const [errorText, setErrorText] = useState('');
  const {ProjectId} = route.params;

  const [formQty, setFormQty] = useState(1);
  const navigation = useNavigation();

  const forms = [...Array(formQty)];
  
  const [pnameInput, setPnameInput] = useState([]);

  const onPnameInputChange = (value,index) => {
    const PanelName = pnameInput.slice()
    PanelName[index] = value;
    setPnameInput(PanelName)

    if(PanelName.some(item => item.trim() === '')) {
      setErrorText('Please fill in all panel names');
    } else {
      setErrorText('');
    }   
  }

  const handlePnameInput = async () => {
    if (pnameInput.some(item => item.trim() === '')) {
      setErrorText('Please fill in all panel names');
      return;
    }
    const batch = firestore().batch();
    pnameInput.forEach((item, index) => {
      batch.set(firestore().doc(`Project/${ProjectId}/PanelName/${index+1}`),
      {pnameInput:item});
    })
    try {
      await batch.commit();
        console.log('pname input was successfull');
        navigation.replace("SecuredNav")
    } 
    catch (err)  {
      console.error(err);
    }
  }

  return (    
  <View style={{marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
          <LogoSmpHP style={{marginLeft: 180}}/>
      </View>
        <Title2 TxtTitle="PANEL NAMES INPUT"/>
        {forms.map((item, index) => {
            return (
            <InputDataProject 
              label="Panel Name"
              key={index.toString()}
              onChangeText={ value=> {
                onPnameInputChange(value,index)}}
            />)
          })
        }
        
        <TouchableOpacity style={styles.iconAdd}>
          <IconAdd onPress={() => setFormQty((prev) => prev + 1)}/>
        </TouchableOpacity>

        {errorText !== '' && (
          <Text style={{color: 'red', textAlign:'center', marginVertical: 10}}>
            {errorText}
          </Text>
        )}
      
        <TouchableOpacity style={styles.btn} onPress={handlePnameInput}>
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'Poppins-Bold', fontSize: 16}}>Create Project</Text>
        </TouchableOpacity>        
   </View>
)
}

export default PanelNameInput

const styles = StyleSheet.create({
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