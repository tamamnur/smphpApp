import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconAdd, IconBack, LogoSmpHP, EditButton, IconAdd2} from '../../assets';
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
  };
  constructor(props) {
    super(props);
    this.subcsriber = firestore()
      .collection('Project')
      .doc(props.route.params.id)
      .onSnapshot(doc => {
        // console.log(doc.data().datePO.toDate().toLocaleDateString('en-IN'));
        const FirebaseDate = doc.data().datePO.toDate();
        const FormatDate =FirebaseDate.getDate()+'/'+(FirebaseDate.getMonth()+1)+'/'+FirebaseDate.getFullYear();
        const refProject = firestore().collection('Project').doc();
        this.setState({
          Project: {
            ProjectName: doc.data().projectName,
            ProjectId: doc.data().projectId,
            Customer: doc.data().customer,
            NumberPO: doc.data().numberPO,
            DatePO: FormatDate,
          },
        });
      });
    this.setState({id: props.route.params.id});
  }
  getPanel() {
    const InitiationFirebase = async () => {
      const FBProject = await firestore().collection('Project').get();
      const projectRef = FBProject.docs.map(async doc => {
        const panelName = await doc.ref.collection('PanelName').get();
        const Panels = panelName.docs.map(panelDoc => {
          return {
            id: panelDoc,
            ...panelDoc.data(),
          };
        });
        return {
          id: doc.id,
          ...doc.data(),
          Panels: Panels,
        };
      });
      setProjectList(await Promise.all(projectRef));
    };
    InitiationFirebase();
  }

  // getPanel = async () => {
  //   const refProject = firestore().collection('Project/1xNSpe5oM4ujMoZQWgPX');
  //   const panelName = await refProject.collection('PanelName').get();
  //   panelName.forEach(doc => {
  //     console.log(doc.id);
  //     this.setState({
  //       ListPanel: [
  //         ...this.state.ListPanel,
  //         {
  //           id: doc.id,
  //           ...doc.data(),
  //         },
  //       ],
  //     });
  //     console.log(ListPanel);
  //   });
  //   console.log(panelName);
  // };

  //   useEffect(() => {
  //     const InitiationFirebase = async () => {
  //       const FBProject = await firestore().collection('Project').get();
  //       const projectRef = FBProject.docs.map(async doc => {
  //         const panelName = await doc.ref.collection('PanelName').get();
  //         const Panels = panelName.docs.map(panelDoc => {
  //           return {
  //             id: panelDoc,
  //             ...panelDoc.data(),
  //           };
  //         });
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //           Panels: Panels,
  //         };
  //       });
  //       setProjectList(await Promise.all(projectRef));
  //     };
  //     InitiationFirebase();
  //   }, []);
  // }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
          <IconBack onPress={() => this.props.navigation.navigate('Home')} />
          <LogoSmpHP style={{marginLeft: 180}} />
        </View>
        <Text style={styles.title}>{this.state.Project.ProjectName}</Text>
        <Text style={styles.subtitle}>"Project Details"</Text>
        <View
          style={{
            marginVertical: 2,
            marginHorizontal: 30,
            alignItems: 'flex-end',
          }}>
          <EditButton
            onPress={() => this.props.navigation.navigate('ProjectDetailsEdit')}
          />
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
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.pnameTitle}>Panel Name's :</Text>
            </View>
            <View
              style={{
                marginVertical: 12,
                marginHorizontal: 180,
                alignItems: 'flex-end',
              }}>
              <EditButton onPress={''} />
            </View>
          </View>
          <ScrollView style={{marginBottom: 20, borderBottomWidth: 2}}>
            {this.state.ProjectDetails.Panels.map(item => {
              // console.log(item);
              <Panel 
              pname={item.pnameInput}/>
            })}
          </ScrollView>

          {/* <Panel pnomor="0" pname={this.state.Project.ProjectName} /> */}
          <Panel pnomor="1" pname="LVMDP" />
          <Panel pnomor="2" pname="CAPACITOR BANK 120KVAR" />
          <Panel pnomor="3" pname="MDP" />

          <TouchableOpacity style={styles.CreateSPGWrapp}>
            <Text>Create SPG</Text>
            <IconAdd
              onPress={() => this.props.navigation.navigate('CreateSPG')}
            />
            <Text>Create SPG</Text>
            <IconAdd2
              onPress={() => this.props.navigation.navigate('CreateSPG')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default ProjectDetails;

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: BiruKu,
  },
  subtitle: {
    marginBottom: 3,
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
    fontSize: 13,
    marginVertical: 2,
    marginHorizontal: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 290,
  },
  pnomor: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    marginLeft: 20,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 30,
    textAlign: 'center',
  },
  CreateSPGWrapp: {
    alignItems: 'center',
  },
});