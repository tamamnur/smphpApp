import React, {useState, useEffect} from 'react';
import { View, ScrollView, Dimensions, ToastAndroid} from 'react-native';
import Title2 from '../../components/Title2';
import firestore from '@react-native-firebase/firestore';
import FormatDate from '../../components/FormatDate2';
import DataNotFound from '../../components/dataNotFound';
import { HeadPO } from '../../components/panelHeadTable';
import LoadingComponent from '../../components/LoadingComponent';
import EndOf from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import PanelPOList from '../../components/panelPOList';

const TableBusbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [panelNameData, setPanelNameData] = useState([]);
  
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
          const projectRef = firestore().collection('Project').doc(doc.id).collection('PanelName');
          const panelIdRef = await projectRef.get();
          const panelIdData = panelIdRef.docs.map(panelIdDoc => ({
            panelId: panelIdDoc.id, ...panelIdDoc.data(),
            projectName: doc.projectName,
          }));
          const fetchDatePromises = panelIdData.map(async panel => {
            panelNameData.push({
              projectName: doc.projectName, panelName: panel.pnameInput});
            const getId = panel.MonitoringID;
            if (getId) {
              const idRef = firestore().collection('Monitoring');
              const id = getId.substring(12);
              const monitoringRef = idRef.doc(id).collection('Procurement').doc('Busbar');
              const monitoringDoc = await monitoringRef.get();
              if (monitoringDoc.exists) {
                const monitoringData = monitoringDoc.data();
                if (monitoringData.Order) {
                  const dateValue = monitoringData.Order;
                  const schedule = monitoringData.Schedule? monitoringData.Schedule : '';
                  const realized = monitoringData.Realized? monitoringData.Realized : '';
                  panelNameData.push({
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                    order: dateValue.toDate(),
                    schedule: schedule? schedule.toDate() : '',
                    realized: realized? realized.toDate() : '',
                    idProject: doc.id, monitoringId: getId
                  });
                }
              }
            }
          });
          await Promise.all(fetchDatePromises);
        }
        if (isMounted) {
          setPanelNameData(panelNameData);
          setIsLoading(false);
        }
      } catch (error) {
        ToastAndroid.show('Error Fetching Data '+error, ToastAndroid.LONG);
        if (isMounted) {setIsLoading(false)}
      }
    };
    getProject();
    return () => {isMounted = false};
  }, []);

  const [searchKeyword, setSearchKeyword] = useState('');
  const filteredPanelData = panelNameData.filter(item => {
    const projectNameLower = item.projectName.toLowerCase();
    const panelNameLower = item.panelName.toLowerCase();
    const searchKeywordLower = searchKeyword.toLowerCase();
    return (
      projectNameLower.includes(searchKeywordLower) ||
      panelNameLower.includes(searchKeywordLower)
    );
  });

  const renderedPanelList = filteredPanelData.filter(item => item.order)
    .sort((a, b) => new Date(b.order) - new Date(a.order))
    .map((item, index) => {
      return(
        <PanelPOList
          key={index + 1}
          projectName={item.projectName}
          panelName={item.panelName}
          order={FormatDate(item.order)}
          schedule={item.schedule ? FormatDate(item.schedule):'--'}
          realized={item.realized ? FormatDate(item.realized):'--'}
          idProject={item.idProject}
          monitoringId={item.monitoringId}
        />
      )
    });
    
  const contenToRender = renderedPanelList.length > 0 ? renderedPanelList : <DataNotFound/>;
  
  const height = Dimensions.get('window').height;
  return (
    <View style={{marginVertical: 10}}>
      <Header/><Title2 TxtTitle="BUSBAR Cu" SubTitle="Monitoring" />
      {isLoading ? (<></>) : (<>
        <SearchBar value={searchKeyword} onChangeText={text => setSearchKeyword(text)} />
          {HeadPO()}     
      </>)}
      <ScrollView style={{marginHorizontal: 8, height:height*0.65}}>
        {isLoading ? (<LoadingComponent />) : (<>{contenToRender}<EndOf /></>)}
      </ScrollView>
    </View>
  );
};

export default TableBusbar;