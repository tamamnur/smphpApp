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
import LoadingComponentS from '../../components/LoadingComponentS';

const ProjectDetailsEdit = props => {
  const id = props.route.params.id;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false)
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
        if (data) {
          // const datePO = data && data.datePO ? data.datePO.toDate() : null;
          const datePO = doc.data() && doc.data().datePO ? doc.data().datePO.toDate() : null;
          setProjectInfo({
            ProjectName: data?.projectName || '',
            ProjectId: data?.projectId || '',
            Customer: data?.customer || '',
            NumberPO: data?.numberPO || '',
            DatePO: datePO,
          }),
          setSelectedDate(datePO);
        } else {
          setProjectInfo(prevProjectInfo => ({
            ...prevProjectInfo,
            DatePO: 'Select Date',
          }));
          setSelectedDate(null);
        }
        setIsLoading(false);
      },
      error => {
        ToastAndroid.show('Error', error.message, ToastAndroid.SHORT);
        console.error('', error.message)
        setIsLoading(false);
      },
    );
  return () => {
    unsubscribe();
  };
  }, [id]);

  const handleDeleteProject = async () => { 
    Alert.alert('Delete Confirmation',
      `Are you sure you want to delete the\n${projectInfo.ProjectName} project?`,
      [{text: 'Cancel', style: 'cancel'},
       {text: 'Delete', style: 'destructive',
        onPress: async () => {
          try {
            setIsSaving(true)
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
            setIsSaving(false)
            navigation.replace('SecuredNav');
          } catch (error) {
            console.error('erorr?', error)
            Alert.alert('Error','An error occurred while deleting the project', error)
            setIsSaving(false)
            navigation.replace('SecuredNav')
        }
      },
    }],
  )}
  
  const handleSaveChanges = async () => {
    try {
      const newDatePO = new Date(projectInfo.DatePO);
      let datePOChanged = true;
      if(selectedDate && projectInfo.DatePO) {
        datePOChanged = newDatePO.toString() !== selectedDate.toString();
      } else if (!selectedDate && !projectInfo.DatePO) {
        datePOChanged = false
      }
      if (
        !projectInfo.ProjectId.trim()||!projectInfo.ProjectName.trim()||
        !projectInfo.Customer.trim() // || !projectInfo.NumberPO.trim()
      ) {
        setError('Please fill in all required fields.')
        setTimeout(()=> { setError(null)},3000)
        return
      }
      const updateData = {
        projectName: projectInfo.ProjectName,
        projectId: projectInfo.ProjectId,
        customer: projectInfo.Customer,
        numberPO: projectInfo.NumberPO,
      };
      if (datePOChanged) {updateData.datePO = newDatePO}
      setIsSaving(true)
      await firestore().collection('Project').doc(id).update(updateData);
      navigation.goBack();
      ToastAndroid.show(`Details project  ${projectInfo.ProjectName} updated`,ToastAndroid.SHORT);
    } catch (error) {
      console.error('erorr?', error)
      Alert.alert('Error', 'An error occurred while saving changes.');
      setIsSaving(false)
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      {isLoading ? (<LoadingComponent />) : (
        <ScrollView>
          <Title2 TxtTitle={'EDIT PROJECT DETAILS'} />
          <InfoProjectEdit label={'Number SO'} value={projectInfo.ProjectId}
            onChangeText={text => setProjectInfo({...projectInfo, ProjectId: text})}
          />
          <InfoProjectEdit label={'Project Name'} value={projectInfo.ProjectName}
            onChangeText={text => setProjectInfo({...projectInfo, ProjectName: text})}
          />
          <InfoProjectEdit label={'Customer'} value={projectInfo.Customer}
            onChangeText={text => setProjectInfo({...projectInfo, Customer: text})}
          />
          <InfoProjectEdit label={'Number PO'} value={projectInfo.NumberPO || ''}
            onChangeText={text => { setProjectInfo({...projectInfo, NumberPO: text});
              if(text && text.trim() !=='') {setShowDatePO(true)}
              else {setShowDatePO(false)};
            }}
          />
          {showDatePO && (<PickedDateEdit value={projectInfo.DatePO || 'Select Date'}
            onChangeText={selected => {
              const newDate = selected === 'Select Date' ? null : selected;
              setProjectInfo({...projectInfo, DatePO: newDate})
            }}/>
          )}
          <View style={{marginTop: 30}}>
            {error ? (<ErrorMessage txt={error}/>) : null}
            {isSaving ? (<LoadingComponentS/>) : (<>
            <Button6 text="Save Changes" bgColor={BiruKu}
              fontColor={'white'} onPress={handleSaveChanges}/>
            <Button6 text="Delete Project" bgColor={Darkred}
              fontColor={'white'} onPress={handleDeleteProject}/>
            </>)}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProjectDetailsEdit;