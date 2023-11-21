import {View, Text, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BiruKu, Darkred} from '../../utils/constant';
import InputDataProject from '../../components/InputDataProject';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import Button6 from '../../components/Button6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingComponent from '../../components/LoadingComponent';
import Header from '../../components/Header';
import LoadingComponentS from '../../components/LoadingComponentS';

const PanelNameInputEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isMounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [formQty, setFormQty] = useState(1);
  const [pnameInput, setPnameInput] = useState(['']);
  const [errorText, setErrorText] = useState(['']);
  const [isSaving, setIsSaving] = useState(false);
  const [panelNames, setPanelNames] = useState([]);
  const [monitoringID, setMonitoringID] = useState([]);
  const [IDsToDelete, setIDsToDelete] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const id = route.params.id;
        const panelNameSnapshot = await firestore().collection(`Project/${id}/PanelName`).get();
        const panelDoc = panelNameSnapshot.docs.map(doc => doc.data());
        console.log('getData..',panelDoc)
        if (isMounted) {
          setFormQty(panelDoc.length);
          setPnameInput(panelDoc.map(item => item.pnameInput));
          setErrorText(Array(panelDoc.length).fill(''));
          setPanelNames(panelDoc);
          setMonitoringID(panelDoc.map(item => item.MonitoringID))
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching panel names:', error);
        if (isMounted) {setIsLoading(false)}
      }
    };

    fetchData();
    return () => {setIsMounted(false)};
  }, [route.params.id]);

  const onPnameInputChange = (value, index) => {
    const updatedPanelName = [...pnameInput];
    updatedPanelName[index] = value;
    setPnameInput(updatedPanelName);

    const updatedErrorText = [...errorText];
    if (!value.trim()) {updatedErrorText[index] = 'Please enter the panel name !   '} 
    else {updatedErrorText[index] = ''}
    setErrorText(updatedErrorText);
  };

  const removeForm = index => {
    const updatedPnameInput = [...pnameInput];
    updatedPnameInput.splice(index, 1);

    const updatedErrorText = [...errorText];
    updatedErrorText.splice(index, 1);

    setFormQty(formQty - 1);
    setPnameInput(updatedPnameInput);
    setErrorText(updatedErrorText);

    if(monitoringID[index]) {
      console.log(monitoringID[index])
      setIDsToDelete(prevIds => [...prevIds, monitoringID[index]])
      return monitoringID[index];
    }
    return null;
  };
  const addForm = () => {
    setFormQty(prev => prev + 1);
    setPnameInput(prev => [...prev, '']);
    setErrorText(prev => [...prev, '']);
  };

  const handlePnameInput = async () => {
    if (pnameInput.some(item => !item.trim())) {
      setErrorText(pnameInput.map(
        item => !item.trim() ? 'Please enter the panel name !   ' : ''));
      return;
    }
    const id = route.params.id;
    try {
      setIsSaving(true);
      const batch = firestore().batch();
      const deletionOpr = [];
      
      for (let index = 0; index< pnameInput.length; index++) {
        const item = pnameInput[index];
        const docRef = firestore().doc(`Project/${id}/PanelName/${index + 1}`);
        const monitoringIDValue = monitoringID[index] || null;
        batch.set(docRef, {pnameInput: item, MonitoringID: monitoringIDValue});
      }

      // for (const idToDelete of IDsToDelete) {
      //   console.log('id will deletion',IDsToDelete)
      //   const quarySnapshot = await firestore().collection(`Project/${id}/PanelName`)
      //   .where('MonitoringID', '==', idToDelete).get();
      //   quarySnapshot.forEach(async (doc) => {
      //     // console.log('doc Ref', doc.data().MonitoringID)
      //     // const getId =  doc.data().MonitoringID
      //     // console.log('doc Ref', getId.substring(12))
      //     // const idSubs12 = getId.substring(12)
      //     // console.log('idSubs12..', idSubs12)
      //     // await firestore().collection('Monitoring').doc(idSubs12).delete();
      //     // batch.delete(doc.ref)
      //   })
      // }

      if (formQty < panelNames.length) {
        for (let i = formQty; i < panelNames.length; i++) {
          const panelRef = firestore().doc(`Project/${id}/PanelName/${i + 1}`);
          if(IDsToDelete) {
            const value = IDsToDelete[0].split('/').pop();
            console.log('get..',IDsToDelete)
            await firestore().collection('Monitoring').doc(value).delete()
          }
          batch.delete(panelRef)
        }
      }
      
      await batch.commit();
      setIsSaving(false)
      ToastAndroid.show('The changes have been successfully saved.', ToastAndroid.SHORT);
      navigation.replace('ProjectDetails', {id});
    } catch (error) {
      console.error('Error saving changes to panel names', error);
      ToastAndroid.show('Error saving changes to panel names',ToastAndroid.SHORT)
    } finally {
      if (isMounted) {setIsLoading(false); setIsSaving(false)}
    }
  };

  return (
    <View style={{marginTop: 30}}>
      <Header />
      <Title2 TxtTitle={'PANEL NAMES EDIT'} />
      {isLoading ? (<LoadingComponent />) : (<>
      <Text style={{marginTop: -25, marginBottom: 15, marginHorizontal: 20, textAlign: 'center', 
        fontFamily: 'Poppins-Italic', fontSize: 13, color: Darkred}}>
        Please pay close attention when you intend to delete the panel name.</Text>
        <ScrollView style={{height: '70%', marginTop: -15}}>
          {Array.from({length: formQty}).map((_, index) => (
            <React.Fragment key={`panel-${index+1}`}>
              <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                <InputDataProject
                  key={index+1}
                  label={`Panel - ${index + 1}`}
                  value={pnameInput[index]}
                  onChangeText={value => onPnameInputChange(value, index)}
                />
                <TouchableOpacity onPress={() => removeForm(index)}>
                  <AntDesign name="closecircle" color={Darkred} size={20}/>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignSelf: 'flex-end', marginRight: 40}}>
                {errorText[index] !== '' && (<Text style={
                  {fontFamily: 'Poppins-Italic', fontSize: 12, color: Darkred, marginTop: -32}}>
                  {errorText[index]}
                </Text>)}
              </View>
            </React.Fragment>
          ))}

          <TouchableOpacity style={{marginLeft: 99, marginVertical: 5, flex: 2}} onPress={addForm}>
            <AntDesign name="pluscircle" color={BiruKu} size={30} />
          </TouchableOpacity>
          {isSaving ? (<LoadingComponentS/>) : (       
          <Button6 text={'Finish & Save'} bgColor={BiruKu} fontColor={'white'} onPress={handlePnameInput}/>)}
        </ScrollView>
      </>)}
    </View>
  );
};

export default PanelNameInputEdit;