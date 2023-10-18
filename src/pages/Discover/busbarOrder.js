import React, {useState, useEffect} from 'react';
import { View, ScrollView, Dimensions, } from 'react-native';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';
import DataNotFound from '../../components/dataNotFound';
import PanelHeadTable from '../../components/panelHeadTable';
import LoadingComponent from '../../components/LoadingComponent';
import EndOf from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';

const height = Dimensions.get('window').height;
const BusbarOrder = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [panelNameData, setPanelNameData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    let isMounted = true;
    const getProject = async () => {
      try {
        const projectNameData = [];
        const idRef = await firestore().collection('Project').get();
        const idDoc = idRef.docs.map(doc => ({id: doc.id, ...doc.data()}));
        idDoc.forEach(docIdRef => {
          projectNameData.push(docIdRef.projectName);
        });
        const panelNameData = [];
        for (const doc of idDoc) {
          const projectRef = firestore().collection('Project').doc(doc.id)
            .collection('PanelName');
          const panelIdRef = await projectRef.get();
          const panelIdData = panelIdRef.docs.map(panelIdDoc => ({
            panelId: panelIdDoc.id,
            ...panelIdDoc.data(),
            projectName: doc.projectName,
          }));
          const fetchDatePromises = panelIdData.map(async panel => {
            panelNameData.push({
              projectName: doc.projectName,
              panelName: panel.pnameInput,
            });
            const getId = panel.MonitoringID;
            if (getId) {
              const idRef = firestore().collection('Monitoring');
              const id = getId.substring(12);
              const monitoringRef = idRef.doc(id)
                .collection('Procurement').doc('Busbar');
              const monitoringDoc = await monitoringRef.get();
              if (monitoringDoc.exists) {
                const monitoringData = monitoringDoc.data();
                if (monitoringData.Order) {
                  const dateValue = monitoringData.Order;
                  const dateMonitoring = FormatDate(dateValue.toDate());
                  panelNameData.push({
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                    DateMonitoring: dateMonitoring,
                  });
                }
              }
            }
          });
          await Promise.all(fetchDatePromises);
        } if (isMounted) {
          setPanelNameData(panelNameData);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('ERROR Fetching Data', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    getProject();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPanelData = panelNameData.filter(item => {
    const projectNameLower = item.projectName.toLowerCase();
    const panelNameLower = item.panelName.toLowerCase();
    const searchKeywordLower = searchKeyword.toLowerCase();
    return (
      projectNameLower.includes(searchKeywordLower) ||
      panelNameLower.includes(searchKeywordLower)
    );
  });

  const renderedPanelList = filteredPanelData.filter(item => item.DateMonitoring)
  .sort((a, b) => new Date(b.DateMonitoring) - new Date(a.DateMonitoring))
  .map((item, index) => (
    <PanelProjectList
      key={index + 1}
      projectName={item.projectName}
      panelName={item.panelName}
      status={item.DateMonitoring}
    />
  ))
  
  const contenToRender = renderedPanelList.length > 0 ? renderedPanelList : <DataNotFound />

  return (
    <View>
      <Header/>
      <Title2 TxtTitle="PURCHASE ORDER" SubTitle="BUSBAR Cu" />
      {isLoading ? (<></>) : (<>
          <SearchBar value={searchKeyword} onChangeText={text => setSearchKeyword(text)} />
          <PanelHeadTable />
      </>)}
      <ScrollView style={{marginHorizontal: 8, height: height*0.65}}> 
        <View>
          {isLoading ? ( <LoadingComponent /> ) : (
            <>
            {contenToRender} 
            <EndOf /> 
            </> 
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BusbarOrder;