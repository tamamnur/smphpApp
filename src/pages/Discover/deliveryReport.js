import { Text, View, StyleSheet, ScrollView, ActivityIndicator, } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Title2 from '../../components/Title2';
  import { IconBack, LogoSmpHP } from '../../assets';
  import { BiruKu } from '../../utils/constant';
  import { useNavigation } from '@react-navigation/native';
  import firestore from '@react-native-firebase/firestore';
  
  const Order = props => {
    const navigation = useNavigation();
    const monthString = month => {
      const monthName = 
      [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      return monthName[month - 1];
    };
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const month = monthString(currentMonth);
  
    return (
      <View
        style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: -1 }}>
        <Text style={styles.panelProject}>{props.projectName}</Text>
        <Text style={styles.panelProject}>{props.panelName}</Text>
        <Text style={styles.status}>{props.status}</Text>
      </View>
    );
  };
  
  const DeliveryReport = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const navigation = useNavigation();
  
    useEffect(() => {
      getMonitoring();
    }, []);
  
    const getMonitoring = async () => {
      try {
        const userProj = item.userProj.substring(1);
        const userDoc = await firestore()
          .collection(userProj + '/Sent')
          .get();
  
        const projects = userDoc.docs.map(item => ({
          id: item.id,
          projectName: item.data().projectName,
          panelNameL: item.data().pnameInput,
          dateSubmit: item.data().dateSubmit,
        }));
        setProjects(projects);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching Monitoring Project: ', error);
        setIsLoading(true);
      }
    };
  
    return (
      <View>
        <View
          style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 30 }}>
          <IconBack onPress={() => navigation.goBack()} />
          <LogoSmpHP style={{ marginLeft: 200 }} />
        </View>
        <Title2 TxtTitle="DELIVERY" SubTitle="Report" />
        <View style={styles.wrappHead}>
          <Text style={styles.headProjectName}>Project Name</Text>
          <Text style={styles.headPanelName}>Panel Name</Text>
          <Text style={styles.headUpdate}>Update</Text>
        </View>
        <ScrollView
          style={{ marginHorizontal: 8, marginBottom: 110, height: 550 }}>
          <View
            style={{
              marginBottom: 10,
              borderColor: BiruKu,
              borderBottomWidth: 1,
            }}>
                <Order />
                <Order />
            {/* {isLoading ? (
              <View style={{ marginTop: 50 }}>
                <ActivityIndicator size="large" color={BiruKu} />
              </View>
            ) : (
              projects.map(item => (
                <Order
                  key={item.id}
                  projectName={item.projectName}
                  panelName={item.pnameInput}
                  status={item.dateSubmit}
                />
              ))
            )} */}
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular-Italic',
                  fontSize: 12,
                  color: BiruKu,
                  textAlign: 'center',
                }}>
                End of Page
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default DeliveryReport;
  
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
        paddingHorizontal: 2,
        borderWidth: 1,
        borderColor: BiruKu,
        height: 30,
        width: 145,
      },
      headPanelName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        color: BiruKu,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingHorizontal: 2,
        borderWidth: 1,
        borderColor: BiruKu,
        height: 30,
        width: 145,
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
        width: 70,
      },
  });
  