import React, {useState, useEffect} from 'react';
import { View, ScrollView, Dimensions, } from 'react-native';
import Title2 from '../../components/Title2';
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
const MechanicStart = () => {
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
          const projectRef = firestore().collection('Project')
            .doc(doc.id).collection('PanelName');
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
              const monitoringRef = idRef.doc(id)
                .collection('Fabrication').doc('Mech');
              const monitoringDoc = await monitoringRef.get();
              if (monitoringDoc.exists) {
                const monitoringData = monitoringDoc.data();
                if (monitoringData.Start) {
                  const dateValue = monitoringData.Start;
                  panelNameData.push({
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                    DateUpdate: dateValue.toDate(),
                    idProject: doc.id
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
        alert('Error Fetching Data ', error)
        console.error('Error Fetching Data ', error);
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

  const renderedPanelList = filteredPanelData.filter(item => item.DateUpdate)
    .sort((a, b) => new Date(b.DateUpdate) - new Date(a.DateUpdate))
    .map((item, index) => {
      return(
        <PanelProjectList
        key={index + 1}
        projectName={item.projectName}
        panelName={item.panelName}
        status={FormatDate(item.DateUpdate)}
        idProject={item.idProject}/>
        )
      });

  const contenToRender =
    renderedPanelList.length > 0 ? renderedPanelList : <DataNotFound />;

  return (
    <View style={{marginVertical: 10}}>
      <Header/>
      <Title2 TxtTitle="WORK FINISHED" SubTitle="MECHANIC" />
      {isLoading ? (<></>) : (<>
        <SearchBar value={searchKeyword} 
           onChangeText={text => setSearchKeyword(text)} />
        <PanelHeadTable />
      </>)}
      <ScrollView style={{marginHorizontal: 8, height:height*0.65}}>
        {isLoading ? (<LoadingComponent />) : (<>{contenToRender}<EndOf /></>)}
      </ScrollView>
    </View>
  );
};

export default MechanicStart;