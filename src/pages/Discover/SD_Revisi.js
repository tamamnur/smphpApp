import React, {useState, useEffect} from 'react';
import { View, ScrollView, Dimensions, ToastAndroid, } from 'react-native';
import Title2 from '../../components/Title2';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';
import EndOf from '../../components/Footer';
import PanelHeadTable from '../../components/panelHeadTable';
import LoadingComponent from '../../components/LoadingComponent'
import DataNotFound from '../../components/dataNotFound';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';

const height = Dimensions.get('window').height;
const SD_Revision = () => {
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
              projectName: doc.projectName, panelName: panel.pnameInput,
            });
            const getId = panel.MonitoringID;
            if (getId) {
              const idRef = firestore().collection('Monitoring');
              const id = getId.substring(12);
              const shopdrawingRef = idRef.doc(id).collection('Shopdrawing').doc('Revision');
              const drawingDoc = await shopdrawingRef.get();
              if (drawingDoc.exists) {
                const drawingData = drawingDoc.data();
                if (drawingData.DateRevisi) {
                  const dateValue = drawingData.DateRevisi;
                  panelNameData.push({
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                    DateUpdate: dateValue.toDate(),
                    idProject: doc.id,
                    monitoringId: getId,
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
        ToastAndroid.show('Error Fetching Data '+ error, ToastAndroid.LONG)
        if (isMounted) {setIsLoading(false)}
      }
    };
    getProject();
    return () => {isMounted = false}
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

  const renderedPanelList = filteredPanelData
    .filter(item => item.DateUpdate)
    .sort((a, b) => new Date(b.DateUpdate) - new Date(a.DateUpdate))
    .map((item, index) => {
      return (
        <PanelProjectList
          key={index+1}
          projectName={item.projectName}
          panelName={item.panelName}
          status={FormatDate(item.DateUpdate)}
          idProject={item.idProject}
          monitoringId={item.monitoringId}
        />
        )
    });
      
  const contenToRender = renderedPanelList.length > 0 ? renderedPanelList : <DataNotFound/>;

  return (
    <View>
      <Header/><Title2 TxtTitle="SHOPDRAWING" SubTitle="REVISION" />
      {isLoading ? (<></>) : (<>
        <SearchBar value={searchKeyword} onChangeText={text => setSearchKeyword(text)}/>
        <PanelHeadTable/>
      </>)}
      <ScrollView
        style={{ marginHorizontal: 8, marginBottom: 110, height: height*0.65, }}>
        <View>
          {isLoading ? (<LoadingComponent />) 
          : (<>{contenToRender}<EndOf/></>)}
        </View>
      </ScrollView>
    </View>
  );
};

export default SD_Revision;