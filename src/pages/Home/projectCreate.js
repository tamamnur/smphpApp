import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import {IconBack, LogoSmpHP } from '../../assets'
import { BiruKu } from '../../utils/constant'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import PickedDateFull from '../../components/pickedDateFull'
import Title2 from '../../components/Title2'

const updateError = (error, stateUpdate) => {
  stateUpdate(error)
  setTimeout(() => {
    stateUpdate('')
  }, 3000) 
}

const ProjectCreate = (props) => {
  const navigation = useNavigation();
  const [datePO, setDatePO] = useState();

  const onDatePOChange = (value) => {
    setDatePO(value)
  }
  const [projectInfo, setProjectInfo] = useState({
    projectId: '',
    projectName: '',
    customer: '',
    numberPO: ''
  })

  const [error, setError] = useState('');
  const {projectId, projectName, customer, numberPO} = projectInfo;
  const handleOnchangeText = (value, fieldName) => {
    setProjectInfo ({...projectInfo, [fieldName]: value})
  } 

  const isValidForm = () => {
    if(!projectName.trim() || projectName.length < 3 ) return updateError ('Invalid name of project', setError)
    if(!customer.trim() || customer.length < 3 ) return updateError ('Invalid customer name', setError)
    // if(!numberPO.trim() || numberPO.length < 2 ) return updateError ('Invalid number PO', setError)
    if(!datePO) return updateError ('Invalid date PO', setError)
    return true;
  }
  const submitForm =()=> {
    { isValidForm() ? handleCreateProject() : error} 
  }

  const handleCreateProject = async ()=>{
    console.log(projectId, projectName, customer, numberPO, datePO);
    const createdAt = new Date();

    await firestore()
    .collection('Project')
    .add({
      projectId: projectId,
      projectName: projectName,
      customer: customer,
      numberPO: numberPO,
      datePO: firestore.Timestamp.fromDate(datePO),
      updatedAt: firestore.Timestamp.fromDate(createdAt),
      status: 'Created At'
    })
    .then((response) => {
      console.log('Project Created');
      ToastAndroid.show('Project Created, Continue to adding Panel Names', ToastAndroid.SHORT)
      navigation.navigate('PanelNameInput', {
        ProjectId: response.id, 
      })
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
        <Title2 TxtTitle="N  E  W        P  R  O  J  E  C  T"/>
          {error ? (
            <Text style={{color: 'red', fontSize: 13, textAlign: 'center', marginVertical:10}}>
              {error} 
          </Text> 
          ) : null}
      <View>
        <View style={{flexDirection: 'row', marginHorizontal: 8}}>
          <View>
            <Text style={styles.left}> SO Number</Text>
            <Text style={styles.left}> Project Name</Text>
            <Text style={styles.left}> Customer</Text>
            <Text style={styles.left}> PO Number</Text>
            <Text style={styles.left}> PO Date</Text>
          </View>
          <View>
            <TextInput style={styles.right}
              onChangeText={(value) => handleOnchangeText(value, 'projectId')}/>
            <TextInput style={styles.right}
              onChangeText={(value) => handleOnchangeText(value, 'projectName')}/>
            <TextInput style={styles.right}
              onChangeText={(value) => handleOnchangeText(value, 'customer')}/>
            <TextInput style={styles.right}
              onChangeText={(value) => handleOnchangeText(value, 'numberPO')}/>
            <Text style={styles.right} onChangeText={onDatePOChange}>
                <PickedDateFull onChangeText={onDatePOChange}/> 
            </Text>
          </View>
      </View>
      </View>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={submitForm}
          >
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'Poppins-Bold', fontSize: 16}}>Continue</Text>
        </TouchableOpacity>       
   </View>
  )
}

export default ProjectCreate;

const styles = StyleSheet.create({
  page:{
    marginTop: 20
    },
  header:{
    flexDirection: 'row',
  },
  left: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginTop: 2,
    marginBottom: 25,
    paddingVertical: 5,
    color: BiruKu,
  },
  right: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,
    marginBottom: 20,
    marginLeft: 5,
    height: 40,
    width: 250,
    padding: 7,
    color: BiruKu,
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