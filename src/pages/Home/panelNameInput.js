import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component, useState} from 'react';
import {IconBack, IconAdd, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import InputDataProject from '../../components/InputDataProject';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import Button6 from '../../components/Button6';

const PanelNameInput = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [errorText, setErrorText] = useState('');
  const [formQty, setFormQty] = useState(1);
  const [formToDelete, setFormToDelete] = useState(null);
  const forms = [...Array(formQty)];
  const [pnameInput, setPnameInput] = useState(['']);

  const onPnameInputChange = (value, index) => {
    const updatedPanelName = [...pnameInput];
    updatedPanelName[index] = value;
    setPnameInput(updatedPanelName);

    const updatedErrorText = [...errorText];
    // updatedErrorText[index] = ''
    if (!value.trim()) {
      updatedErrorText[index] = 'Please fill in this panel name';
    } else {
      updatedErrorText[index] = '';
    }
    setErrorText(updatedErrorText);

    // if (updatedPanelName.some(item => item.trim() ==='')) {
    //   setErrorText('Please fill in all panel names');
    // } else {
    //   setErrorText('');
    // }
  };

  const removeForm = index => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);

    const updatedPnameInput = [...pnameInput];
    updatedPnameInput.splice(index, 1);

    const updatedErrorText = [...errorText];
    updatedErrorText.splice(index, 1);

    setFormQty(formQty - 1);
    // setForms(updatedForms);
    setPnameInput(updatedPnameInput);
    setErrorText(updatedErrorText);
  };

  const handlePnameInput = async () => {
    if (pnameInput.some(item => !item.trim())) {
      // setErrorText('Please fill in all panel names');
      setErrorText(
        pnameInput.map(item =>
          !item.trim() ? 'Please fill in this panel name' : '',
        ),
      );
      return;
    }
    const projectId = route.params.projectId;
    console.log('project Id', projectId);
    try {
      const batch = firestore().batch();
      pnameInput.forEach((item, index) => {
        batch.set(
          firestore().doc(`Project/${projectId}/PanelName/${index + 1}`),
          {pnameInput: item},
        );
      });

      await batch.commit();
      console.log('Panel names input was successfull');
      navigation.replace('SecuredNav');
    } catch (error) {
      console.error('Error saving panel names', error);
    }
  };

  return (
    <View style={{marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        <LogoSmpHP style={{marginLeft: 240}} />
      </View>
      <Title2 TxtTitle="PANEL NAMES INPUT" />

      <ScrollView style={{height: 450}}>
        {forms.map((item, index) => {
          return (
            <View key={index.toString()}>
              <InputDataProject
                label={`Panel - ${index + 1}`}
                // key={index.toString()}
                onChangeText={value => {
                  onPnameInputChange(value, index);
                }}
              />
              {errorText[index] !== '' && <Text>{errorText[index]}</Text>}
              <TouchableOpacity onPress={() => removeForm(index)}>
                <Text style={{color: 'red'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity style={styles.iconAdd}>
          <IconAdd onPress={() => setFormQty(prev => prev + 1)} />
        </TouchableOpacity>
      </ScrollView>

      {/* {errorText !== '' && (
        <Text style={{color: 'red', textAlign: 'center', marginVertical: 10}}>
          {errorText}
        </Text>
      )} */}
      <Button6
        text={'CREATE PROJECT'}
        bgColor={BiruKu}
        fontColor={'white'}
        onPress={handlePnameInput}
      />
    </View>
  );
};

export default PanelNameInput;

const styles = StyleSheet.create({
  btn: {
    color: '#FFF',
    backgroundColor: BiruKu,
    marginTop: 35,
    marginHorizontal: 55,
    paddingHorizontal: 10,
    paddingVertical: 14,
    elevation: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  iconAdd: {
    marginLeft: 105,
    marginBottom: 45,
    flex: 2,
  },
});
