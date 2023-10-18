import {Text, StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {EditButton} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import FormatDate from '../../components/FormatDate';
import LoadingComponent from '../../components/LoadingComponent';
import EndOf from '../../components/Footer';
import InfoProject from '../../components/InfoProject';
import Header from '../../components/Header';
import Title2 from '../../components/Title2';
import PanelListOnDetail from '../../components/panelListOnDetail';
const {height} = Dimensions.get('window');

const ProjectDetails = props => {
  const navigation = useNavigation();
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
        const getDatePO = FirebaseDate ? FormatDate(FirebaseDate) : ' ---';
        setProjectInfo({
          ProjectName: doc.data().projectName,
          ProjectId: doc.data().projectId,
          Customer: doc.data().customer,
          NumberPO: doc.data().numberPO,
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
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <View>
          <Title2 TxtTitle={projectInfo.ProjectName} SubTitle={'Project Details'} />
          <View style={{marginVertical: 2, marginHorizontal: 35, alignItems: 'flex-end' }}>
            <EditButton onPress={() => navigation.navigate('ProjectDetailsEdit', 
                  {id: props.route.params.id})} />
          </View>
          <InfoProject label={'Number SO'} value={projectInfo.ProjectId} />
          <InfoProject label={'Customer'} value={projectInfo.Customer} />
          <InfoProject label={'Number PO'} value={projectInfo.NumberPO} />
          <InfoProject label={'Date PO'} value={projectInfo.DatePO} />
          <View>
            <Text style={styles.pnameTitle}>Panel Name's :</Text>
          </View>
          <View style={styles.panelWrapp}>
            <EditButton onPress={() => navigation.navigate('PanelNameInputEdit',
                 {id: props.route.params.id})} />
          </View>
          <ScrollView style={{marginBottom: 50, height: '55%'}}>
            {ListPanel.map(item => {
              return (
                <PanelListOnDetail
                  key={item.id}
                  pnomor={item.id}
                  pname={item.pnameInput}
                />
              );
            })}
            <EndOf />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProjectDetails;

const styles = StyleSheet.create({
  pnameTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginTop: 14,
    marginHorizontal: 20,
    color: BiruKu,
  },
  panelWrapp: {
    marginTop: -20,
    marginBottom: 5,
    marginHorizontal: 30,
    alignItems: 'flex-end',
  }
});