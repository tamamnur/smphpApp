import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, ActivityIndicator, } from 'react-native';
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import Title2 from '../../components/Title2';
import firestore from '@react-native-firebase/firestore';
import PickedDateFull from '../../components/pickedDateFull';
import CheckBox from '@react-native-community/checkbox';
import StagesFinish from '../../components/StagesFinish';

const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate('');
  }, 3000);
};

const FormFinishing = (props) => {
  const navigation = useNavigation();
  const [date, setDate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [ProjectList, setProjectList] = useState([]);
  const onDateChange = value => {setDate(value)};

  const isValidForm = () => {
    if (!projectName.trim() || projectName.length === 0)
      return updateError('Invalid name of project', setError);
    if (!stages.trim() || stages.length === 0)
      return updateError('Required to choice Stages of Finishing', setError);
    if (!date)
      return updateError('Required to choice Date of Proccess!', setError);
    return true;
  };
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    }
  }, []);
  
  const [finishingInfo, setFinishingInfo] = useState({
    projectId: '', FSProjectId: '', projectName: '', stages: '', customer: '', projectsList: [], Panels: []
  });
  
  const {projectId, projectName, stages, customer} = finishingInfo;

  const handleOnchangeText = async (value, fieldName) => {
    setFinishingInfo({...finishingInfo, [fieldName]: value});
    if (fieldName === 'stages') {
      setIsLoading(true)
      const selectedStage = value;
      finishingInfo.Panels.forEach(async item => {
        if (item.MonitoringID) {
          const MonitoringID = item.MonitoringID.substring(1);
          const _Data = await firestore().collection(MonitoringID+'/Sent').doc(value).get();
          const isExist = _Data.exists && _Data.data() && _Data.data().hasOwnProperty(selectedStage);
          setFinishingInfo(prev => ({
            ...prev,
            Panels: prev.Panels.map(panel => {
              if (panel.pnameInput === item.pnameInput) {
                return {...panel, stageExist: isExist};
              }
              return panel;
            }),
          }));
          console.log('cek--',item.pnameInput, isExist);
          } else {
            setFinishingInfo(prev => ({
              ...prev,
              Panels: prev.Panels.map(panel => {
                if (panel.pnameInput === item.pnameInput) {
                  return {...panel, stageExist: false};
                }
                return panel;
              }),
            }));
          }
          if (isMountedRef.current) {
            setIsLoading(false);
          }
      });
    }
  };

  const handleFinishing = async () => {
    let panelSelected = false;
    finishingInfo.Panels.forEach(async value => {
      if (value.selected === true) {
        panelSelected = true;
        let MonitoringID = null;
        if (value.MonitoringID) {
          MonitoringID = value.MonitoringID.split('/')[2];
        } else {
          const newMonitoring = await firestore()
            .collection('Monitoring')
            .add({
              ProjectID: '/Project/' + finishingInfo.FSProjectId,
            });
          MonitoringID = newMonitoring.id;
        }
        const Shopdrawing = firestore()
          .collection('Monitoring')
          .doc(MonitoringID)
          .collection('End');
        if (finishingInfo.stages === 'Tested') {
          await Shopdrawing.doc('Tested').set({
            Tested: firestore.Timestamp.fromDate(date),
          });
        }
        if (finishingInfo.stages === 'Sent') {
          await Shopdrawing.doc('Sent').set({
            Sent: firestore.Timestamp.fromDate(date),
          });
        }

        await firestore()
          .collection('Project')
          .doc(finishingInfo.FSProjectId)
          .collection('PanelName')
          .doc(value.id)
          .set({
            pnameInput: value.pnameInput,
            MonitoringID: '/Monitoring/' + MonitoringID,
          });
        setFinishingInfo(prev => ({
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
        }));
        ToastAndroid.show('Data Added', ToastAndroid.SHORT)
        if (stages === 'Tested') {
          navigation.navigate('TestReport')
        }
        if (stages === 'Delivery') {
          navigation.navigate('DeliveryReport')
        }
      }
    });
    console.log(finishingInfo)
    if (!panelSelected) {
      return updateError('You have not selected any Panel', setError);
    }
  };
  const submitForm = () => {
    if (isValidForm()) {
      handleFinishing();
    } else {
      error;
    }
  };
  const isProjectNameSuggestionShow = useMemo(() => {
    return projectName.length > 0;
  }, [projectName.length]);

  useEffect(() => {
    const InitiationFirebase = async () => {
      setIsLoading(true)
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
      const projectList = await Promise.all(projectRef);
      if (isMountedRef.current) {
        setProjectList(projectList);
        setIsLoading(false);
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
        setFinishingInfo(prev => ({
          ...prev,
          projectId: MatchProject.projectId,
          FSProjectId: MatchProject.id,
          customer: MatchProject.customer,
          Panels: MatchProject.Panels,
        }));
      } else {
        setFinishingInfo(prev => ({
          ...prev,
          projectId: '',
          Panels: [],
          customer: '',
        }));
      }
    }
  }, [ProjectList, projectName]);

  const AllPanelsExistMessage = () => {
    if (finishingInfo.Panels.every(item => item.stageExist)) {
      return (
        <Text style={styles.unvailable}>Data nama panel tidak tersedia.</Text>
      );
    }
    return null;
  };
  const Panel = props => {
    const navigation = useNavigation();
    return (
      <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 2}}>
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
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <IconBack
          onPress={() => navigation.goBack()}
          style={{marginTop: 10, marginLeft: 30}}
        />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <Title2 TxtTitle="T E S T I N G   &   D E L I V E R Y" />
      {error ? (
        <Text style={{ color: 'red', fontSize: 13, textAlign: 'center', marginBottom: 10, marginTop: -20, }}>
          {error}
        </Text>
      ) : null}
      <View>
        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
          <View>
            <Text style={styles.left}>Project Name </Text>
            <Text style={styles.left}>Customer </Text>
            <Text style={styles.left}>Number SO </Text>
            <Text style={styles.left}>Stages </Text>
            <Text style={styles.left}>Date </Text>
          </View>
          <View>
            <TextInput
              style={styles.right}
              onChangeText={value => handleOnchangeText(value, 'projectName')}
              value={projectName}
            />
            <Text style={styles.right}>{customer}</Text>
            <Text style={styles.right}>{projectId}</Text>
            <View style={{width: 250}}>
              <StagesFinish 
                onValueChange={(value) => {
                  console.log('stageSelec?', value)
                  handleOnchangeText(value, 'stages')
                }}
              />
              {/* <StagesFinish
                onValueChange={(value) => {
                  console.log('selected-- ', value);
                  handleOnchangeText(value, 'stages')}
                }
              /> */}
            </View>
            <Text style={styles.txtInput} onChangeText={onDateChange}>
              <PickedDateFull onChangeText={onDateChange} />
            </Text>
          </View>
        </View>
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
                key={item.id}
                onPress={() => {
                  handleOnchangeText(item.projectName, 'projectName');
                }}>
                <Text style={styles.sugesstion}>{item.projectName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
      <ScrollView style={{marginTop: 5}}>
        {isLoading ? (
          <View style={{marginTop: 30}}>
            <ActivityIndicator color={BiruKu} />
          </View>
        ) : (
          <View>
            <View style={styles.wrappPanelTitle}>
              <Text style={{ fontFamily: 'Poppins-Medium', color: BiruKu, fontSize: 13, }}>
                Panel Name
              </Text>
            </View>
            {finishingInfo.Panels.filter(item => !item.stageExist).map(
              item => (
                <Panel
                  key={item.id}
                  pname={item.pnameInput}
                  value={item.selected}
                  onValueChange={value =>
                    setFinishingInfo(prev => ({
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
              ),
            )}
            <AllPanelsExistMessage />
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={submitForm}>
        <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'Poppins-Bold', fontSize: 16, }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormFinishing;

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
    height: 33,
    padding: -10,
    marginVertical: 4,
    fontSize: 13,
    marginLeft: 5,
    width: 250,
  },
  dropdownSugesstion: {
    position: 'absolute',
    left: 118,
    right: 26,
    borderWidth: 1,
    borderColor: BiruKu,
    borderTopColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#E8E8E8',
    top: 30,
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
    fontSize: 12,
    color: BiruKu,
    marginVertical: 2,
    marginHorizontal: 2,
    paddingTop: 4,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 310,
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
    marginLeft: 20,
    marginBottom: 5,
    paddingRight: 20,
    paddingLeft: -20,
  },
  left: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    marginBottom: 3,
    paddingVertical: 6.5,
    color: BiruKu,
  },
  right: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
    height: 33,
    width: 250,
    padding: 7,
    color: BiruKu,
  },
  unvailable: {
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    textAlign: 'center',
    color: BiruKu,
    marginHorizontal: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: BiruKu,
  },
});