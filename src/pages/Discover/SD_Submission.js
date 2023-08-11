import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput, } from 'react-native';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';

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

  const filteredPanelData = panelNameData.filter((item) => {
    const projectNameLower = item.projectName.toLowerCase();
    const panelNameLower = item.panelName.toLowerCase();
    const searchKeywordLower = searchKeyword.toLowerCase();
    return (
      projectNameLower.includes(searchKeywordLower) ||
      panelNameLower.includes(searchKeywordLower)
    )
  })

  const renderedPanelList = filteredPanelData.filter(item => item.DateSubmit)
    .sort((a,b) => new Date(b.DateSubmit) - new Date(a.DateSubmit))
    .map((item, index) => (
      <PanelProjectList
        key={index}
        projectName={item.projectName}
        panelName={item.panelName}
        status={item.DateSubmit}
      />
    ))
  
  const dataNotFound = (<Text style={styles.dataNotFound}>No matching result found.</Text>)

  const contenToRender = renderedPanelList.length > 0 ? renderedPanelList: dataNotFound;

  return (  
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
        <IconBack onPress={() => navigation.navigate('Discover')} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Title2 TxtTitle="SHOPDRAWING" SubTitle="SUBMISSION" />
      {isLoading ? (
        <Text></Text>
      ) : (
        <>
        <TextInput 
          style={styles.searchInput}
          placeholder='Search by project or panel name.....'
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}          
        />
        <View style={styles.wrappHead}>
          <Text style={styles.headProjectName}>Project Name</Text>
          <Text style={styles.headPanelName}>Panel Name</Text>
          <Text style={styles.headUpdate}>Update</Text>
        </View>
        </>
      )}
      <ScrollView style={{marginHorizontal: 8, marginBottom: 110, height: 550}}>
        <View style={{marginBottom: 10, borderColor: BiruKu, borderBottomWidth: 1}}>
          {isLoading ? (
            <View style={{marginTop: 20, marginBottom: 100}}>
              <ActivityIndicator size="large" color={BiruKu} />
            </View>
          ) : (
            // filteredPanelData
            // .filter(item => item.DateSubmit)
            // .sort((a,b) => new Date(b.DateSubmit) - new Date(a.DateSubmit))
            // .map((item, index) =>
            //   item.DateSubmit ? (
            //     <PanelProjectList
            //       key={index}
            //       projectName={item.projectName}
            //       panelName={item.panelName}
            //       status={item.DateSubmit}
            //       // status={index + 1}
            //     />
            //   ) : null,
            // )
            contenToRender
          )}
          <View><Text style={styles.endOfPage}>End of Page</Text></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SD_Submission;

const styles = StyleSheet.create({
  wrappHead: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 2,
    borderColor: BiruKu,
    borderBottomWidth: 2,
  },
  headProjectName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: 142,
  },
  headPanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: 140,
  },
  headUpdate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: 79,
  },
  endOfPage:{
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    color: BiruKu,
    textAlign: 'center',
    marginTop: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 6,
    backgroundColor: '#F7F7F8',
    paddingHorizontal: 8,
    paddingVertical: 1,
    marginHorizontal: 16,
    marginBottom: 5,
    height: 35,
    color: BiruKu,
    fontFamily: 'Poppins-Medium',
    fontSize: 13
  },
  dataNotFound: {
    fontFamily: 'Poppins-Italic',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: BiruKu,
  }
});