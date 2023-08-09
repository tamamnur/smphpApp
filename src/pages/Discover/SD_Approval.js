import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';
import SearchBar from '../../components/SearchBar';

const SD_Approval = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [panelNameData, setPanelNameData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [filteredPanelData, setFilteredPanelData] = useState([]);

  useEffect(() => {
    // let isMounted = true;

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
          const projectRef = firestore()
            .collection('Project')
            .doc(doc.id)
            .collection('PanelName');
          const panelIdRef = await projectRef.get();
          const panelIdData = panelIdRef.docs.map(panelIdDoc => ({
            panelId: panelIdDoc.id,
            ...panelIdDoc.data(),
          }));
          for (const panel of panelIdData) {
            panelNameData.push({
              projectName: doc.projectName,
              panelName: panel.pnameInput,
            });
            const getIdMonitoring = panel.MonitoringID
              ? panel.MonitoringID.substring(12)
              : null;
            // console.log('from Project GetID ',getIdMonitoring)
          }
        }
        setPanelNameData(panelNameData);
        setIsLoading(false);
        // if (isMounted) {
        // }
      } catch (error) {
        console.error('Error Fetching Data ', error);
        setIsLoading(false);
        // if (isMounted) {
        // }
      }
    };

    const getMonitoring = async () => {
      try {
        const idRef = firestore().collection('Monitoring');
        const idDoc = await idRef.get();
        const monitoringData = [];
        for (const docRef of idDoc.docs) {
          const idMonitoringRef = docRef.id;
          // console.log('from Monitoring Collections ',docRef.id)
          const sdRef = idRef.doc(idMonitoringRef).collection('Shopdrawing');
          const approvalRef = sdRef.doc('Approval');
          const approvalDoc = await approvalRef.get();
          if (approvalDoc.exists) {
            const approvalData = approvalDoc.data();
            const dateApprovalValue = approvalData.DateApprove;
            const dateApproval = FormatDate(dateApprovalValue.toDate());
            monitoringData.push({
              idMonitoringRef,
              ...docRef.data(),
              DateApproval: dateApproval,
            });
          } else {
            console.log(idMonitoringRef, 'doesnt exist');
          }
        }
        setPanelNameData(monitoringData);
        setIsLoading(false);
        //  if (isMounted) {
        // }
      } catch (error) {
        console.log('ERROR', error);
        setIsLoading(false);
        // if (isMounted) {
        // }
      }
    };
    const linked = async () => {
      try {
        const [projectData, monitoringData] = await Promise.all([
          getProject(),
          getMonitoring(),
        ]);

        const mergedData = projectData.map(project => {
          const related = monitoringData.find(monitoring => {
            console.log('==', project.getIdMonitoring);
            return monitoring.idMonitoringRef === project.getIdMonitoring;
          });

          return {
            ...project,
            ...related,
          };
        });

        setPanelNameData(mergedData);
        // console.log('merged?', mergedData);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false);
      }
    };
    linked();
    //  getProject()
    
  }, []);
  
  // const filteredPanelData = panelNameData.filter((item) => {
  //   // console.log('item?', item);
  //   const projectNameLower = item.projectName.toLowerCase();
  //   const panelNameLower = item.panelName.toLowerCase();
  //   const searchKeywordLower = searchKeyword.toLowerCase();
  //   return (
  //     projectNameLower.includes(searchKeywordLower) ||
  //     panelNameLower.includes(searchKeywordLower)
  //   );
  // });
  

  return (
    <View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
        <IconBack onPress={() => navigation.navigate('Discover')} />
        <LogoSmpHP style={{marginLeft: 200}} />
      </View>
      <Title2 TxtTitle="SHOPDRAWING" SubTitle="APPROVAL" />
      <TextInput
        style={styles.searchInput}
        placeholder='Search by project or panel name'
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}  
      />
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
            panelNameData.map((item, index) => (
              <PanelProjectList
                key={index + 1}
                projectName={item.projectName}
                panelName={item.panelName}
                // status={item.id}//{index+1}
                status={item.DateApproval}
                // getIdMonitoring={item.getIdMonitoring}
              />
            ))
          )}
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Italic',
                fontSize: 10,
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

export default SD_Approval;

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
  searchInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 6,
    backgroundColor: 'white',
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 5,
    height: 35,
    color: BiruKu
  }
});
