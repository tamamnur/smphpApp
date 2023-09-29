import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, } from 'react-native';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';
import EndOf from '../../components/Footer';
import PanelHeadTable from '../../components/panelHeadTable';
import LoadingComponent from '../../components/LoadingComponent'

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
          // console.log('projectName? ', docIdRef.projectName)
          projectNameData.push(docIdRef.projectName);
        });
        const panelNameData = [];
        for (const doc of idDoc) {
          const projectRef = firestore()
            .collection('Project')
            .doc(doc.id)
            .collection('PanelName');
          const panelIdRef = await projectRef.get();
          const panelIdData = panelIdRef.docs.map(panelIdDoc => ({
            panelId: panelIdDoc.id,
            ...panelIdDoc.data(),
            projectName: doc.projectName,
          }));
          const fetchDatePromises = panelIdData.map(async panel => {
            // console.log('panelId', panel.panelId, 'panelName', panel.pnameInput, 'monitoringID- ', panel.MonitoringID)
            panelNameData.push({
              projectName: doc.projectName,
              panelName: panel.pnameInput,
            });
            const getId = panel.MonitoringID;
            // console.log('MonitoringID-',getId)
            if (getId) {
              const idRef = firestore().collection('Monitoring');
              const id = getId.substring(12);
              // console.log('id?',id)
              const shopdrawingRef = idRef
                .doc(id)
                .collection('Shopdrawing')
                .doc('Submission');
              const submissionDoc = await shopdrawingRef.get();
              if (submissionDoc.exists) {
                const submissionData = submissionDoc.data();
                if (submissionData.DateSubmit) {
                  const dateSubmissionValue = submissionData.DateSubmit;
                  const dateSubmit = FormatDate(dateSubmissionValue.toDate());
                  panelNameData.push({
                    DateSubmit: dateSubmit,
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                  });
                  // console.log('panel: ',panel.pnameInput,'date: ',dateSubmit)
                }
                // } else {
                // console.log('Doc not found');
              }
              // } else {
              // console.log( 'Panel', panel.pnameInput, 'tidak memiliki dokumen monitoring');
            }
          });
          await Promise.all(fetchDatePromises);
        }
        panelNameData.sort((a, b) => {
          const dateA = new Date(a.DateSubmit);
          const dateB = new Date(b.DateSubmit);
          return dateB - dateA;
        });
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
    .sort((a, b) => new Date(b.DateSubmit) - new Date(a.DateSubmit))
    .map((item, index) => (
      <PanelProjectList
        key={index}
        projectName={item.projectName}
        panelName={item.panelName}
        status={item.DateSubmit}
      />
    ));

  const dataNotFound = (
    <Text style={styles.dataNotFound}>No matching result found.</Text>
  );

  const contenToRender =
    renderedPanelList.length > 0 ? renderedPanelList : dataNotFound;

  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
        <IconBack onPress={() => navigation.navigate('Discover')} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Title2 TxtTitle="SHOPDRAWING" SubTitle="SUBMISSION" />
      {isLoading ? ( <></>
      ) : (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by project or panel name....."
            value={searchKeyword}
            onChangeText={text => setSearchKeyword(text)}
          />
          <PanelHeadTable />
        </>
      )}
      <ScrollView
        style={{ marginHorizontal: 8, marginBottom: 110, height: height*0.65, }}>
        <View>
          {isLoading ? (
            <LoadingComponent />
          ) : (
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

export default SD_Submission;

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 6,
    backgroundColor: '#F7F7F8',
    paddingHorizontal: 8,
    paddingVertical: 1,
    marginHorizontal: 15,
    marginBottom: 5,
    height: 35,
    color: BiruKu,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  dataNotFound: {
    fontFamily: 'Poppins-Italic',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: BiruKu,
  },
});