import { Text, StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, } from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconBack, LogoSmpHP, EditButton, } from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Panel = props => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 20}}>
      <Text style={styles.pnomor}>{props.pnomor}</Text>
      <Text style={styles.pname}>{props.pname}</Text>
    </View>
  );
};

const ProjectDetails = (props) => {
  const navigation = useNavigation();
  const [projectInfo, setProjectInfo] = useState({
    ProjectName: '', ProjectId: '', Customer:'', NumberPO:'', DatePO:'',
  })
  const [ListPanel, setListPanel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect (() => {
    const id = props.route.params.id;
    const unsubscribe = firestore().collection('Project').doc(id)
      .onSnapshot(async doc => {
        const FirebaseDate = doc.data().datePO ? doc.data().datePO.toDate() : null;
        const monthString = (month) =>  {
          const monthName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul','Ags', 'Sep', 'Okt', 'Nov', 'Des'];
          return monthName[month-1]
        }
        const getMonth = FirebaseDate ? FirebaseDate.getMonth()+1 : null;
        const month = FirebaseDate ? monthString(getMonth) : null;
        const FormatDate = FirebaseDate ? FirebaseDate.getDate() +'-'+month+ '-' + FirebaseDate.getFullYear() : '';
        const panelName = await doc.ref.collection('PanelName').get();
        const PanelNames = panelName.docs.map(item => ({
          id: item.id, ...item.data(),
        }));
        setProjectInfo({
          ProjectName: doc.data().projectName,
          ProjectId: doc.data().projectId,
          Customer: doc.data().customer,
          NumberPO: doc.data().numberPO,
          DatePO: FormatDate
        }),
        setListPanel(PanelNames);
        setIsLoading(false);
        console.log(panelName.docs.map(item => ({id: item.id, ...item.data() })));
      });
      return () => {
        unsubscribe();
      };
    }, [props.route.params.id]);
      
    return (
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
          <IconBack onPress={() => navigation.goBack()} />
          <LogoSmpHP style={{marginLeft: 180}} />
        </View>
        {isLoading ? (
          <View style={{marginTop: 50}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{projectInfo.ProjectName}</Text>
            <Text style={styles.subtitle}>"Project Details"</Text>
            <View style={{ marginVertical: 2, marginHorizontal: 30, alignItems: 'flex-end', }}>
              <EditButton onPress={() => navigation.navigate('ProjectDetailsEdit', {id: props.route.params.id} )}/>
            </View>
            <View style={styles.projectId}>
              <View>
                <Text style={styles.left}>Number SO</Text>
                <Text style={styles.left}>Customer</Text>
                <Text style={styles.left}>Number PO</Text>
                <Text style={styles.left}>Date PO</Text>
              </View>
              <View>
                <Text style={styles.right}>{projectInfo.ProjectId}</Text>
                <Text style={styles.right}>{projectInfo.Customer}</Text>
                <Text style={styles.right}>{projectInfo.NumberPO}</Text>
                <Text style={styles.right}>{projectInfo.DatePO}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View> 
                <Text style={styles.pnameTitle}>Panel Name's :</Text> 
              </View>
              <View style={{ marginVertical: 12, marginHorizontal: 180, alignItems: 'flex-end', }}>
                <EditButton onPress={() => navigation.navigate('PanelNameEdit', {id: props.route.params.id}) } />
              </View>
            </View>
            <ScrollView style={{marginBottom: 50}}>
              {ListPanel.map(item => {
                return (
                  <Panel
                    key={item.id}
                    pnomor={item.id}
                    pname={item.pnameInput}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

export default ProjectDetails;

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: -5,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: BiruKu,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: BiruKu,
  },
  projectId: {
    marginHorizontal: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  left: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 4,
    padding: 2,
    color: BiruKu,
  },
  right: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 2,
    marginLeft: 15,
    height: 25,
    width: 250,
    padding: 3,
    paddingHorizontal: 5,
    marginVertical: 3,
    color: BiruKu,
  },
  pnameTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginTop: 14,
    marginHorizontal: 20,
    color: BiruKu,
  },
  pname: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginVertical: 2,
    marginHorizontal: 2,
    paddingTop: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 290,
  },
  pnomor: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    paddingTop: 2,
    marginVertical: 2,
    marginLeft: 20,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 30,
    textAlign: 'center',
  }
});