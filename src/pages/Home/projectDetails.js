import {Text, View, ScrollView, Dimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {EditButton} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import FormatDate from '../../components/FormatDate';
import LoadingComponent from '../../components/LoadingComponent';
import EndOf from '../../components/Footer';
import InfoProject from '../../components/InfoProject';
import Header from '../../components/HeaderToHome';
import Title2 from '../../components/Title2';
import PanelListOnDetail from '../../components/panelListOnDetail';
const {height} = Dimensions.get('window');

const ProjectDetails = props => {
  const navigation = useNavigation();
  const [division, setDivision] = useState(false)
  const isMountedRef = useRef(true);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser
    const unsubscribe = firestore().collection('User').doc(currentUser.uid).onSnapshot(doc => {
      if (isMountedRef.current) {
        const user = doc.data()
        const isRight = user.division === 'Marketing' || user.division === 'Admin'
        setDivision(isRight)
      }
    })
    return() => {unsubscribe()}
  },[])
  const [projectInfo, setProjectInfo] = useState({
    ProjectName: '',
    ProjectId: '',
    Customer: '',
    NumberPO: '',
    DatePO: null,
  });
  const [ListPanel, setListPanel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const id = props.route.params.id;
    const projectUnsubscribe = firestore().collection('Project')
      .doc(id).onSnapshot(async doc => {
        const FirebaseDate = doc.data().datePO ? doc.data().datePO.toDate(): null;
        const getDatePO = FirebaseDate ? FormatDate(FirebaseDate) : ' -';
        const FBNumberPO = doc.data().numberPO ? doc.data().numberPO : null;
        const getNumberPO = FBNumberPO ? FBNumberPO : ' -';
        setProjectInfo({
          ProjectName: doc.data().projectName,
          ProjectId: doc.data().projectId,
          Customer: doc.data().customer,
          NumberPO: getNumberPO,
          DatePO: getDatePO,
        }),
          setIsLoading(false);
      });
    const panelUnsubscribe = firestore().collection('Project')
      .doc(id).collection('PanelName').onSnapshot(async snapshot => {
        const PanelNames = snapshot.docs.map(item => ({
          id: item.id, ...item.data(),
        }));
        const sortedPanelNames = PanelNames.sort((a, b) => {
          return a.id - b.id;
        });
        setListPanel(sortedPanelNames);
      });
    return () => {
      projectUnsubscribe();
      panelUnsubscribe();
    };
  }, [props.route.params.id]);

  return (
    <View style={{flex: 1, height: height * 0.85}}>
      <Header /> 
      {isLoading ? (<LoadingComponent />) : (
      <View>
        <Title2 TxtTitle={projectInfo.ProjectName} SubTitle={'Project Details'} />
        {division && (
          <View style={{marginVertical: 2, marginRight: 25, alignItems: 'flex-end' }}>
            <EditButton onPress={() => navigation.navigate('ProjectDetailsEdit', 
                  {id: props.route.params.id})} />
          </View>
        )}
        <InfoProject label={'Number SO'} value={projectInfo.ProjectId} />
        <InfoProject label={'Customer'} value={projectInfo.Customer} />
        <InfoProject label={'Number PO'} value={projectInfo.NumberPO} />
        <InfoProject label={'Date PO'} value={projectInfo.DatePO} />
        <View style={{marginTop: 15, marginLeft: 20}}>
          <Text style={{fontFamily:'Poppins-Medium', fontSize: 15, color: BiruKu}}>
            Panel Name's :</Text></View>
        {division && (
          <View style={{marginTop: -27, marginBottom: 5, marginRight: 30, alignItems: 'flex-end'}}>
            <EditButton onPress={() => navigation.navigate('PanelNameInputEdit',
                  {id: props.route.params.id})} />
          </View>
        )}
        <ScrollView style={{marginBottom: 50, height: '55%'}}>
          {ListPanel.map((item, index) => {
            return (<PanelListOnDetail key={item.id}
              pnomor={index+1}
              pname={item.pnameInput}
              monitoringId={item.MonitoringID}
              projectName={projectInfo.ProjectName}
              />);
          })}
          <EndOf />
        </ScrollView>
      </View>
      )}
    </View>
  );
};

export default ProjectDetails;