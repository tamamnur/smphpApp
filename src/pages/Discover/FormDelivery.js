import {View,Text,TextInput,StyleSheet,TouchableOpacity,ToastAndroid,ScrollView,} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import Title from '../../components/Title';
import firestore from '@react-native-firebase/firestore';
import PickedDateFull from '../../components/pickedDateFull';
import CheckBox from '@react-native-community/checkbox';

const isValidObjField = obj => {
  return Object.values(obj).every(value => {
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
  }, 1000);
};

const FormDelivery = props => {
  const navigation = useNavigation();
  const [date, setDate] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [ProjectList, setProjectList] = useState([]);
  const [panelSelected, setPanelSelected] = useState(false);
  const onDateChange = value => {
    setDate(value);
  };
  const [deliveryInfo, setDeliveryInfo] = useState({
    projectId: '',
    FSProjectId: '',
    projectName: '',
    customer: '',
    projectsList: [],
    Panels: [],
  });

  const [error, setError] = useState('');
  const {projectId, projectName, stages, stagesFABDetail, customer} =
    deliveryInfo;
  const handleOnchangeText = (value, fieldName) => {
    setDeliveryInfo({...deliveryInfo, [fieldName]: value});
  };
  const isValidForm = () => {
    // if (!isValidObjField(deliveryInfo))
    //   return updateError('Required all fields!', setError);
    if (!projectName.trim() || projectName.length === 0)
      return updateError('Invalid name of project', setError);
    if (!date === 0)
      return updateError('Required to choice Date of Proccess!', setError);
    // if (value.selected === null )
    //   return updateError('Panel Has Not Been Selected')
    return true;
  };
  const submitForm = () => {
    if (isValidForm()) {
      handleFormdelivery();
    } else {
      error;
    }
  };

  const handleFormdelivery = async () => {
    console.log(deliveryInfo);
    deliveryInfo.Panels.forEach(async value => {
      if (value.selected === true) {
        let MonitoringID = null;
        if (value.MonitoringID) {
          MonitoringID = value.MonitoringID.split('/')[2];
        } else {
          const newMonitoring = await firestore()
            .collection('Monitoring')
            .add({
              ProjectID: '/Project/' + deliveryInfo.FSProjectId,
            });
          MonitoringID = newMonitoring.id;
        }
        const Delivery = firestore()
          .collection('Monitoring')
          .doc(MonitoringID)
          .collection('Sent');
          Delivery.doc('Sent').set({
            sent: firestore.Timestamp.fromDate(date)
          });

        await firestore()
          .collection('Project')
          .doc(deliveryInfo.FSProjectId)
          .collection('PanelName')
          .doc(value.id)
          .set({
            pnameInput: value.pnameInput,
            MonitoringID: '/Monitoring/' + MonitoringID,
          });
        setDeliveryInfo(prev => ({
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
      }
    });
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
        setDeliveryInfo(prev => ({
          ...prev,
          projectId: MatchProject.projectId,
          FSProjectId: MatchProject.id,
          customer: MatchProject.customer,
          Panels: MatchProject.Panels,
        }));
      } else {
        setDeliveryInfo(prev => ({
          ...prev,
          projectId: '',
          Panels: [],
          customer: '',
        }));
      }
    }
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
      <Title TxtTitle="D E L I V E R Y   P A N E L S" />
      {error ? (
        <Text style={{color: 'red',fontSize: 13,textAlign: 'center',marginBottom: 10,marginTop: -20}}>
          {error}
        </Text>
      ) : null}
      <View>
        <View style={styles.container}>
          <View>
            <Text style={styles.left}>Project Name </Text>
            <Text style={styles.left}>Customer </Text>
            <Text style={styles.left}>Number SO </Text>
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
        <View style={styles.wrappPanelTitle}>
          <Text style={{fontFamily: 'Poppins-Medium', color: BiruKu}}>
            Panel Name
          </Text>
        </View>
        {deliveryInfo.Panels.map(item => (
          <Panel
            pname={item.pnameInput}
            value={item.selected}
            onValueChange={value =>
              setDeliveryInfo(prev => ({
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

export default FormDelivery;

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
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  txtInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,
    height: 33,
    padding: -10,
    marginVertical: 4,
    fontSize: 30,
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
    marginHorizontal: 20,
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
});