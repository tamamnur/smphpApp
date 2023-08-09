import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';
// import { SearchBar } from 'react-native-screens';

const ComponentOrder = () => {
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
            if (getId) {
              const idRef = firestore().collection('Monitoring');
              const docRef = await idRef.get();
              const id = getId.substring(12);
              // console.log('id?',id)
              const shopdrawingRef = idRef
                .doc(id)
                .collection('Procurement')
                .doc('Construction');
              const submissionDoc = await shopdrawingRef.get();
              if (submissionDoc.exists) {
                const submissionData = submissionDoc.data();
                if (submissionData.Order) {
                  const dateSubmissionValue = submissionData.Order;
                  const dateSubmit = FormatDate(dateSubmissionValue.toDate());
                  panelNameData.push({
                    DateSubmit: dateSubmit,
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                  });
                  // console.log('panel: ',panel.pnameInput,'date: ',dateSubmit)
                }
              } else {
                // console.log('Doc not found');
              }
            } else {
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

  const filteredPanelData = panelNameData.filter((item) => {
    console.log(item)
    const projectNameLower = item.projectName.toLowerCase();
    const panelNameLower = item.panelName.toLowerCase();
    const searchKeywordLower = searchKeyword.toLowerCase();
    return (
      projectNameLower.includes(searchKeywordLower) || panelNameLower.includes(searchKeywordLower)
    )
  }) 
  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
        <IconBack onPress={() => navigation.navigate('Discover')} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Title2 TxtTitle="ORDER" SubTitle="CONSTRUCTION / BOX" />
      <TextInput 
        style={styles.searchInput}
        placeholder='Search by project or panel name'
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />
      {/* <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/> */}
      <View style={styles.wrappHead}>
        <Text style={styles.headProjectName}>Project Name</Text>
        <Text style={styles.headPanelName}>Panel Name</Text>
        <Text style={styles.headUpdate}>Update</Text>
      </View>
      <ScrollView style={{marginHorizontal: 8, marginBottom: 110, height: 550}}>
        <View
          style={{marginBottom: 10, borderColor: BiruKu, borderBottomWidth: 1}}>
          {isLoading ? (
            <View style={{marginTop: 50}}>
              <ActivityIndicator size="large" color={BiruKu} />
            </View>
          ) : (
            filteredPanelData.map((item, index) =>
              item.DateSubmit ? (
                <PanelProjectList
                  key={index}
                  projectName={item.projectName}
                  panelName={item.panelName}
                  status={item.DateSubmit}
                  // status={index + 1}
                />
              ) : null,
            )
          )}
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Italic',
                fontSize: 11,
                color: BiruKu,
                textAlign: 'center',
                marginTop: 15,
              }}>
              End of Page
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ComponentOrder;

const styles = StyleSheet.create({
  wrappHead: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 2,
    borderColor: BiruKu,
    borderBottomWidth: 2,
  },
  panelProject: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    textAlignVertical: 'center',
    paddingLeft: 8,
    marginHorizontal: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 28,
    width: 145,
  },
  status: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: BiruKu,
    height: 28,
    width: 72,
  },
  headProjectName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    // marginRight: -1,
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
    marginHorizontal: -1,
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
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: 79,
  },
  searchInput: {
    borderWidth: .5,
    borderColor: BiruKu,
    borderRadius: 5,
    fontFamily: 'Poppins-LightItalic',
    fontSize: 12,
    color: BiruKu,
    backgroundColor: 'white',
    marginHorizontal: 18,
    marginBottom: 5,
    paddingHorizontal: 7,
    paddingVertical: 6,
    height: 35
  },
});
