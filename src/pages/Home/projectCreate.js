import { View, Text, StyleSheet, TextInput, ToastAndroid, Alert, Dimensions, } from 'react-native';
import React, {useState} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PickedDateFull from '../../components/pickedDateFull';
import Title2 from '../../components/Title2';
import Button6 from '../../components/Button6';

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
          navigation.navigate('PanelNameInput', {projectId: response.id})
        })
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        Alert.alert(
          'Konfirmasi Data Proyek',
          'Apakah data Proyek yang dimasukan sudah benar?',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Continue', style: 'destructive', onPress: async () => {
                try {
                  handleCreateProject();
                  ToastAndroid.show(
                    'Project Created, Continue to adding Panel Names',
                    ToastAndroid.SHORT,
                    );
                } catch (error) {
                  Alert.alert(
                    'Error',
                    'Terjadi kesalahan saat menghapus Project.',
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
    <View style={{marginTop: 30}}>
      <View style={{flexDirection: 'row'}}>
        <IconBack
          onPress={() => navigation.goBack()}
          style={{marginTop: 10, marginLeft: 30}}
        />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <Title2 TxtTitle="N E W     P R O J E C T" />
      {error ? (
        <Text
          style={{color: 'red',fontSize: 13,textAlign: 'center',paddingBottom: 20,}}>
          {error}
        </Text>
      ) : null}
      <View>
        <View style={{flexDirection: 'row', marginHorizontal: 10, alignSelf:'center'}}>
          <View>
            <Text style={styles.left}> SO Number</Text>
            <Text style={styles.left}> Project Name</Text>
            <Text style={styles.left}> Customer</Text>
            <Text style={styles.left}> PO Number</Text>
            <Text style={styles.left}> PO Date</Text>
          </View>
          <View>
            <TextInput
              style={styles.right}
              onChangeText={value => handleOnchangeText(value, 'projectId')}
            />
            <TextInput
              style={styles.right}
              onChangeText={value => handleOnchangeText(value, 'projectName')}
            />
            <TextInput
              style={styles.right}
              onChangeText={value => handleOnchangeText(value, 'customer')}
            />
            <TextInput
              style={styles.right}
              onChangeText={value => handleOnchangeText(value, 'numberPO')}
            />
            <Text style={styles.right} onChangeText={onDatePOChange}>
              <PickedDateFull onChangeText={onDatePOChange} />
            </Text>
          </View>
        </View>
      </View>
      <Button6 text="CONTINUE" bgColor={BiruKu} fontColor={'white'} onPress={submitForm} />
    </View>
  );
};

export default ProjectCreate;

const styles = StyleSheet.create({
  left: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlignVertical: 'center',
    marginBottom: 15,
    color: BiruKu,
    height: 40,
  },
  right: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlignVertical: 'center',
    padding: 7,
    marginBottom: 15,
    marginLeft: 5,
    height: 40,
    width: width*0.65,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,
  },
  
});