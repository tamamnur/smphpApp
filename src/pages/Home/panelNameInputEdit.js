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
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const id = route.params.id;
        const panelNameSnapshot = await firestore()
          .collection(`Project/${id}/PanelName`).get();
        const panelNames = panelNameSnapshot.docs.map(doc => doc.data());
        if (isMounted) {
          setFormQty(panelNames.length);
          setPnameInput(panelNames.map(item => item.pnameInput));
          setErrorText(Array(panelNames.length).fill(''));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching panel names:', error);
        if (isMounted) {
          setIsLoading(false);
        }
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
    if (!value.trim()) {
      updatedErrorText[index] = 'Please enter the panel name !   ';
    } else {
      updatedErrorText[index] = '';
    }
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
  };

  const addForm = () => {
    setFormQty(prev => prev + 1);
    setPnameInput(prev => [...prev, '']);
    setErrorText(prev => [...prev, '']);
  };

  const handlePnameInput = async () => {
    if (pnameInput.some(item => !item.trim())) {
      setErrorText(
        pnameInput.map(item =>
          !item.trim() ? 'Please enter the panel name !   ' : '',
        ),
      );
      return;
    }

    const id = route.params.id;
    try {
      setIsSaving(true);
      const batch = firestore().batch();
      pnameInput.forEach((item, index) => {
        const docRef = firestore().doc(`Project/${id}/PanelName/${index + 1}`);
        batch.set(docRef, {pnameInput: item});
      });
      await batch.commit();
      // console.log('Panel names edited successfully');
      setIsSaving(false)
      ToastAndroid.show('Panel names edited successfully', ToastAndroid.SHORT);
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
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <ScrollView style={{height: '82%', marginTop: -15}}>
          {Array.from({length: formQty}).map((_, index) => (
            <React.Fragment key={`panel-${index+1}`}>
              <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                <InputDataProject
                  key={index+1}
                  label={`Panel - ${index + 1}`}
                  value={pnameInput[index]}
                  onChangeText={value => onPnameInputChange(value, index)}
                />
                <TouchableOpacity
                  onPress={() => removeForm(index)}>
                  <AntDesign name="closecircle" color={Darkred} size={20} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignSelf: 'flex-end', marginRight: 40}}>
                {errorText[index] !== '' && (
                  <Text 
                    style={{fontFamily: 'Poppins-Italic', fontSize: 12, color: Darkred, marginTop: -32}}>
                    {errorText[index]}
                  </Text>
                )}
              </View>
            </React.Fragment>
          ))}

          <TouchableOpacity style={{marginLeft: 99, marginVertical: 5, flex: 2}} onPress={addForm}>
            <AntDesign name="pluscircle" color={BiruKu} size={30} />
          </TouchableOpacity>
          {isSaving ? (<LoadingComponentS/>) : (       
          <Button6 text={'Finish & Save'} bgColor={BiruKu} fontColor={'white'} onPress={handlePnameInput}/>)}
        </ScrollView>
      )}
    </View>
  );
};

export default PanelNameInputEdit;