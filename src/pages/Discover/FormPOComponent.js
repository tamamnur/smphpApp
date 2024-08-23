import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView, } from 'react-native';
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {BiruKu} from '../../utils/constant';
import {errorTxt, left, right, unvailable, txtInput, dropdownSugesstion,sugesstion } from '../../utils/fontStyles';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import Title2 from '../../components/Title2';
import PickedDateM from '../../components/pickedDateM';
import StagesPODetail from '../../components/StagesPODetail';
import LoadingComponentS from '../../components/LoadingComponentS';
import PanelWrapperOnForm from '../../components/PanelWrapperOnForm';
import PanelItemOnForm from '../../components/PanelItemOnForm';
import Button from '../../components/Button6';
import StagesPO from '../../components/StagesPO';

const updateError = (error, stateUpdate) => {stateUpdate(error);
  setTimeout(() => {stateUpdate('')}, 3000);
};

const FormPOComponent = (props) => {
  const navigation = useNavigation();
  const [date, setDate] = useState();
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [ProjectList, setProjectList] = useState([]);
  const [visiblePanels, setIsVisiblePanels] = useState([])
  const onDateChange = value => {setDate(value)};
  
  const isMountedRef = useRef(true);
  useEffect(() => {isMountedRef.current = true;
    return () => {isMountedRef.current = false}
  }, []);
  
  const [componentInfo, setComponentInfo] = useState({
    projectId: '', FSProjectId: '', projectName: '', customer: '',
    stages: '',stagesPODetails: '',  
    projectsList: [], Panels: [], 
  });
  const {projectId, projectName, stagesPODetails, customer} = componentInfo;
  const handleOnchangeText = async (value, fieldName, docName) => {
    setComponentInfo({...componentInfo, [fieldName]: value});
    if (fieldName === 'stagesPODetails') {
      const docName = componentInfo.stages;
      console.log(docName)
      const selectedStage = value;
      componentInfo.Panels.forEach(async item => {
        if (item.MonitoringID) {
          const MonitoringID = item.MonitoringID.substring(1);
          const _Data = await firestore().collection(MonitoringID+'/Procurement').doc(docName).get();
          const isExist = _Data.exists && _Data.data() && _Data.data().hasOwnProperty(selectedStage);
          setComponentInfo(prev => ({
            ...prev,Panels: prev.Panels.map(panel => {
              if (panel.pnameInput === item.pnameInput) {
                return {...panel, stageExist: isExist};
              }
              return panel;
            }),
          }));
          console.log('cek--?',item.pnameInput, isExist);
        } else {
          setComponentInfo(prev => ({
            ...prev,Panels: prev.Panels.map(panel => {
              if (panel.pnameInput === item.pnameInput) {
                return {...panel, stageExist: false};
              }
              return panel;
            }),
          }));
        }
        if (isMountedRef.current) {setIsSaving(false)}
      });
    }
  };

  const handleComponent = async () => {
    setIsSaving(true)
    let panelSelected = false;
    const batch = firestore().batch();
    const operations = [];
    const visiblePanelsIds = visiblePanels.map(panel => panel.id)
    const panelsToUpdate = componentInfo.Panels.filter(panel => visiblePanelsIds.includes(panel.id))
    for (const value of panelsToUpdate) {
      let MonitoringID = value.MonitoringID ? value.MonitoringID.split('/').pop() : null;
      const projectRef = firestore().collection('Project').doc(componentInfo.FSProjectId);
      const Comp = firestore().collection('Monitoring').doc(MonitoringID).collection('Procurement').doc('Component');
      const validPanels = await firestore().collection('Monitoring/'+MonitoringID+'/Procurement').doc('Component').get()
      const isValid = validPanels.exists;
      const invalidMsg = () => {
        return updateError(value.pnameInput+' is not valid. \n Ensure the selected panel has an Order Date', setError)
      }
      if (value.selected === true) {
        if (componentInfo.stagesPODetails === 'Order') {
          if (value.MonitoringID) {
            MonitoringID = value.MonitoringID.split('/')[2];
          } else {
            const newMonitoring = await firestore().collection('Monitoring').add({
                ProjectID: '/Project/' + componentInfo.FSProjectId,
              });
            MonitoringID = newMonitoring.id;
          }
          const orderDate = {Order: firestore.Timestamp.fromDate(date)}
          operations.push(
            batch.set(Comp, orderDate),
            batch.update(projectRef, {
              status: 'Procurement Component - Ordered',
              updatedAt: firestore.Timestamp.fromDate(date),
            })
          )
        } else if (componentInfo.stagesPODetails === 'Schedule') {
          if(!MonitoringID) {setIsSaving(false), invalidMsg(); return}
          if(!isValid) {setIsSaving(false), invalidMsg(); return}
          const scheduleDate = {Schedule: firestore.Timestamp.fromDate(date)}
          operations.push(
            batch.update(Comp, scheduleDate),
            batch.update(projectRef, {
              status: 'Procurement Component - Scheduled',
              updatedAt: firestore.Timestamp.fromDate(date),
            })
          )
        } else if (componentInfo.stagesPODetails === 'Realized') {
          if(!MonitoringID) {setIsSaving(false), invalidMsg(); return}
          if(!isValid) {setIsSaving(false), invalidMsg(); return}
          const realizedDate = {Realized: firestore.Timestamp.fromDate(date)}
          operations.push(
            batch.update(Comp, realizedDate),
            batch.update(projectRef, {
              status: 'Procurement Component - Ready',
              updatedAt: firestore.Timestamp.fromDate(date),
            })
          )
        }
        const panelRef = firestore().collection('Project').doc(componentInfo.FSProjectId).collection('PanelName').doc(value.id);
        const panelData = {pnameInput: value.pnameInput, MonitoringID: '/Monitoring/'+MonitoringID};
        operations.push(batch.set(panelRef, panelData))
        panelSelected = true;
      }
    } 
    if (panelSelected && operations.length > 0) {
      try {
        await Promise.all(operations); await batch.commit(); setIsSaving(false);
        ToastAndroid.show('Procurement component updated.', ToastAndroid.SHORT);
        if(stagesPODetails === 'Order') {navigation.replace('ComponentOrder')}
        if(stagesPODetails === 'Schedule') {navigation.replace('ComponentSchedule')}
        if(stagesPODetails === 'Realized') {navigation.replace('ComponentRealized')}
      } catch (error) {
        setIsSaving(false); console.error('Error',error)
      }
    } else {
      updateError('Ensure you have chosen the right panel.', setError);
      setIsSaving(false)
    }
  };

  const isValidForm = () => {
    if (!projectName.trim() || projectName.length === 0)
      return updateError('Invalid name of project', setError);
    if (!stagesPODetails.trim() || stagesPODetails.length === 0)
      return updateError('Required to choice Stages of Procurement Component', setError);
    if (!date)
      return updateError('Required to choice Date of Proccess!', setError);
    return true;
  };
  const submitForm = () => {
    if (isValidForm()) {handleComponent()} 
    else {error}
  };

  const isProjectNameSuggestionShow = useMemo(() => {
    return projectName.length > 0;
  }, [projectName.length]);

  useEffect(() => {
    const InitiationFirebase = async () => {
      const FBProject = await firestore().collection('Project').get();
      const projectRef = FBProject.docs.map(async doc => {
        const panelName = await doc.ref.collection('PanelName').get();
        const Panels = panelName.docs.map(panelDoc => {
          return { id: panelDoc.id, ...panelDoc.data(), selected: false}
        });
        return {id: doc.id, ...doc.data(), Panels: Panels};
      });
      const projectList = await Promise.all(projectRef);
      if (isMountedRef.current) {
        setProjectList(projectList); setIsSaving(false)
      }
    };
    InitiationFirebase();
  }, []);

  useEffect(() => {
    if (ProjectList.length) {
      const MatchProject = ProjectList.find(value => {
        return value.projectName === projectName;
      });
      if (MatchProject) {
        setComponentInfo(prev => ({ ...prev,
          projectId: MatchProject.projectId,
          FSProjectId: MatchProject.id,
          customer: MatchProject.customer,
          Panels: MatchProject.Panels,
        }));
      } else {
        setComponentInfo(prev => ({ ...prev, projectId: '', Panels: [], customer: ''}));
      }
    }
  }, [ProjectList, projectName]);

  const AllPanelsExistMessage = () => {
    if (componentInfo.Panels.every(item => item.stageExist)) {
      return (
        <Text style={unvailable}>Panel data not available.</Text>
      );
    }
    return null;
  };

  useEffect(()=> {
    const filteredPanels = componentInfo.Panels.filter(item =>  !item.stageExist);
    setIsVisiblePanels(filteredPanels)
  }, [componentInfo.Panels])

  const toggleSelectAll = () => {
    const updatedPanels = componentInfo.Panels.map((panel) => {
      if(visiblePanels.some(visiblePanels => visiblePanels.id === panel.id)) {
        return { ...panel, selected: !selectAll}
      }
      return panel;
    });
    setComponentInfo((prev) => ({...prev, Panels: updatedPanels}))
    setSelectAll(!selectAll);
  }
  
  const togglePanel = (panelId) => {
    const updatedPanels = componentInfo.Panels.map(panel => {
      if (panel.id === panelId) {
        return {...panel, selected: !panel.selected}
      }
      return panel
    })
    setComponentInfo(prev => ({...prev, Panels: updatedPanels}))
    setSelectAll(updatedPanels.every(panel => panel.selected))
  }

  return (
    <ScrollView style={{marginVertical: 20}}>
      <Header/><Title2 TxtTitle={'COMPONENT'} SubTitle={'PROCUREMENT'}/>
      {error ? (<Text style={errorTxt}>{error} </Text> ) : null}
      <View style={{flexDirection: 'row', marginHorizontal: 10, width: '100%'}}>
        <View style={{width: '25%'}}>
          <Text style={left}>Project Name </Text>
          <Text style={left}>Customer </Text>
          <Text style={left}>Number SO </Text>
          <Text style={left}>Stages </Text>
          <Text style={left}>Date </Text>
        </View>
        <View style={{width: '70%'}}>
          <TextInput style={right}
            onChangeText={value => handleOnchangeText(value, 'projectName')}
            value={projectName}
          />
          {isProjectNameSuggestionShow ? (
            <View style={dropdownSugesstion}>
              {ProjectList.filter(item => {
                const searchTerm = projectName.toLowerCase();
                const fullname = item.projectName.toLowerCase();
                return (
                  searchTerm && fullname.includes(searchTerm) && fullname !== searchTerm
                );
              }).map(item => (
                <TouchableOpacity key={item.id} onPress={() => {
                    handleOnchangeText(item.projectName, 'projectName');
                  }}>
                  <Text style={sugesstion}>{item.projectName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
          <Text style={right}>{customer}</Text>
          <Text style={right}>{projectId}</Text>
          <View style={{width: '98%'}}>
            <StagesPO onValueChange={(value) => {handleOnchangeText(value, 'stages')}}/>
          </View>
          <View style={{width: '98%'}}>
            <StagesPODetail onValueChange={(value) => {handleOnchangeText(value, 'stagesPODetails')}}/>
          </View>
          <Text style={txtInput} onChangeText={onDateChange}>
            <PickedDateM onChangeText={onDateChange}/>
          </Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 5}}>
        <PanelWrapperOnForm selectAll={selectAll} onPress={toggleSelectAll}/>
          <ScrollView style={{marginTop: 5}}>
          {componentInfo.Panels.filter(item => !item.stageExist).map((item) => (
              <PanelItemOnForm 
                key={item.id} panelId={item.id} 
                panelName={item.pnameInput}
                selected={item.selected} 
                selectAll={selectAll}
                onToggle={togglePanel}
              />
            ),
          )}
          <AllPanelsExistMessage />
        </ScrollView>
      </ScrollView>
      {isSaving ? (<LoadingComponentS/>):(
        <Button bgColor={BiruKu} fontColor={'white'} text={'Submit'} 
          onPress={submitForm}/>
      )}
    </ScrollView>
  );
};

export default FormPOComponent;