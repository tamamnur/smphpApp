import {View, ToastAndroid, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BiruKu, Darkred} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Button6 from '../../components/Button6';
import Title2 from '../../components/Title2';
import InfoProjectEdit from '../../components/InfoProjectEdit';
import LoadingComponent from '../../components/LoadingComponent';
import PickedDateEdit from '../../components/pickedDateEdit';
import Header from '../../components/Header';
import ErrorMessage from '../../components/errorMessage';
import FormatDateFull from '../../components/FormatDateFull';

const ProjectDetailsEdit = props => {
  const id = props.route.params.id;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [showDatePO, setShowDatePO] = useState(false);
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
    const unsubscribe = firestore().collection('Project').doc(id)
      .onSnapshot((doc) => {
        const data = doc.data();
        console.log('Data from firestore', data)
        if (data) {
          // const datePO = data?.datePO?.toDate() || new Date();
          const datePO = data?.datePO?.toDate() || 'Select Date';
          setProjectInfo({
            ProjectName: data?.projectName || '',
            ProjectId: data?.projectId || '',
            Customer: data?.customer || '',
            NumberPO: data?.numberPO || '',
            DatePO: datePO,
          }),
          setSelectedDate(datePO);
          // console.log('get Data ?',data)
        } else {
          setProjectInfo(prevProjectInfo => ({
            ...prevProjectInfo,
            // DatePO: new Date(),
            DatePO: 'Select Date',
          }));
          // setSelectedDate(new Date());
          setSelectedDate('Select Date');
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
//  console.log('id ?',id)

  const handleDeleteProject = async () => { Alert.alert(
      'Delete Comfirmation',
      `Are you sure you want to delete the\n${projectInfo.ProjectName} project?`,
      [{text: 'Cancel', style: 'cancel'},
       {text: 'Delete', style: 'destructive',
        onPress: async () => {
          try {
            const projectPanelCollectionRef = firestore().collection('Project')
              .doc(id).collection('PanelName');
            const panelSnapshot = await projectPanelCollectionRef.get()
            for (const panelDoc of panelSnapshot.docs) {
              const panelData = panelDoc.data()
              const monitoringId = panelData.MonitoringID
              if (monitoringId) {
                const idSubs12 = monitoringId.substring(12)
                await firestore().collection('Monitoring').doc(idSubs12).delete()
              }
              await panelDoc.ref.delete()
            }
            await firestore().collection('Project').doc(id).delete();
            ToastAndroid.show('The '+projectInfo.ProjectName+ 'and related documents have been deleted.', ToastAndroid.SHORT)
            console.log('The Project and related documents have been deleted.')
            navigation.replace('SecuredNav');
          } catch (error) {
            console.log(error)
            Alert.alert('Error','An error occurred while deleting the project')
            navigation.replace('SecuredNav')
        }
      },
    }],
  )}
  
  const handleSaveChanges = async () => {
    try {
      const newDatePO = new Date(projectInfo.DatePO);
      const datePOChanged = newDatePO.toString() !== selectedDate.toString();
      if (
        !projectInfo.ProjectId.trim()||
        !projectInfo.ProjectName.trim()||
        !projectInfo.Customer.trim()
        // || !projectInfo.NumberPO.trim()
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
      ToastAndroid.show(`Details project  ${projectInfo.ProjectName}$ updated`,ToastAndroid.SHORT);
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
            value={projectInfo.NumberPO || ''}
            onChangeText={text => {
              setProjectInfo({...projectInfo, NumberPO: text});
              // if(text && text.trim() !=='') {
              //   setShowDatePO(true)
              // } else {
              //   setShowDatePO(false)
              // };
            }}
          />

          {/* {showDatePO && ( */}
            <PickedDateEdit
            // value={projectInfo.DatePO instanceof Date ? FormatDateFull(selectedDate) : 'Select Date'} 
            value={projectInfo.DatePO || 'Select Date'}
            onChangeText={selected => {
              // const newDate = selected instanceof Date ? selected : 'Select Date';
              const newDate = selected === 'Select Date' ? null : selected;
              setProjectInfo({...projectInfo, DatePO: newDate})
            }}
            />
          {/* )} */}
          <View style={{marginTop: 30}}>
            {error ? (<ErrorMessage txt={error}/>) : null}
            <Button6 text="Save Changes" bgColor={BiruKu}
              fontColor={'white'} onPress={handleSaveChanges}/>
            <Button6 text="Delete Project" bgColor={Darkred}
              fontColor={'white'} onPress={handleDeleteProject}/>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProjectDetailsEdit;