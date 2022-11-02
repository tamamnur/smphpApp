import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IconAdd, IconBack, LogoSmpHP } from '../../assets'
import { BiruKu } from '../../utils/constant'
import InputDataProject from '../../components/InputDataProject'
import { useNavigation } from '@react-navigation/native'
import Title from '../../components/Title'
import firestore, { firebase } from '@react-native-firebase/firestore';
import Project from '../Discover/project'
import PickedDateFull from '../../components/pickedDateFull'

const CreateProject = (props) => {
  const navigation = useNavigation();
  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState();
  const [customer, setCustomer] = useState();
  const [numberPO, setNumberPO] = useState();
  const [datePO, setDatePO] = useState();

  const ref = firestore().collection('Project')

  const onProjectIdChange = (value) => {
      setProjectId(value)
  }
  const onProjectNameChange = (value) => {
      setProjectName(value)
  }
  const onCustomerChange = (value) => {
      setCustomer(value)
  }
  const onNumberPOChange = (value) => {
      setNumberPO(value)
  }
  const onDatePOChange = (value) => {
    setDatePO(value)
    console.log(value)
  }
  
  const handleCreateProject = async ()=>{
    console.log(projectId)
    console.log(projectName)
    console.log(customer)
    console.log(numberPO)
    console.log(datePO)
    
    const projectCollection = await firestore()
    .collection('Project')
    .add({
      projectId: projectId,
      projectName: projectName,
      customer: customer,
      numberPO: numberPO,
      datePO: firestore.Timestamp.fromDate(datePO),
    })
    .then(() => {
      console.log('Project Created');
      navigation.navigate('PanelNameInput')
    })
    .catch((error) => {
      console.log(error)
    })
  }

    return (
    <View style={styles.page}>
      <View style={styles.header}>
          <IconBack onPress={() => navigation.navigate('Home')} style={{marginTop: 10, marginLeft: 30}}/>
          <LogoSmpHP style={{marginLeft: 180}}/>
      </View>
        <Title TxtTitle="NEW PROJECT"/>
        <InputDataProject label="ProjectID" onChangeText={onProjectIdChange}/>
        <InputDataProject label="Project Name" onChangeText={onProjectNameChange}/>
        <InputDataProject label="Customer" onChangeText={onCustomerChange}/>
        <InputDataProject label="PO Number" onChangeText={onNumberPOChange}/>
        <View style={styles.container}>
            <Text style={styles.label}>P?O Date</Text>
                <Text style={styles.txtInput} onChangeText={onDatePOChange}>
                  <PickedDateFull onChangeText={onDatePOChange}/> 
                </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.btn} 
          onPress={handleCreateProject}
          >
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'Poppins-Bold', fontSize: 16}}>Continue</Text>
        </TouchableOpacity>
        
   </View>
  )
}

export default CreateProject;

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
  container:{
    justifyContent: 'flex-end',    
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  label:{
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    marginBottom:5,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'right'    
  },

  txtInput:{
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,    
    height: 35,
    padding: 10,
    marginVertical: 8,
    width: 240,
    marginHorizontal: 10,
    width: 250,
  }

})