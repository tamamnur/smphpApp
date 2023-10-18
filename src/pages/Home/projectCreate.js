import {Text, ToastAndroid, Alert, Dimensions, ScrollView, } from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import Button6 from '../../components/Button6';
import InfoProjectInput from '../../components/InfoProjectInput';
import InfoDateProject from '../../components/InfoDateProject';
import Header from '../../components/Header';

const {width} = Dimensions.get('window')

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {stateUpdate('')}, 3000);
};

const ProjectCreate = props => {
  const navigation = useNavigation();
  const [datePO, setDatePO] = useState(null);
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
    if (!projectName.trim() || projectName.length < 3)
      return updateError('Invalid name of project', setError);
    if (!customer.trim() || customer.length < 3)
      return updateError('Invalid customer name', setError);
    if (!datePO) return updateError('Invalid date PO', setError);
    return true;
  };

  const handleCreateProject = async () => {
    console.log(projectId, projectName, customer, numberPO, datePO);
    const createdAt = new Date();
    try {
      const response = await firestore()
        .collection('Project')
        .add({
          projectId: projectInfo.projectId,
          projectName: projectInfo.projectName,
          customer: projectInfo.customer,
          numberPO: projectInfo.numberPO,
          datePO: firestore.Timestamp.fromDate(datePO),
          updatedAt: firestore.Timestamp.fromDate(createdAt),
          status: 'Created At',
        })
        .then((response) =>{
          ToastAndroid.show('Project Created, Continue to adding Panel Name Forms', ToastAndroid.SHORT)
            navigation.replace('PanelNameInput', {projectId: response.id})
        })
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        Alert.alert(
          'Project Data Confirmation',
          'Is the entered Project data correct?',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Next', style: 'destructive', onPress: async () => {
                try {
                  handleCreateProject();
                  ToastAndroid.show(
                    'Project Created, Continue to adding Panel Names',
                    ToastAndroid.SHORT,
                    );
                } catch (error) {
                  Alert.alert(
                    'Error',
                    'An error occurred while adding the project.',
                  );
                }
              },
            },
          ],
        );
      } catch (error) {
        console.error('Error creating project', error);
      }
    }
  };

  return (
    <ScrollView style={{marginVertical: 20}}>
      <Header />
      <Title2 TxtTitle="N E W     P R O J E C T" />
      {error ? (
        <Text
          style={{color: 'red',fontSize: 13, marginBottom: -15,}}>
          {error}
        </Text>
      ) : null}
      <ScrollView style={{marginHorizontal: 8}}>
        <InfoProjectInput 
          label={'SO Number'} 
          onChangeText={value => handleOnchangeText(value, 'projectId')}
          value={projectId}
          />
        <InfoProjectInput 
          label={'Project Name'} 
          onChangeText={value => handleOnchangeText(value, 'projectName')}
          value={projectName}
          />
        <InfoProjectInput 
          label={'Customer'} 
          onChangeText={value => handleOnchangeText(value, 'customer')}
          value={customer}
          />
        <InfoProjectInput 
          label={'PO Number'} 
          onChangeText={value => handleOnchangeText(value, 'numberPO')}
          value={numberPO}
          />
        <InfoDateProject 
            label={'Date PO'}
            onDateChange={onDatePOChange}
          />
      </ScrollView>
      <Button6 text="CONTINUE" bgColor={BiruKu} fontColor={'white'} onPress={submitForm} />
    </ScrollView>
  );
};

export default ProjectCreate;