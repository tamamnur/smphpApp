import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import InputDataProject from '../../components/InputDataProject';
import {useNavigation} from '@react-navigation/native';
import Title from '../../components/Title';
import firestore from '@react-native-firebase/firestore';
import PickedDateFull from '../../components/pickedDateFull';
import StagesSD from '../../components/StagesSD';
import CheckBox from '@react-native-community/checkbox';

const isValidObjField = obj => {
  return Object.values(obj).every(value => {
    // if (value && typeof value === 'string') {
      if (value) {
      console.log(value);
      return value.trim();
    }
  });
};

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate('');
  }, 3000);
};

const FormShopdrawing = props => {
  const navigation = useNavigation();
  const [date, setDate] = useState();
  const [ProjectList, setProjectList] = useState([]);
  const [panelSelected, setPanelSelected] = useState(false);
  const onDateChange = value => {
    setDate(value);
  };
  const [shopdrawingInfo, setShopdrawingInfo] = useState({
    projectId: '',
    FSProjectId: '',
    projectName: '',
    stages: '',
    customer: '',
    projectsList: [],
    Panels: [],
  });

  const [error, setError] = useState('');
  const {projectId, projectName, stages, customer} = shopdrawingInfo;
  const handleOnchangeText = (value, fieldName) => {
    setShopdrawingInfo({...shopdrawingInfo, [fieldName]: value});
  };
  const isValidForm = () => {
    // if (!isValidObjField(shopdrawingInfo))
    //   return updateError('Required all fields!', setError);
    if (!projectName.trim() || projectName.length === 0 )
      return updateError('Invalid name of project', setError);
    if (!stages.trim() || stages.length === 0 )
      return updateError('Required to choice Stages of Shopdrawing', setError)
    if (!date === 0 )
      return updateError('Required to choice Date of Proccess!', setError)
    
    return true;
  };
  const submitForm = () => {
    // {isValidForm() ? handleFormShopdrawing() : error;}
    if (isValidForm()) {
    handleFormShopdrawing();
    } else {
    error
    }
  };

  const handleFormShopdrawing = async () => {
    // console.log(date);
    console.log(shopdrawingInfo);
    shopdrawingInfo.Panels.forEach(async value => {
      if (value.selected === true) {
        console.log(value);
        let MonitoringID = null
        if (value.MonitoringID) {
          MonitoringID = value.MonitoringID.split('/')[2]
        } else {
          const newMonitoring = await firestore()
            .collection('Monitoring')
            .add({
              ProjectID: '/Project/' + shopdrawingInfo.FSProjectId,
            });
            MonitoringID = newMonitoring.id
        }
        const Shopdrawing = firestore()
          .collection('Monitoring')
          .doc(MonitoringID)
          .collection('Shopdrawing');
        if (shopdrawingInfo.stages === 'Approval') {
          await Shopdrawing.doc('Approval').set({
            DateApprove: firestore.Timestamp.fromDate(date),
          });
        }
        if (shopdrawingInfo.stages === 'Revision') {
          await Shopdrawing.doc('Revision').set({
            DateRevisi: firestore.Timestamp.fromDate(date),
          });
        }
        if (shopdrawingInfo.stages === 'Submission') {
          await Shopdrawing.doc('Submission').set({
            DateSubmit: firestore.Timestamp.fromDate(date),
          });
        }

        await firestore()
          .collection('Project')
          .doc(shopdrawingInfo.FSProjectId)
          .collection('PanelName')
          .doc(value.id)
          .set({
            pnameInput: value.pnameInput,
            MonitoringID: '/Monitoring/' + MonitoringID,
          });
          setShopdrawingInfo(prev => ({
            ...prev,
            Panels: prev.Panels.map(panelItem => {
              if (panelItem.id === value.id) {
                return {
                  ...panelItem,
                  MonitoringID: '/Monitoring/' + MonitoringID,
                };
              }
              return panelItem;
            }),
          })) 
        }
    });

    // const shopdrawingCollection = await firestore()
    //   .collection('Monitoring')
    //   .add({
    //     projectId: projectId,
    //     projectName: projectName,
    //     customer: customer,
    //     stages: stages,
    //     date: firestore.Timestamp.fromDate(date),
    //   })
    //   .then(response => {
    //     console.log('Submitted');
    //     ToastAndroid.show('Update has been added', ToastAndroid.SHORT);
    //     navigation.navigate('SD_Submission');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const Panel = props => {
    const navigation = useNavigation();
    return (
      <View style={{flexDirection: 'row', marginLeft: 35, marginTop: 2}}>
        <CheckBox
          style={{borderColor: '#920'}}
          disabled={false}
          value={props.value}
          onValueChange={(newValue, index) => {
            props.onValueChange(newValue);
          }}
        />
        <Text style={styles.pname}>{props.pname}</Text>
      </View>
    );
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
          return {
            id: panelDoc.id,
            ...panelDoc.data(),
            selected: false,
          };
        });
        return {
          id: doc.id,
          ...doc.data(),
          Panels: Panels,
        };
      });
      setProjectList(await Promise.all(projectRef));
    };
    InitiationFirebase();
  }, []);

  useEffect(() => {
    if (ProjectList.length) {
      const MatchProject = ProjectList.find(value => {
        return value.projectName === projectName;
      });
      if (MatchProject) {
        setShopdrawingInfo(prev => ({
          ...prev,
          projectId: MatchProject.projectId,
          FSProjectId: MatchProject.id,
          customer: MatchProject.customer,
          Panels: MatchProject.Panels,
        }));
      } else {
        setShopdrawingInfo(prev => ({
          ...prev,
          projectId: '',
          Panels: [],
          customer: '',
        }));
      }
    } 
    // if (ProjectList.length) {
    //   const DidnMatchProject = ProjectList.find(value => {
    //     return value.projectName !== projectName;
    //   })
    // }
  }, [ProjectList, projectName]);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <IconBack
          onPress={() => navigation.navigate('Discover')}
          style={{marginTop: 10, marginLeft: 30}}
        />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <Title TxtTitle="SHOP DRAWING" />
      {error ? (
        <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
          {error}
        </Text>
      ) : null}
      <View>
        <InputDataProject
          label="Project Name"
          onChangeText={value => handleOnchangeText(value, 'projectName')}
          value={projectName}
        />
        {isProjectNameSuggestionShow ? (
          <View style={styles.dropdownSugesstion}>
            {ProjectList.filter(item => {
              const searchTerm = projectName.toLowerCase();
              const fullname = item.projectName.toLowerCase();
              return (
                searchTerm &&
                fullname.includes(searchTerm) &&
                fullname !== searchTerm
              );
            }).map(item => (
              <TouchableOpacity
                onPress={() => {
                  handleOnchangeText(item.projectName, 'projectName');
                }}>
                <Text style={styles.sugesstion}>{item.projectName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
      <InputDataProject
        label="Customer"
        onChangeText={value => handleOnchangeText(value, 'customer')}
        value={customer}
      />
      <InputDataProject
        label="Number SO"
        onChangeText={value => handleOnchangeText(value, 'projectId')}
        value={projectId}
      />
      <View style={{marginHorizontal: 57, flexDirection: 'row'}}>
        <Text style={styles.label}>Stages</Text>
        <View style={{marginLeft: 8, width: 250}}>
          <StagesSD
            onValueChange={value => handleOnchangeText(value, 'stages')}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.txtInput} onChangeText={onDateChange}>
          <PickedDateFull onChangeText={onDateChange} />
        </Text>
      </View>
      <ScrollView style={{marginTop: 5}}>
        <View style={styles.wrappPanelTitle}>
          <Text style={{fontFamily: 'Poppins-Medium', color: BiruKu}}>
            Panel Name
          </Text>
        </View>
        {shopdrawingInfo.Panels.map(item => (
          <Panel
            pname={item.pnameInput}
            value={item.selected}
            onValueChange={value =>
              setShopdrawingInfo(prev => ({
                ...prev,
                Panels: prev.Panels.map(panelItem => {
                  if (panelItem.id === item.id) {
                    return {
                      ...panelItem,
                      selected: value,
                    };
                  }
                  return panelItem;
                }),
              }))
            }
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={submitForm}>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFF',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormShopdrawing;

const styles = StyleSheet.create({
  page: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
  },
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
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'right',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,
    height: 35,
    padding: 10,
    marginVertical: 8,
    fontSize: 30,
    marginHorizontal: 10,
    width: 250,
  },
  dropdownSugesstion: {
    position: 'absolute',
    left: 112,
    right: 30,
    borderWidth: 1,
    borderColor: BiruKu,
    borderTopColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#E8E8E8',
    top: 46,
    zIndex: 1,
  },
  sugesstion: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: BiruKu,
    marginHorizontal: 5,
  },
  pname: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    marginVertical: 2,
    marginHorizontal: 2,
    paddingTop: 4,
    paddingLeft: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: BiruKu,
    width: 290,
  },
  pnomor: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    marginLeft: 20,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 30,
    textAlign: 'center',
  },
  wrappPanelTitle: {
    borderBottomWidth: 2,
    borderColor: BiruKu,
    marginRight: 30,
    marginLeft: 40,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
});
