import {View,Text,TouchableOpacity,ScrollView,ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {LogoSmpHP} from '../../assets';
import {BiruKu, Darkred} from '../../utils/constant';
import InputDataProject from '../../components/InputDataProject';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import Button6 from '../../components/Button6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SmallLoading from '../../components/LoadingComponentS'

const PanelNameInput = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [errorText, setErrorText] = useState('');
  const [formQty, setFormQty] = useState(1);
  const forms = [...Array(formQty)];
  const [pnameInput, setPnameInput] = useState(['']);
  const [isSaving, setIsSaving] = useState(false)

  const onPnameInputChange = (value, index) => {
    const updatedPanelName = [...pnameInput];
    updatedPanelName[index] = value;
    setPnameInput(updatedPanelName);

    const updatedErrorText = [...errorText];
    if (!value.trim()) {updatedErrorText[index] = 'Please enter the panel name !'} 
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
  };
  const addForm =()=> {
    setFormQty(prev => prev+1)
    setPnameInput(prev => [...prev, ''])
    setErrorText(prev => [...prev, ''])
  }

  const handlePnameInput = async () => {
    if (pnameInput.some(item => !item.trim())) {
      setErrorText(pnameInput.map(item =>!item.trim() 
        ? 'Please enter the panel name !' : '')
      );
    return;
    }
    const id = route.params.projectId;
    setIsSaving(true)
    try {
      const batch = firestore().batch();
      pnameInput.forEach((item, index) => {
        batch.set(
          firestore().doc(`Project/${id}/PanelName/${index + 1}`),
          {pnameInput: item},
        );
      });
      await batch.commit();
      ToastAndroid.show('Panel names input was successfull', ToastAndroid.SHORT)
      setIsSaving(false)
      navigation.replace('SecuredNav');
    } catch (error) {
      console.error('Error saving panel names', error);
    }
  };

  return (
    <View style={{marginTop: 20}}>
      <View style={{alignSelf: 'flex-end', marginRight: 25}}><LogoSmpHP/></View>
      <Title2 TxtTitle="PANEL NAMES INPUT" />
      <ScrollView style={{height: '82%', marginTop: -15}}>
        {forms.map((_, index) => {
          return (
          <React.Fragment key={`panel-${index+1}`}>
            <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
              <InputDataProject
                key={index+1}
                label={`Panel - ${index + 1}`}
                value={pnameInput[index]}
                onChangeText={value => {onPnameInputChange(value, index)}}
              />
              <TouchableOpacity onPress={() => removeForm(index)}>
                <AntDesign name="closecircle" color={Darkred} size={20} />
              </TouchableOpacity>
            </View>
              <View style={{flex: 1, alignSelf: 'flex-end', marginRight: 55}}>
                {errorText[index] !== '' && 
                <Text style={{fontFamily:'Poppins-Italic', fontSize: 12, color: Darkred, marginTop: -32}}>
                  {errorText[index]}
                </Text>}
              </View>
          </React.Fragment>
          );
        })}
        <TouchableOpacity 
          style={{marginLeft: 99, marginVertical: 5, flex: 2}}
          onPress={addForm}>
          <AntDesign name="pluscircle" color={BiruKu} size={30} />
        </TouchableOpacity>
        {isSaving ? (<SmallLoading/>) : (
        <Button6 text={'Finish & Submit'}
          bgColor={BiruKu} fontColor={'white'}
          onPress={handlePnameInput}/>)}  
      </ScrollView>
    </View>
  );
};

export default PanelNameInput;