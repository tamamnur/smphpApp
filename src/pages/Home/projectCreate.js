import {ToastAndroid, Alert, ScrollView, } from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import Button6 from '../../components/Button6';
import InfoProjectInput from '../../components/InfoProjectInput';
import InfoDateProject from '../../components/InfoDateProject';
import Header from '../../components/Header';
import ErrorMessage from '../../components/errorMessage'
import SmallLoading from '../../components/LoadingComponentS';

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {stateUpdate('')}, 3000);
};

const ProjectCreate = props => {
  const navigation = useNavigation();
  const [datePO, setDatePO] = useState(null);
  const [showDatePO, setShowDatePO] = useState(false);
  const [isSaving, setIsSaving] = useState(false)
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
    if(fieldName === 'numberPO' && value.trim() !== '') {
      setShowDatePO(true)
    } else {
      setShowDatePO(false)
    }
  };

  const isValidForm = () => {
    if(!projectId.trim() || projectId.length < 2)
      return updateError('Invalid SO number', setError)
    if (!projectName.trim() || projectName.length < 3)
      return updateError('Invalid name of project', setError);
    if (!customer.trim() || customer.length < 3)
      return updateError('Invalid customer name', setError);
    return true;
  };

  const handleCreateProject = async () => {
    const createdAt = new Date();
    try {
      setIsSaving(true)
      const response = await firestore().collection('Project')
      .add({
          projectId: projectInfo.projectId,
          projectName: projectInfo.projectName,
          customer: projectInfo.customer,
          updatedAt: firestore.Timestamp.fromDate(createdAt),
          status: 'Created At',
          numberPO: projectInfo.numberPO,
          datePO: datePO ? firestore.Timestamp.fromDate(datePO) : null
        })
        .then((response) =>{
          ToastAndroid.show('Project Created, Continue to adding Panel Name Forms', ToastAndroid.SHORT)
          setIsSaving(false)
          navigation.replace('PanelNameInput', {projectId: response.id})
        })
    } catch (error) {
      Alert.alert(error)
    }
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        Alert.alert(
          'Project Data Confirmation', 'Is the entered Project data correct?',
          [{text: 'Cancel', style: 'cancel'},
           {text: 'Next', style: 'destructive', onPress: async () => {
            try {
              handleCreateProject();
              ToastAndroid.show('Project Created, Continue to adding Panel Names',
              ToastAndroid.SHORT)
            } catch (error) {Alert.alert('Error', 'An error occurred while adding the project.')}},
          }]
        );
      } catch (error) {
        Alert.alert('Error creating project.', error)
      }
    }
  };
  return (
    <ScrollView style={{marginVertical: 20}}>
      <Header/><Title2 TxtTitle="N E W     P R O J E C T" />
      <ScrollView style={{marginHorizontal: 8}}>
        <InfoProjectInput label={'SO Number'} value={projectId}
          onChangeText={value => handleOnchangeText(value, 'projectId')}/>
        <InfoProjectInput label={'Project Name'} value={projectName}
          onChangeText={value => handleOnchangeText(value, 'projectName')}/>
        <InfoProjectInput label={'Customer'} value={customer}
          onChangeText={value => handleOnchangeText(value, 'customer')}/>
        <InfoProjectInput label={'PO Number'} value={numberPO}
          onChangeText={value => handleOnchangeText(value, 'numberPO')}/>
        {showDatePO && (
          <InfoDateProject label={'Date PO'} onDateChange={onDatePOChange}/>
        )}
      </ScrollView>
      {error ? (<ErrorMessage txt={error} marginBottom={120}/>) : null }
      {isSaving ? <SmallLoading/> : (
       <Button6 text="CONTINUE" bgColor={BiruKu} 
       fontColor={'white'} onPress={submitForm}/>)}
    </ScrollView>
  );
};
export default ProjectCreate;