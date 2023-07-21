import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SubmissionList = props => {
  const monthString = month => {
    const monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Ags',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];
    return monthName[month - 1];
  };
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const month = monthString(currentMonth);

  const navigation = useNavigation();
  return (
    <View
      style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: -1}}>
      <Text style={styles.panelProject}>{props.projectName}</Text>
      <Text style={styles.panelProject}>{props.panelName}</Text>
      <Text style={styles.status}>{props.status}</Text>
    </View>
  );
};

export default class SD_Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      panelName: '',
      dateUpdate: '',
      isLoading: true,
      projects:[],
    };
  }

  componentDidMount() {
    this.getMonitoring();
    // this.subscribe = firestore().collection('Monitoring');
  }
  getMonitoring = async () => {
    try {
      const userProj = item.userProj.substring(1);
      const userDoc = await firestore()
      .collection(userProj + '/Shopdrawing/Submission')
      .get();
      
      const projects = userDoc.docs.map(item => ({
        id: item.id,
        projectName: item.data().projectName,
        panelNameL: item.data().pnameInput,
        dateSubmit: item.data().dateSubmit,
      }));
      this.setState({
        projects: projects,
        isLoading: false,
      });
      //  project.forEach((data) => {
        //    console.log(data.dateSubmit)
        //  })
      } catch {
      console.log('userDoc--',userProj)
      console.log('userDoc--', userDoc);
      // console.log('Error fething Monitoring Project: ', error);
      this.setState({isLoading: true});
    }
  };

  render() {
    const {projects, isLoading} = this.state;
    return (
      <View>
        <View
          style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
          <IconBack
            onPress={() => this.props.navigation.navigate('Discover')}
          />
          <LogoSmpHP style={{marginLeft: 200}} />
        </View>
        <Title2 TxtTitle="SHOPDRAWING" SubTitle="SUMBISSION" />
        <View style={styles.wrappHead}>
          <Text style={styles.headProjectName}>Project Name</Text>
          <Text style={styles.headPanelName}>Panel Name</Text>
          <Text style={styles.headUpdate}>Update</Text>
        </View>
        <ScrollView
          style={{marginHorizontal: 8, marginBottom: 110, height: 550}}>
          <View
            style={{
              marginBottom: 10,
              borderColor: BiruKu,
              borderBottomWidth: 1,
            }}>
            {isLoading ? (
              <View style={{marginTop: 50}}>
                <ActivityIndicator size="large" color={BiruKu} />
              </View>
            ) : (
              projects.map(item => (
                <SubmissionList
                  key={item.id}
                  projectName={item.projectName}
                  panelName={item.pnameInput}
                  status={item.dateSubmit}
                />
              ))
            )}
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
  }
}

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
