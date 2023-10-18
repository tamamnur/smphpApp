import {View, ToastAndroid, Alert, Text, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BiruKu, Darkred} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Button6 from '../../components/Button6';
import FormatDate from '../../components/FormatDate';
import Title2 from '../../components/Title2';
import InfoProjectEdit from '../../components/InfoProjectEdit';
import LoadingComponent from '../../components/LoadingComponent';
import PickedDateEdit from '../../components/pickedDateEdit';
import Header from '../../components/Header';

const ProjectDetailsEdit = props => {
  const id = props.route.params.id;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projectInfo, setProjectInfo] = useState({
    ProjectName: '',
    ProjectId: '',
    Customer: '',
    NumberPO: '',
    DatePO: new Date(),
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Project')
      .doc(id)
      .onSnapshot(
        doc => {
          const data = doc.data();
          if (data) {
            const datePO = data.datePO?.toDate() || new Date();
            setProjectInfo({
              ProjectName: data.projectName || '',
              ProjectId: data.projectId || '',
              Customer: data.customer || '',
              NumberPO: data.numberPO || '',
              DatePO: datePO,
            }),
              setSelectedDate(datePO);
          } else {
            setProjectInfo(prevProjectInfo => ({
              ...prevProjectInfo,
              DatePO: new Date(),
            }));
            setSelectedDate(new Date());
          }
          setIsLoading(false);
        },
        error => {
          ToastAndroid.show('Error', error.message, ToastAndroid.SHORT);
          setIsLoading(false);
        },
      );
    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleDeleteProject = async () => {
    Alert.alert(
      'Delete Comfirmation',
      `Are you sure you want to delete the\n${projectInfo.ProjectName} project?`,
      [{text: 'Cancel', style: 'cancel'},
        { text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('Project').doc(id).delete();
              navigation.replace('SecuredNav');
            } catch (error) {
              Alert.alert(
                'Error','An error occurred while deleting the project',
            )}
          },
        }],
    );
  };
  const handleSaveChanges = async () => {
    try {
      const newDatePO = new Date(projectInfo.DatePO);
      const datePOChanged = newDatePO.toString() !== selectedDate.toString();
      if (
        !projectInfo.ProjectId.trim()||
        !projectInfo.ProjectName.trim()||
        !projectInfo.Customer.trim()||
        !projectInfo.NumberPO.trim()
      ) {
        setError('Please fill in all required fields.')
        setTimeout(()=> { setError(null);
        },3000)
        return
      }
      const updateData = {
        projectName: projectInfo.ProjectName,
        projectId: projectInfo.ProjectId,
        customer: projectInfo.Customer,
        numberPO: projectInfo.NumberPO,
      };

      if (datePOChanged) {updateData.datePO = newDatePO}
      await firestore().collection('Project').doc(id).update(updateData);
      navigation.goBack();
      ToastAndroid.show(
        `Details project  ${projectInfo.ProjectName}$ updated`,
      ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving changes.');
    }
  };
  return (
    <View style={{flex: 1, marginBottom: 0}}>
      <Header />
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <ScrollView>
          <Title2 TxtTitle={'EDIT PROJECT DETAILS'} />
          <InfoProjectEdit
            label={'Number SO'}
            value={projectInfo.ProjectId}
            onChangeText={text =>
              setProjectInfo({...projectInfo, ProjectId: text})
            }
          />
          <InfoProjectEdit
            label={'Project Name'}
            value={projectInfo.ProjectName}
            onChangeText={text =>
              setProjectInfo({...projectInfo, ProjectName: text})
            }
          />
          <InfoProjectEdit
            label={'Customer'}
            value={projectInfo.Customer}
            onChangeText={text =>
              setProjectInfo({...projectInfo, Customer: text})
            }
          />
          <InfoProjectEdit
            label={'Number PO'}
            value={projectInfo.NumberPO}
            onChangeText={text =>
              setProjectInfo({...projectInfo, NumberPO: text})
            }
          />
          <PickedDateEdit
            value={FormatDate(selectedDate)} // value={selectedDate.toDateString()}
            onChangeText={selected =>
              setProjectInfo({...projectInfo, DatePO: selected})
            }
          />
          <View style={{marginTop: 30}}>
            {error ? (
              <Text style={{color: 'red',fontSize: 15,textAlign: 'center', marginBottom:-15}}>
                {error}</Text> ) : null}

            <Button6
              text="Save Changes" bgColor={BiruKu}
              fontColor={'white'} onPress={handleSaveChanges}
              />
            <Button6
              text="Delete Project" bgColor={Darkred}
              fontColor={'white'} onPress={handleDeleteProject}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProjectDetailsEdit;