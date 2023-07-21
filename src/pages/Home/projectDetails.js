import { Text, StyleSheet, View, ScrollView, ActivityIndicator, } from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconBack, LogoSmpHP, EditButton, } from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Panel = props => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 20}}>
      <Text style={styles.pnomor}>{props.pnomor}</Text>
      <Text style={styles.pname}>{props.pname}</Text>
    </View>
  );
};

class ProjectDetails extends Component {
  state = {
    Project: {ProjectName: ''},
    ProjectId: {ProjectId: ''},
    Customer: {Customer: ''},
    NumberPO: {NumberPO: ''},
    DatePO: {DatePO: ''},
    DatePO2: {DatePO2: ''},
    ListPanel: [],
    id: '',
    isLoading: true,
  };
  constructor(props) {
    super(props);
    this.subcsriber = firestore()
      .collection('Project')
      .doc(props.route.params.id)
      .onSnapshot(async doc => {
        const FirebaseDate = doc.data().datePO.toDate();
        const monthString = (month) =>  {
          const monthName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul','Ags', 'Sep', 'Okt', 'Nov', 'Des'];
          return monthName[month-1]
        };
        const getMonth = (FirebaseDate.getMonth()+1);
        const month = monthString(getMonth)
        const FormatDate = FirebaseDate.getDate() +'-'+month+ '-' + FirebaseDate.getFullYear();
        const panelName = await doc.ref.collection('PanelName').get();
        const PanelNames = panelName.docs.map(item => ({
          id: item.id, ...item.data(),
        }));
        this.setState({
          Project: {
            ProjectName: doc.data().projectName,
            ProjectId: doc.data().projectId,
            Customer: doc.data().customer,
            NumberPO: doc.data().numberPO,
            DatePO: FormatDate,
          },
          ListPanel: PanelNames,
          isLoading: false,
        });
        console.log(
          panelName.docs.map(item => ({id: item.id, ...item.data()})),
        );
      });
    this.setState({id: props.route.params.id});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
          <IconBack onPress={() => this.props.navigation.navigate('Home')} />
          <LogoSmpHP style={{marginLeft: 180}} />
        </View>
        {this.state.isLoading ? (
          <View style={{marginTop: 50}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{this.state.Project.ProjectName}</Text>
            <Text style={styles.subtitle}>"Project Details"</Text>
            <View style={{ marginVertical: 2, marginHorizontal: 30, alignItems: 'flex-end', }}>
              <EditButton onPress={() => this.props.navigation.navigate('ProjectDetailsEdit')}/>
            </View>
            <View style={styles.projectId}>
              <View>
                <Text style={styles.left}>Number SO</Text>
                <Text style={styles.left}>Customer</Text>
                <Text style={styles.left}>Number PO</Text>
                <Text style={styles.left}>Date PO</Text>
              </View>
              <View>
                <Text style={styles.right}>{this.state.Project.ProjectId}</Text>
                <Text style={styles.right}>{this.state.Project.Customer}</Text>
                <Text style={styles.right}>{this.state.Project.NumberPO}</Text>
                <Text style={styles.right}>{this.state.Project.DatePO}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View> 
                <Text style={styles.pnameTitle}>Panel Name's :</Text> 
              </View>
              <View style={{ marginVertical: 12, marginHorizontal: 180, alignItems: 'flex-end', }}>
                <EditButton onPress={() => this.props.navigation.navigate('PanelNameEdit') } />
              </View>
            </View>
            <ScrollView style={{marginBottom: 50}}>
              {this.state.ListPanel.map(item => {
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