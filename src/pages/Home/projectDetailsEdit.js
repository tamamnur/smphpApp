import { Text, TextInput, StyleSheet, View, ScrollView, ActivityIndicator, ToastAndroid, TouchableOpacity, Alert, } from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconBack, LogoSmpHP, EditButton, } from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Button6 from '../../components/Button6';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormatDate from '../../components/FormatDate';

const ProjectDetailsEdit = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const id = props.route.params.id;
  const [projectInfo, setProjectInfo] = useState({
    ProjectName: '', ProjectId: '', Customer:'', NumberPO:'', DatePO: new Date(),
  })
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect (() => {
    const unsubscribe = firestore().collection('Project').doc(id)
    .onSnapshot(doc => {
      const data = doc.data();
      if (data && data.datePO) {
        const FirebaseDate = data.datePO.toDate();
        const getDatePO = FirebaseDate ? FormatDate(FirebaseDate) : '---';        
        setProjectInfo({
          ProjectName: doc.data().projectName,
          ProjectId: doc.data().projectId,
          Customer: doc.data().customer,
          NumberPO: doc.data().numberPO,
          DatePO: getDatePO,
        }),
        // console.log(projectInfo)
          setIsLoading(false);
        } else {
          setProjectInfo(prevProjectInfo => ({
            ...prevProjectInfo, DatePO: new Date(),
          }))
          setIsLoading(false)
          // ToastAndroid.show('Some data not found', ToastAndroid.SHORT);
        }
      }, error => {
        ToastAndroid.show('Error', error.message, ToastAndroid.SHORT);
        setIsLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }, [id]);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleDatePicked = (date) => {
      setProjectInfo(prevProjectInfo => ({
        ...prevProjectInfo,
        DatePO: date,
      }));
      hideDatePicker();
    };

    const handleDeleteProject = () => {
      Alert.alert('Konfirmasi Hapus', 'Apakah Anda yakin ingin menghapus Project ini?', 
      [{ text: 'Batal', style: 'cancel'},
       {text: 'Hapus', style:'destructive', onPress: async () => {
        try {
          await firestore().collection('Project').doc(id).delete();
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert('Error', 'Terjadi kesalahan saat menghapus Project.');
        }
       }}])
    }
    const handleSaveChanges = async () => {
      try {
        await firestore().collection('Project').doc(id).update({
          projectName: projectInfo.ProjectName,
          projectId: projectInfo.ProjectId,
          customer: projectInfo.Customer,
          numberPO: projectInfo.NumberPO,
          datePO: new Date (projectInfo.DatePO),
        })
        navigation.goBack();
        ToastAndroid.show('Detail Project'+projectInfo.ProjectName+' telah diperbarui', ToastAndroid.SHORT)
      } catch (error) {
        Alert.alert('Error', 'Terjadi kesalahan saat menyimpan perubahan.')
      }
    }
      
    return (
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
          <IconBack onPress={() => navigation.goBack()} />
          <LogoSmpHP style={{marginLeft: 180}} />
        </View>
        {isLoading ? (
          <View style={{marginTop: 50}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            <Text style={styles.title}>EDIT PROJECT DETAIL</Text>
            <View style={styles.projectId}>
              <View>
                <Text style={styles.left}>Number SO</Text>
                <Text style={styles.left}>Project Name</Text>
                <Text style={styles.left}>Customer</Text>
                <Text style={styles.left}>Number PO</Text>
                <Text style={styles.left}>Date PO</Text>
              </View>
              <View>
              <TextInput
                style={styles.right}
                value={projectInfo.ProjectId}
                onChangeText={text => setProjectInfo({ ...projectInfo, ProjectId: text })}
              />
              <TextInput
                style={styles.right}
                value={projectInfo.ProjectName}
                onChangeText={text => setProjectInfo({ ...projectInfo, ProjectName: text })}
              />
              <TextInput
                style={styles.right}
                value={projectInfo.Customer}
                onChangeText={text => setProjectInfo({ ...projectInfo, Customer: text })}
              />
              <TextInput
                style={styles.right}
                value={projectInfo.NumberPO}
                onChangeText={text => setProjectInfo({ ...projectInfo, NumberPO: text })}
              />
              <TouchableOpacity
                onPress={showDatePicker}
                onChangeText={text => setProjectInfo({ ...projectInfo, DatePO: text })}
              >
              <Text
                style={styles.right}
                value={projectInfo.DatePO}
                >{projectInfo.DatePO}</Text>
                {/* /> */}
                </TouchableOpacity>
              {isDatePickerVisible &&
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDatePicked}
                onCancel={hideDatePicker}
              />
              } 
              </View>
            </View> 
            <Button6
              text="Save Changes"
              bgColor={BiruKu}
              fontColor={'white'}
              onPress={handleSaveChanges}
            />
            <Button6 
              text="Delete Project"
              bgColor={'black'}
              fontColor={'red'}
              onPress={handleDeleteProject}
            />
          </View>
        )}
      </View>
    );
  }

export default ProjectDetailsEdit;

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: BiruKu,
  },
  projectId: {
    marginHorizontal: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  left: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginVertical: 14,
    color: BiruKu,
  },
  right: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    borderWidth: 1,
    borderColor: BiruKu,
    marginLeft: 8,
    height: 35,
    width: 250,
    padding: 3,
    paddingHorizontal: 5,
    marginVertical: 8,
    color: BiruKu,
  },
  pnameTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginTop: 14,
    marginHorizontal: 20,
    color: BiruKu,
  },
  pname: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginVertical: 2,
    marginHorizontal: 2,
    paddingTop: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 290,
  },
  pnomor: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    paddingTop: 2,
    marginVertical: 2,
    marginLeft: 20,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 30,
    textAlign: 'center',
  },
  btnSave:{
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
    textAlign: 'center'
  },
});