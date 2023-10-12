import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component, useState} from 'react';
import {IconBack, IconAdd, LogoSmpHP} from '../../assets';
import {BiruKu, Darkred} from '../../utils/constant';
import InputDataProject from '../../components/InputDataProject';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import Button6 from '../../components/Button6';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
    if (!value.trim()) {
      updatedErrorText[index] = 'Please enter the panel name !';
    } else {
      updatedErrorText[index] = '';
    }
    setErrorText(updatedErrorText);
  };


  const removeForm = index => {
    // const updatedForms = [...forms];
    // updatedForms.splice(index, 1);

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
      setErrorText(
        pnameInput.map(item =>
          !item.trim() ? 'Please enter the panel name !' : '',
        ),
      );
      return;
    }
    const id = route.params.projectId;
    console.log('project Id', id);
    try {
      const batch = firestore().batch();
      pnameInput.forEach((item, index) => {
        batch.set(
          firestore().doc(`Project/${id}/PanelName/${index + 1}`),
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

      <ScrollView style={{height: '82%', marginTop: -15}}>
        {forms.map((_, index) => {
          return (
            <>
            <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
              {/* // key={index.toString()}> */}
              <InputDataProject
                key={index+1}
                label={`Panel - ${index + 1}`}
                value={pnameInput[index]}
                onChangeText={value => {onPnameInputChange(value, index)}}
              />

              <TouchableOpacity style={styles.iconDel} 
                onPress={() => removeForm(index)}>
                <AntDesign name="closecircle" color={Darkred} size={20} />
              </TouchableOpacity>

            </View>
              <View style={{flex: 1, alignSelf: 'flex-end', marginRight: 55}}>
                {errorText[index] !== '' && <Text style={styles.errMessage}>{errorText[index]}</Text>}
              </View>
                </>
          );
        })}
        <TouchableOpacity 
          style={{marginLeft: 99, marginVertical: 5, flex: 2}}
        // style={styles.iconAdd} 
          // onPress={() => setFormQty(prev => prev + 1)}>
          onPress={addForm}>
          <AntDesign name="pluscircle" color={BiruKu} size={30} />
        </TouchableOpacity>

      <Button6
        text={'CREATE PROJECT'}
        bgColor={BiruKu}
        fontColor={'white'}
        onPress={handlePnameInput}
        />
        </ScrollView>
    </View>
  );
};

export default PanelNameInput;

const styles = StyleSheet.create({
  iconAdd: {
    marginLeft: 105,
    marginBottom: 45,
    flex: 2,
  },
  errMessage: {
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    color: Darkred,
    marginTop: -32,
    // marginBottom: -6
  }
});