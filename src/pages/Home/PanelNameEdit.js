import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {IconAdd, IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import InputDataProject from '../../components/InputDataProject';
import {useNavigation} from '@react-navigation/native';
import Title from '../../components/Title';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Project from '../Discover/project';
import PickedDateFull from '../../components/pickedDateFull';

const isValidObjField = obj => {
  return Object.values(obj).every(value => value.trim());
};

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate('');
  }, 3000);
};

const PanelNameEdit = props => {
  const navigation = useNavigation();
  const text = useState('Choose date!');
  const [datePO, setDatePO] = useState();

  const onDatePOChange = value => {
    setDatePO(value);
  };
  const [projectInfo, setProjectInfo] = useState({
    projectId: '',
    projectName: '',
    customer: '',
    numberPO: '',
  });

  const [error, setError] = useState('');
  const {projectId, projectName, customer, numberPO} = projectInfo;
  const handleOnchangeText = (value, fieldName) => {
    setProjectInfo({...projectInfo, [fieldName]: value});
  };

  const isValidForm = () => {
    if (!isValidObjField(projectInfo))
      return updateError('Required all fields!', setError);
    if (!projectName.trim() || projectName.length < 3)
      return updateError('Invalid name of project', setError);
    if (!customer.trim() || customer.length < 3)
      return updateError('Invalid customer name', setError);
    if (!numberPO.trim() || numberPO.length < 2)
      return updateError('Invalid number PO', setError);
    return true;
  };
  const submitForm = () => {
    {
      isValidForm() ? handleCreateProject() : error;
    }
  };

  const handleCreateProject = async () => {
    console.log(projectId);
    console.log(projectName);
    console.log(customer);
    console.log(numberPO);
    console.log(datePO);

    const projectCollection = await firestore()
      .collection('Project')
      .add({
        projectId: projectId,
        projectName: projectName,
        customer: customer,
        numberPO: numberPO,
        datePO: firestore.Timestamp.fromDate(datePO),
      })
      .then(response => {
        console.log('Project Created');

        navigation.navigate('PanelNameInput', {
          ProjectId: response.id,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.page}>
      <Title TxtTitle="EDIT PROJECT DETAILS" />
      {error ? (
        <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
          {error}
        </Text>
      ) : null}
      <InputDataProject
        label="ProjectID"
        onChangeText={value => handleOnchangeText(value, 'projectId')}
      />
      <InputDataProject
        label="Project Name"
        onChangeText={value => handleOnchangeText(value, 'projectName')}
      />
      <InputDataProject
        label="Customer"
        onChangeText={value => handleOnchangeText(value, 'customer')}
      />
      <InputDataProject
        label="PO Number"
        onChangeText={value => handleOnchangeText(value, 'numberPO')}
      />
      <View style={styles.container}>
        <Text style={styles.label}>PO Date</Text>
        <Text style={styles.txtInput} onChangeText={onDatePOChange}>
          <PickedDateFull onChangeText={onDatePOChange} />
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        // onPress={submitForm}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#FFF',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
          }}>
          Save Changes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('ProjectDetails')}>
        <Text
          style={{
            textAlign: 'center',
            color: '#023',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
          }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PanelNameEdit;

const styles = StyleSheet.create({
  page: {
    marginTop: 70,
  },
  header: {
    flexDirection: 'row',
  },
  btn: {
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
    textAlign: 'center',
  },
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'right',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,
    height: 35,
    padding: 10,
    marginVertical: 8,
    width: 240,
    marginHorizontal: 10,
    width: 250,
  },
});
