import React, {useState, useEffect} from 'react';
import { View, ScrollView, Dimensions, } from 'react-native';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';
import EndOf from '../../components/Footer';
import PanelHeadTable from '../../components/panelHeadTable';
import LoadingComponent from '../../components/LoadingComponent';
import DataNotFound from '../../components/dataNotFound';
import SearchBar from '../../components/SearchBar';

const height = Dimensions.get('window').height;
const SD_Submission = () => {
  const navigation = useNavigation();
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
              const shopdrawingRef = idRef.doc(id)
                .collection('Shopdrawing').doc('Submission');
              const submissionDoc = await shopdrawingRef.get();
              if (submissionDoc.exists) {
                const submissionData = submissionDoc.data();
                if (submissionData.DateSubmit) {
                  const dateSubmissionValue = submissionData.DateSubmit;
                  const dateSubmit = FormatDate(dateSubmissionValue.toDate());
                  panelNameData.push({
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                    DateSubmit: dateSubmit,
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
        console.error('Error Fetching Data ', error);
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
    .sort((a, b) => new Date(a.DateSubmit) - new Date(b.DateSubmit))
    .map((item, index) => (
      <PanelProjectList
        key={index + 1}
        projectName={item.projectName}
        panelName={item.panelName}
        status={item.DateSubmit}
      />
    ));

  const contenToRender =
    renderedPanelList.length > 0 ? renderedPanelList : <DataNotFound />;

  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
        <IconBack onPress={() => navigation.navigate('Discover')} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Title2 TxtTitle="SHOPDRAWING" SubTitle="SUBMISSION" />
      {isLoading ? (<></>) :
      (<>
        <SearchBar value={searchKeyword}
          onChangeText={text => setSearchKeyword(text)} />
        <PanelHeadTable />
      </>)}
      <ScrollView style={{marginHorizontal: 8, height:height*0.65}}>
        <View>
          {isLoading ? (<LoadingComponent />) : 
          (<>
            {contenToRender} 
            <EndOf />
          </>)}
        </View>
      </ScrollView>
    </View>
  );
};

export default SD_Submission;