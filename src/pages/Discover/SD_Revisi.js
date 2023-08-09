import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { IconBack, LogoSmpHP } from '../../assets';
import { BiruKu } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title2 from '../../components/Title2';
import PanelProjectList from '../../components/panelProjectList';
import FormatDate from '../../components/FormatDate';

const SD_Revision = () => {
  const navigation = useNavigation();
  const [revisionData, setRevisionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
  
  const getMonitoring = async () => {
    try {
      const monitoringRef = firestore().collection('Monitoring')
      const docSnapshot = await monitoringRef.get()
      const monitorData = [];
      for (const doc of docSnapshot.docs) {
        const id = doc.id;
        const shopdrawingRef = monitoringRef.doc(id).collection('Shopdrawing')
        const revisionRef = shopdrawingRef.doc('Revision')  
        const revisionDoc = await revisionRef.get()
        if (revisionDoc.exists) {
          const revisionData = revisionDoc.data()
          const dateRevisionValue = revisionData.DateRevisi;
          const dateRevision = FormatDate(dateRevisionValue.toDate())
          monitorData.push({id, ...doc.data(), DateRevision: dateRevision })
        } else {
          console.log('Revision doc not found for ID: ', id)
        }
      }
      const dateShorted = monitorData.sort((a,b) => {
        const dateA = new Date(a.DateRevision)
        const dateB = new Date(b.DateRevision)
        return dateB.getTime()-dateA.getTime()
      })
      if (isMounted) {
        setRevisionData(dateShorted)
        setIsLoading(false)
      }
    } catch (error) {
      console.log('Error', error)
      if (isMounted) {
        setIsLoading(false)
      }
    }
  }
  getMonitoring();
  return () => {
    isMounted = false
  };
  }, [])

  return (
    <View>
      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 30 }}>
        <IconBack onPress={() => navigation.navigate('Discover')} />
        <LogoSmpHP style={{ marginLeft: 200 }} />
      </View>
      <Title2 TxtTitle="SHOPDRAWING" SubTitle="REVISION" />
      <View style={styles.wrappHead}>
        <Text style={styles.headProjectName}>Project Name</Text>
        <Text style={styles.headPanelName}>Panel Name</Text>
        <Text style={styles.headUpdate}>Update</Text>
      </View>
      <ScrollView style={{ marginHorizontal: 8, marginBottom: 110, height: 550 }}>
        <View style={{ marginBottom: 10, borderColor: BiruKu, borderBottomWidth: 1 }}>
          {isLoading ? (
            <View style={{ marginTop: 50 }}>
              <ActivityIndicator size="large" color={BiruKu} />
            </View>
          ) : (
            revisionData.map((item, index) => (
              <PanelProjectList
                key={index+1}
                projectName={item.id}
                panelName={index+1}
                status={item.DateRevision}
              />
            ))
          )}
          <View>
            <Text style={{ fontFamily: 'Poppins-Italic', fontSize: 12, color: BiruKu, textAlign: 'center', marginTop: 15 }}>
              End of Page
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SD_Revision;

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
});
