import React, {useState, useEffect, useRef} from 'react';
import {Text,StyleSheet,View,ScrollView,ActivityIndicator,TextInput,} from 'react-native';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';
import EndOf from '../../components/Footer';
import PanelHeadTable from '../../components/panelHeadTable';

const SD_Revision = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [panelNameData, setPanelNameData] = useState([]);
  const [searchKeyword, setSearchKeywoard] = useState('');

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
              const shopdrawingRef = idRef.doc(id).collection('Shopdrawing').doc('Revision');
              const revisionDoc = await shopdrawingRef.get();
              if (revisionDoc.exists) {
                const revisionData = revisionDoc.data();
                if (revisionData.DateRevisi) {
                  const dateRevisionValue = revisionData.DateRevisi;
                  const dateRevision = FormatDate(dateRevisionValue.toDate());
                  panelNameData.push({
                    projectName: panel.projectName,
                    panelName: panel.pnameInput,
                    DateRevision: dateRevision,
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
        if (isMounted) {
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

  const renderedPanelList = filteredPanelData
    .filter(item => item.DateRevision)
    .sort((a, b) => new Date(b.DateRevision) - new Date(a.DateRevision))
    // .sort((b, a) => new Date(b.DateRevision) - new Date(a.DateRevision))
    .map((item, index) => (
      <PanelProjectList
        key={index + 1}
        projectName={item.projectName}
        panelName={item.panelName}
        status={item.DateRevision}
      />
    ));
  const dataNotFound = (<Text style={styles.dataNotFound}>No matching result found.</Text>);
  
  const contenToRender = renderedPanelList.length > 0 ? renderedPanelList : dataNotFound;

  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
        <IconBack onPress={() => navigation.navigate('Discover')} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Title2 TxtTitle="SHOPDRAWING" SubTitle="REVISION" />
      {isLoading ? (
        // <View><Text style={styles.dataNotFound}>Data collection proses...</Text></View>
        <View>
          <Text style={styles.dataNotFound}></Text>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by project or panel name....."
            value={searchKeyword}
            onChangeText={text => setSearchKeywoard(text)}
          />
          <View style={styles.wrappHead}>
            <Text style={styles.headProjectName}>Project Name</Text>
            <Text style={styles.headPanelName}>Panel Name</Text>
            <Text style={styles.headUpdate}>Update</Text>
          </View>
          <PanelHeadTable />
        </>
      )}
      <ScrollView style={{marginHorizontal: 8, marginBottom: 110, height: 550}}>
        <View style={{marginBottom: 10, borderColor: BiruKu, borderBottomWidth: 0}}>
          {isLoading ? (
            <View style={{marginTop: 10, marginBottom: 100}}>
              <ActivityIndicator color={BiruKu} size={100}/>
            </View>
          ) : (contenToRender)
          }
          {/* <View><Text style={styles.endOfPage}>End of Page</Text></View> */}
          <EndOf />
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
  endOfPage: {
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

export default SD_Revision;