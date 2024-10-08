import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView} from 'react-native';
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {BiruKu} from '../../utils/constant';
import {left, right, unvailable, txtInput, dropdownSugesstion,sugesstion, errorTxt } from '../../utils/fontStyles';
import {useNavigation} from '@react-navigation/native';
import Title2 from '../../components/Title2';
import firestore from '@react-native-firebase/firestore';
import PickedDateM from '../../components/pickedDateM';
import StagesSD from '../../components/StagesSD';
import Header from '../../components/Header';
import Button6 from '../../components/Button6'
import LoadingComponentS from '../../components/LoadingComponentS'
import PanelWrapperOnForm from '../../components/PanelWrapperOnForm';
import PanelItemOnForm from '../../components/PanelItemOnForm';
import { isValidForm, updateError } from '../../components/FormValidation';

const FormShopdrawing = props => {
  const navigation = useNavigation();
  const [date, setDate] = useState();
  const [error, setError] = useState('');
  const [selectAll, setSelectAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false)
  const [visiblePanels, setVisiblePanels] = useState([])
  const [ProjectList, setProjectList] = useState([]);
  const onDateChange = value => {setDate(value)};
  const isMountedRef = useRef(true);
  useEffect(() => {isMountedRef.current = true;
    return () => {isMountedRef.current = false};
  }, []);

  const [shopdrawingInfo, setShopdrawingInfo] = useState({
    projectId: '', FSProjectId: '', projectName: '', stages: '', customer: '', 
    projectsList: [], Panels: [],
  });
  const {projectId, projectName, stages, customer} = shopdrawingInfo;
  
  const handleOnchangeText = async (value, fieldName) => {
    setShopdrawingInfo(prev => ({
        ...prev, [fieldName]: value, Panels: prev.PanelsOriginal || prev.Panels,
    }));
    
    if (fieldName === 'stages') {
        setIsLoading(true);
        const selectedStage = value;
        if (!shopdrawingInfo.PanelsOriginal) {
            setShopdrawingInfo(prev => ({
                ...prev, PanelsOriginal: [...prev.Panels],
            }));
        }

        const updatePanels = await Promise.all(shopdrawingInfo.Panels.map(async item => {
          if(!isMountedRef.current) return null;
          if (item.MonitoringID) {
              const MonitoringID = item.MonitoringID.substring(1); 
              const submissionDoc = await firestore().collection(MonitoringID + '/Shopdrawing').doc('Submission').get();
              const revisionDoc = await firestore().collection(MonitoringID + '/Shopdrawing').doc('Revision').get();
              const submitExist = submissionDoc.exists;
              const revisionExist = revisionDoc.exists;
              if (selectedStage === 'Submit' && !submitExist) {
                  return {
                      ...item, stageExist: !submitExist,
                  };
              } 
              else if (selectedStage === 'Resubmit' && revisionExist) {
                  return {
                      ...item, stageExist: revisionExist,
                  };
              }
          } 
          else if (selectedStage === 'Submit') {
              return {
                  ...item, stageExist: true,
              };
          }
          return null;
        }));

        const filteredPanels = updatePanels.filter(item => item !== null);
        setShopdrawingInfo(prev => ({
            ...prev, Panels: filteredPanels,
        }));
        if (isMountedRef.current) {
            setIsLoading(false);
        }
    }
  };
  
  const handleFormShopdrawing = async () => {
    setIsSaving(true);
    let panelSelected = false;
    const batch = firestore().batch()
    const operations = []
    const visiblePanelsIds = visiblePanels.map(panel => panel.id)
    const panelsToUpdate = shopdrawingInfo.Panels.filter(panel => visiblePanelsIds.includes(panel.id))
    for (const value of panelsToUpdate) {
      let MonitoringID = value.MonitoringID ? value.MonitoringID.split('/').pop() : null;
      const projectRef = firestore().collection('Project').doc(shopdrawingInfo.FSProjectId);
      const Submit = firestore().collection('Monitoring').doc(MonitoringID).collection('Shopdrawing').doc('Submission');
      const Revision = firestore().collection('Monitoring').doc(MonitoringID).collection('Shopdrawing').doc('Revision');
      const Approve = firestore().collection('Monitoring').doc(MonitoringID).collection('Shopdrawing').doc('Approval');
      const validPanels = await Submit.get();
      const isValid = validPanels.exists;
      const invalidMsg = () => {
        return updateError(value.pnameInput+' is not valid. \n Ensure the selected panel has a Submission Date', setError)
      }
      if (value.selected === true) {
        if (shopdrawingInfo.stages === 'Submit') {
          if (value.MonitoringID) {
            MonitoringID = value.MonitoringID.split('/')[2];
          } else {
            const newMonitoring = await firestore().collection('Monitoring').add({
                ProjectID: '/Project/' + shopdrawingInfo.FSProjectId,
              });
            MonitoringID = newMonitoring.id;
          }
          const submitData = {DateSubmit: firestore.Timestamp.fromDate(date)}
          operations.push(
            batch.set(Submit, submitData),
            batch.update(projectRef,{
              status: 'Shopdrawing - Submission',
              updatedAt: firestore.Timestamp.fromDate(date),
            })
          )
        }
        else if (shopdrawingInfo.stages === 'Resubmit') {
          if (!MonitoringID) {setIsSaving(false), invalidMsg(); return}
          if (!isValid) {setIsSaving(false), invalidMsg(); return}
          const revisiData = {DateReSubmit: firestore.Timestamp.fromDate(date)}
          operations.push(
            batch.update(Revision, revisiData),
            batch.update(projectRef, {
              status: 'Shopdrawing - Submit Revision',
              updatedAt: firestore.Timestamp.fromDate(date),
            })
          )
        }
        const panelRef = firestore().collection('Project').doc(shopdrawingInfo.FSProjectId).collection('PanelName').doc(value.id);
        const panelData =  {pnameInput: value.pnameInput, MonitoringID: '/Monitoring/'+MonitoringID};
        operations.push(batch.set(panelRef, panelData));
        panelSelected = true;
      }   
    } 
    if (panelSelected && operations.length > 0) {
      try {
        await Promise.all(operations);
        await batch.commit()
        setIsLoading(false), setIsSaving(false);
        ToastAndroid.show('Shopdrawing Procces Updated', ToastAndroid.SHORT)
        navigation.replace('TableShopdrawing')
      } catch (error) {
        setIsSaving(false); 
      }
    } else {
      updateError('Ensure you have chosen the right panel.', setError);
      setIsLoading(false); setIsSaving(false)
    }
  };
  const submitForm = () => {
    const errorStages = {stages: 'Please memories bring back memories bring back..'}
    const detailStage = {stagesPODetail: false}
      if (isValidForm(shopdrawingInfo, date, setError, errorStages, detailStage)) {handleFormShopdrawing()} 
      else {error}
  };
  const isProjectNameSuggestionShow = useMemo(() => {
    return projectName.length > 0;
  }, [projectName.length]);

  useEffect(() => {
    const InitiationFirebase = async () => {
      setIsLoading(false);
      const FBProject = await firestore().collection('Project').get();
      const projectRef = FBProject.docs.map(async doc => {
        const panelName = await doc.ref.collection('PanelName').get();
        const Panels = panelName.docs.map(panelDoc => {
          return {id: panelDoc.id, ...panelDoc.data(), selected: false};
        });
        return {id: doc.id, ...doc.data(), Panels: Panels};
      });
      const projectList = await Promise.all(projectRef);
      if (isMountedRef.current) {
        setProjectList(projectList); setIsLoading(false); setIsSaving(false)
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
        setShopdrawingInfo(prev => ({...prev,
          projectId: MatchProject.projectId,
          FSProjectId: MatchProject.id,
          customer: MatchProject.customer,
          Panels: MatchProject.Panels,
        }));
      } else {
        setShopdrawingInfo(prev => ({...prev, projectId: '', Panels: [], customer: ''}));
      }
    }
  }, [ProjectList, projectName]);

  const AllPanelsExistMessage = () => {
    if (shopdrawingInfo.Panels.every((item) => item.stageExist)) {
      return (
        <Text style={unvailable}>Panel data not available.</Text>
      );
    }
    return null;
  };
  useEffect(()=> {
    const filteredPanels = shopdrawingInfo.Panels.filter(item =>  item.stageExist);
    setVisiblePanels(filteredPanels)
  }, [shopdrawingInfo.Panels])

  const toggleSelectAll = () => {
    const updatedPanels = shopdrawingInfo.Panels.map((panel) => {
      if(visiblePanels.some(visiblePanels => visiblePanels.id === panel.id)) {
        return { ...panel, selected: !selectAll}
      }
      return panel;
    });
    setShopdrawingInfo((prev) => ({...prev, Panels: updatedPanels}))
    setSelectAll(!selectAll);
  }
  
  const togglePanel = (panelId) => {
    const updatedPanels = shopdrawingInfo.Panels.map((panel) => {
      if (panel.id === panelId) {
        return {...panel, selected: !panel.selected}
      }
      return panel
    })
    setShopdrawingInfo((prev) => ({...prev, Panels: updatedPanels}))
    setSelectAll(updatedPanels.every(panel => panel.selected))
  }

  return (
    <ScrollView style={{marginVertical: 20}}>
      <Header/>
      <Title2 TxtTitle="SHOP DRAWING" />
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
            <StagesSD onValueChange={value => handleOnchangeText(value, 'stages')}/>
          </View>
          <Text style={txtInput} onChangeText={onDateChange}>
            <PickedDateM onChangeText={onDateChange} />
          </Text>
        </View>
      </View>
      {isLoading ? (<LoadingComponentS/>) : (<>
      <ScrollView style={{marginTop: 5}}>
        <PanelWrapperOnForm selectAll={selectAll} onPress={toggleSelectAll}/>
        {visiblePanels && visiblePanels.length > 0 ? (
          <ScrollView style={{marginTop: 5}}>
              {visiblePanels.map(item => (
                <PanelItemOnForm
                key={item.id} panelId={item.id}
                panelName={item.pnameInput}
                selected={item.selected}
                selectAll={selectAll}
                onToggle={togglePanel}
                />
              ),
            )}
          </ScrollView>
        ) : (<AllPanelsExistMessage />)}
        </ScrollView>
      </>)}
      {isSaving? (<LoadingComponentS/>):(
        <Button6 bgColor={BiruKu} fontColor={'white'} text={'Submit'} 
          onPress={submitForm}/>
      )}
    </ScrollView>
  );
};

export default FormShopdrawing;