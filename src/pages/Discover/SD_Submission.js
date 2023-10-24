import React, {useState, useEffect} from 'react';
import { View, ScrollView, Dimensions, } from 'react-native';
import Title2 from '../../components/Title2';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate2';
import EndOf from '../../components/Footer';
import PanelHeadTable from '../../components/panelHeadTable';
import LoadingComponent from '../../components/LoadingComponent';
import DataNotFound from '../../components/dataNotFound';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/HeaderToDiscover';

const height = Dimensions.get('window').height;
console.log(height)
const SD_Submission = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [panelNameData, setPanelNameData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    
    const monitoringRef = firestore().collection('Monitoring')
    const unsubscribe = monitoringRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'modified') {
          const docData = change.doc.data()
          if (docData.DateSubmit) {
            const dateSubmissionValue = docData.DateSubmit
            console.log('date change..', dateSubmissionValue.toDate())
          }
        }
      })
    })
    const getProject = async () => {
      try {
        const projectNameData = [];
        const idRef = firestore().collection('Project')
        idRef.onSnapshot(async (snapshot) => {
          const idDoc = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }))
          projectNameData.length = 0,
          // idDoc.forEach
          idDoc.forEach(docIdRef => {
            projectNameData.push(docIdRef.projectName);
          });
          const panelNameData = [];
          let promises = []
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
                projectName: doc.projectName,
                panelName: panel.pnameInput,
              });
              const getId = panel.MonitoringID;
              if (getId) {
                const idRef = firestore().collection('Monitoring');
                const id = getId.substring(12);
                const shopdrawingRef = idRef.doc(id)
                  .collection('Shopdrawing').doc('Submission');
                const submissionDoc = await shopdrawingRef.get();
                if (submissionDoc.exists) {
                  const submissionData = submissionDoc.data();
                  if (submissionData.DateSubmit) {
                    const dateSubmissionValue = submissionData.DateSubmit;
                    // console.log('submit-? ',dateSubmissionValue)
                    panelNameData.push({
                      projectName: panel.projectName,
                      panelName: panel.pnameInput,
                      DateSubmit: dateSubmissionValue.toDate(),
                    });
                  }
                }
              }
            });
              promises = promises.concat(fetchDatePromises)
          }
          await Promise.all(promises);
          // }
          if (isMounted) {
            setPanelNameData(panelNameData);
            setIsLoading(false);
          }
        })
      } catch (error) {
        console.error('Error Fetching Data ', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    getProject();
    return () => {
      unsubscribe();
      isMounted = false};
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
    .filter(item => item.DateSubmit)
    .sort((a, b) => new Date(b.DateSubmit) - new Date(a.DateSubmit))
    .map((item, index) => {
      // console.log('data filtered ', FormatDate(item.DateSubmit))
      return(
        <PanelProjectList
        key={index + 1}
        projectName={item.projectName}
        panelName={item.panelName}
        status={FormatDate(item.DateSubmit)}
        />
        )
      });
      console.log('length.. ', renderedPanelList.length)

  const contenToRender =
    renderedPanelList.length > 0 ? renderedPanelList : <DataNotFound />;

  return (
    <View style={{marginVertical: 10, height: height}}>
      <Header/>
      <Title2 TxtTitle="SHOPDRAWING" SubTitle="SUBMISSION" />
      {isLoading ? (<></>) : (<>
        <SearchBar value={searchKeyword} 
           onChangeText={text => setSearchKeyword(text)} />
        <PanelHeadTable />
      </>)}
      <ScrollView style={{marginHorizontal: 8, marginBottom: 30}}>
        <View>
          {isLoading ? (<LoadingComponent />) 
          : (<>{contenToRender}<EndOf /></>)}
        </View>
      </ScrollView>
    </View>
  );
};

export default SD_Submission;