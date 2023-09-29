import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import FormatDate from '../../components/FormatDate';

const Project = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.recap}>
      <View style={{width: 250}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectDetails', {id: props.id})}>
          <Text style={styles.projectName}>{props.ProjectName} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectStatus', {id: props.id})}>
          <Text style={styles.status}>{props.status}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.update}>{props.update}</Text>
    </View>
  );
};

class RecapProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Projects: [],
    };
    this.unsubscribe = null;
  }
  componentDidMount() {
    this.subscribeToProject();
  }
  componentWillUnmount() {
    this.unsubscribeFromProject()
  }
  subscribeToProject = () => {
    this.unsubscribe = firestore().collection('Project').orderBy('updatedAt', 'desc').onSnapshot(snapshot => {
      const projects = snapshot.docs.map(document => {
        const data = document.data();
        const updatedAt = data.updatedAt.toDate();
        // const progres = data.
        return {
          id: document.id, ...data, updatedAt: FormatDate(updatedAt)
        }
      })
      this.setState({
        projects: projects,
        isLoading: false,
      })
    })
  }
  unsubscribeFromProject = () => {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
  render() {
    const {projects, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Last Progress</Text>
        </View>
        <ScrollView style={{marginBottom: 25}}>
          {isLoading ? (
            <View style={{marginTop: 50}}>
              <ActivityIndicator size="large" color={BiruKu} />
            </View>
          ) : (
            projects.map(item => (
                <Project
                key={item.id}
                id={item.id}
                ProjectName={item.projectName}
                status= {item.status} //'Created at....' //"Procurement -- Component"
                update={item.updatedAt}
                />
            ))
          )}
        </ScrollView>
      </View>
    );
  }
}
export default RecapProject;

const styles = StyleSheet.create({
  container: {
    width: '98%',
    height: '50%',
    borderRadius: 20,
    marginHorizontal: 4,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    elevation: 10,
  },
  titleWrap: {
    backgroundColor: '#84A2AA',
    height: 50,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 100,
    elevation: 8,
  },
  title: { fontFamily: 'Acme-Regular', fontSize: 20, color: '#FFF', marginHorizontal: 20, },
  recap: { marginHorizontal: 15, marginVertical: 6, flexDirection: 'row', },
  projectName: { color: BiruKu, fontFamily: 'Poppins-Medium', fontSize: 13, },
  status: { color: BiruKu, fontFamily: 'Poppins-Regular', fontSize: 11, marginHorizontal: 5, },
  update: { color: BiruKu, fontFamily: 'Poppins-Medium', fontSize: 10, marginTop: 22, textAlign: 'right', },
});