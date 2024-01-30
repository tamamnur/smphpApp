import {View,Text,TextInput,TouchableOpacity,ToastAndroid,ScrollView} from 'react-native';
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import Title2 from '../../components/Title2';
import StagesPODetail from '../../components/StagesPODetail';
import PickedDateM from '../../components/pickedDateM';
import LoadingComponentS from '../../components/LoadingComponentS';
import Button6 from '../../components/Button6';
import PanelWrapperOnForm from '../../components/PanelWrapperOnForm';
import PanelItemOnForm from '../../components/PanelItemOnForm';
import {errorTxt, left, right, unvailable, txtInput, dropdownSugesstion,sugesstion } from '../../utils/fontStyles';

const updateError = (error, stateUpdate) => {
  stateUpdate(error); setTimeout(() => {stateUpdate('')},3000);
};

const FormPOBusbar = props => {
  const navigation = useNavigation();
  const [date, setDate] = useState();
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [ProjectList, setProjectList] = useState([]);
  const [visiblePanels, setVisiblePanels] = useState([]);
  const onDateChange = value => {setDate(value)};

  const isMountedRef = useRef(true);
  useEffect(() => {isMountedRef.current = true;
    return () => {isMountedRef.current = false};
  }, []);

  const [busbarInfo, setBusbarInfo] = useState({
    projectId: '', FSProjectId: '', projectName: '', stagesPODetails: '', customer: '',
    projectsList: [], Panels: [],
  });
  const {projectId, projectName, stagesPODetails, customer} = busbarInfo;
  const handleOnchangeText = async (value, fieldName) => {
    setBusbarInfo({...busbarInfo, [fieldName]: value});
    if (fieldName === 'stagesPODetails') {
      const selectedStage = value;
      busbarInfo.Panels.forEach(async item => {
        if (item.MonitoringID) {
          const MonitoringID = item.MonitoringID.substring(1);
          const _Data = await firestore().collection(MonitoringID + '/Procurement').doc('Busbar').get();
          const isExist = _Data.exists && _Data.data() && _Data.data().hasOwnProperty(selectedStage);
          setBusbarInfo(prev => ({
            ...prev, Panels: prev.Panels.map(panel => {
              if (panel.pnameInput === item.pnameInput) {
                return {...panel, stageExist: isExist};
              }
              return panel;
            }),
          }));
        } else {
          setBusbarInfo(prev => ({
            ...prev, Panels: prev.Panels.map(panel => {
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
  
  const handleBusbar = async () => {
    setIsSaving(true);
    let panelSelected = false;
    const batch = firestore().batch();
    const operations = [];
    const visiblePanelsIds = visiblePanels.map(panel => panel.id)
    const panelsToUpdate =  busbarInfo.Panels.filter(panel => visiblePanelsIds.includes(panel.id))
    for (const value of panelsToUpdate) {
      let MonitoringID = value.MonitoringID ? value.MonitoringID.split('/').pop() : null;
      const projectRef = firestore().collection('Project').doc(busbarInfo.FSProjectId);
      const POBusbar = firestore().collection('Monitoring').doc(MonitoringID).collection('Procurement').doc('Busbar');
      const validPanels = await firestore().collection('Monitoring/' + MonitoringID + '/Procurement').doc('Busbar').get();
      const isValid = validPanels.exists;
      const invalidMsg = () => {
        return updateError(value.pnameInput+' is not valid. \n Ensure the selected panel has an Order Date', setError)
      }
      if (value.selected === true) {
        if (busbarInfo.stagesPODetails === 'Order') {
          if (value.MonitoringID) {
            MonitoringID = value.MonitoringID.split('/')[2];
          } else {
            const newMonitoring = await firestore().collection('Monitoring').add({
                ProjectID: '/Project/' + busbarInfo.FSProjectId,
              });
              MonitoringID = newMonitoring.id;
          }
          const orderData = {Order: firestore.Timestamp.fromDate(date)};
          operations.push(
            batch.set(POBusbar, orderData),
            batch.update(projectRef, {
              status: 'Procurement Busbar Cu - Ordered',
              updatedAt: firestore.Timestamp.fromDate(date),
            }),
          );
        } else if (busbarInfo.stagesPODetails === 'Schedule') {
          if (!MonitoringID) {setIsSaving(false), invalidMsg(); return}
          if (!isValid) {setIsSaving(false), invalidMsg(); return}
          const scheduleData = {Schedule: firestore.Timestamp.fromDate(date)};
          operations.push(
            batch.update(POBusbar, scheduleData),
            batch.update(projectRef, {
              status: 'Procurement Busbar Cu - Scheduled',
              updatedAt: firestore.Timestamp.fromDate(date),
            }),
          );
        } else if (busbarInfo.stagesPODetails === 'Realized') {
          if (!MonitoringID) {setIsSaving(false), invalidMsg(); return}
          if (!isValid) {setIsSaving(false), invalidMsg(); return}          
          const realizedData = {Realized: firestore.Timestamp.fromDate(date)};
          operations.push(
            batch.update(POBusbar, realizedData),
            batch.update(projectRef, {
              status: 'Procurement Busbar Cu - Ready',
              updatedAt: firestore.Timestamp.fromDate(date),
            }),
            );
          }
          const panelRef = firestore().collection('Project').doc(busbarInfo.FSProjectId).collection('PanelName').doc(value.id);
          const panelData = {pnameInput: value.pnameInput, MonitoringID: '/Monitoring/' + MonitoringID};
          operations.push(batch.set(panelRef, panelData));
          panelSelected = true;
        }
      }
      if (panelSelected && operations.length > 0) {
        try {
          await Promise.all(operations);
          await batch.commit();
          setIsSaving(false);
          ToastAndroid.show('Procurement Busbar updated',ToastAndroid.SHORT);
          if (stagesPODetails === 'Order') {navigation.replace('BusbarOrder')}
          if (stagesPODetails === 'Schedule') {navigation.replace('BusbarSchedule')}
          if (stagesPODetails === 'Realized') {navigation.replace('BusbarRealized')}
        } catch (error) {
          setIsSaving(false); console.error('Error', error);
        }
    } else {updateError('Ensure you have chosen the right panel.', setError);setIsSaving(false)}
    };
    
    const isValidForm = () => {
      if (!projectName.trim() || projectName.length === 0)
        return updateError('Invalid name of project', setError);
      if (!stagesPODetails)
        return updateError('Required to choice Stages of Procurement Busbar Cu', setError);
      if (!date)
        return updateError('Required to choice Date of Proccess!', setError);
      return true;
    };
    const submitForm = () => {
    if (isValidForm()) {handleBusbar()} 
    else {error}
  };
  const isProjectNameSuggestionShow = useMemo(() => {
    return projectName.length > 0
  }, [projectName.length]);

  useEffect(() => {
    const InitiationFirebase = async () => {
      const FBProject = await firestore().collection('Project').get();
      const projectRef = FBProject.docs.map(async doc => {
        const panelName = await doc.ref.collection('PanelName').get();
        const Panels = panelName.docs.map(panelDoc => {
          return {
            id: panelDoc.id, ...panelDoc.data(), selected: false,
          };
        });
        return {
          id: doc.id, ...doc.data(), Panels: Panels
        };
      });
      const projectList = await Promise.all(projectRef);
      if (isMountedRef.current) {
        setProjectList(projectList);
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
        setBusbarInfo(prev => ({ ...prev, 
          projectId: MatchProject.projectId,
          FSProjectId: MatchProject.id,
          customer: MatchProject.customer,
          Panels: MatchProject.Panels,
        }));
      } else {
        setBusbarInfo(prev => ({
          ...prev, projectId: '', Panels: [],customer: '',
        }));
      }
    }
  }, [ProjectList, projectName]);

  const AllPanelsExistMessage = () => {
    if (busbarInfo.Panels.every(item => item.stageExist)) {
      return (
        <Text style={unvailable}>Panel data not available.</Text>
      );
    }
    return null;
  };
  useEffect(() => {
    const filteredPanels = busbarInfo.Panels.filter(item => !item.stageExist);
    setVisiblePanels(filteredPanels)
  }, [busbarInfo.Panels]);
  
  const toggleSelectAll = () => {
    const updatedPanels = busbarInfo.Panels.map(panel => {
      if (visiblePanels.some(visiblePanels => visiblePanels.id === panel.id)) {
        return { ...panel, selected: !selectAll }
      }
      return panel;
    });
    setBusbarInfo(prev => ({...prev, Panels: updatedPanels}));
    setSelectAll(!selectAll);
  };
  const togglePanel = panelId => {
    const updatedPanels = busbarInfo.Panels.map(panel => {
      if (panel.id === panelId) {
        return {...panel, selected: !panel.selected};
      }
      return panel;
    });
    setBusbarInfo(prev => ({...prev, Panels: updatedPanels}));
    setSelectAll(updatedPanels.every(panel => panel.selected));
  };

  return (
    <ScrollView style={{marginVertical: 20}}>
      <Header /><Title2 TxtTitle="BUSBAR  Cu" SubTitle={'PROCUREMENT'} />
      {error ? (<Text style={errorTxt}>{error}</Text>) : null}
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
                <TouchableOpacity key={item.id}
                  onPress={() => {handleOnchangeText(item.projectName, 'projectName')}}>
                  <Text style={sugesstion}>{item.projectName}</Text>
                </TouchableOpacity>
              ))
            }
            </View>
          ) : null}
          <Text style={right}>{customer}</Text>
          <Text style={right}>{projectId}</Text>
          <View style={{width: '98%'}}>
            <StagesPODetail onValueChange={value => {handleOnchangeText(value, 'stagesPODetails')}}/>
          </View>
          <Text style={txtInput} onChangeText={onDateChange}>
            <PickedDateM onChangeText={onDateChange} />
          </Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 5}}>
        <PanelWrapperOnForm selectAll={selectAll} onPress={toggleSelectAll}/>
          {busbarInfo.Panels.filter(item => !item.stageExist).map(item => (
            <PanelItemOnForm
              key={item.id} panelId={item.id}
              panelName={item.pnameInput}
              selected={item.selected}
              selectAll={selectAll}
              onToggle={togglePanel}
            />
          ))}
          <AllPanelsExistMessage />
      </ScrollView>
      {isSaving ? (<LoadingComponentS />) : (
        <Button6 text={'Submit'} bgColor={'#427583'} fontColor={'white'} onPress={submitForm}/>
      )}
    </ScrollView>
  );
};

export default FormPOBusbar;