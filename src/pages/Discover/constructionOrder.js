import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput, } from 'react-native';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';

const ConstructionOrder = () => {
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
          const projectRef = firestore().collection('Project').doc(doc.id).collection('PanelName');
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
              const monitoringRef = idRef.doc(id).collection('Procurement').doc('Construction');
              const monitoringDoc = await monitoringRef.get();
              if (monitoringDoc.exists) {
                const monitoringData = monitoringDoc.data();
                if (monitoringData.Order) {
                  const dateMonitoringValue = monitoringData.Order;
                  const dateMonitoring = FormatDate(dateMonitoringValue.toDate());
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
    // console.log('item?', item);
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
  const dataNotFound = (<Text style={styles.dataNotFound}>No matching result found.</Text>)
  
  const contenToRender = renderedPanelList.length > 0 ? renderedPanelList : dataNotFound

  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
        <IconBack onPress={() => navigation.navigate('PageConstruction')} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Title2 TxtTitle="PURCHASE ORDER" SubTitle="CONSTRUCTION / BOX" />
      {isLoading ? (<Text></Text>) : 
      (<>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by project or panel name....."
            value={searchKeyword}
            onChangeText={text => setSearchKeyword(text)}
          />
          <View style={styles.wrappHead}>
            <Text style={styles.headProjectName}>Project Name</Text>
            <Text style={styles.headPanelName}>Panel Name</Text>
            <Text style={styles.headUpdate}>Update</Text>
          </View>
      </>)}
      <ScrollView style={{marginHorizontal: 8, marginBottom: 110, height: 550}}>
        <View style={{marginBottom: 10, borderColor: BiruKu, borderBottomWidth: 1}}>
          {isLoading ? (
            <View style={{marginTop: 20, marginBottom: 100}}>
              <ActivityIndicator size="large" color={BiruKu} />
            </View>
          ) : ( contenToRender )}
          <View><Text style={styles.endOfPage}>End of Page</Text></View>
        </View>
      </ScrollView>
    </View>
  );
};

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

export default ConstructionOrder;