import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IconAdd, IconBack, LogoSmpHP } from '../../assets'
import { BiruKu } from '../../utils/constant'
import InputDataProject from '../../components/InputDataProject'
import { useNavigation } from '@react-navigation/native'
import Title from '../../components/Title'
import firestore from '@react-native-firebase/firestore';

const CreateProject = (props) => {
  const navigation = useNavigation();

  // const submitProject = async () => {
  //   firestore()
  //   .collection('Project')
  //   .add({
  //     projectId: projectId,
  //     projectName: projectName,
  //     customer: customer,
  //     numberPO: numberPO,
  //     datePO: datePO,
  //   })
  //   .then(()=>{
  //     console.log('Project Added!')
  //   })
  //   .catch((error) =>{
  //     console.log('Something', error);
  //   })
  // }
    return (
    <View style={styles.page}>
      <View style={styles.header}>
          <IconBack onPress={() => navigation.navigate('Home')} style={{marginTop: 10, marginLeft: 30}}/>
          <LogoSmpHP style={{marginLeft: 180}}/>
      </View>
        <Title TxtTitle="NEW PROJECT"/>
        <InputDataProject label="ProjectID"/>
        <InputDataProject label="Project Name"/>
        <InputDataProject label="Customer"/>
        <InputDataProject label="PO Number"/>
        <InputDataProject label="PO Date"/>
        
        <TouchableOpacity 
          style={styles.btn} 
          onPress={()=> 
            // this.addData()
          navigation.navigate('PanelNameInput')
          // navigation.navigate('Project')
          }>
            
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'Poppins-Bold', fontSize: 16}}>Continue</Text>
        </TouchableOpacity>
        
   </View>
  )
}

export default CreateProject ()
// ({
//   mapPropsToValues: () => ({ projectId: '', projectName: '', customer: '', numberPO: '', datePO: ''}),
//   validationSchema: (props) => object 
// })



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
  }
})