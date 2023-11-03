import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import FormatDate from '../../components/FormatDate';
import LoadingCompnentS from '../../components/LoadingComponentS';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Project = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.recap}>
      <View style={{width: '70%'}}>
        <TouchableOpacity onPress={() => navigation.navigate
          ('ProjectDetails', {id: props.id})}>
          <Text style={styles.projectName}>{props.ProjectName} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate
          ('ProjectStatus', {id: props.id})}>
          <View style={{flexDirection: 'row', marginLeft: 5}}>
            <View style={{marginLeft: 2}}>
              <Icon name="arrow-right-bottom-bold" size={14} color={BiruKu} />
            </View>
            <Text style={styles.status}>{props.status}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate
        ('ProjectStatus', {id: props.id})}>
        <Text style={[styles.status, {marginTop: 27}]}>{props.update}</Text>
      </TouchableOpacity>
    </View>
  );
};

class RecapProject extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, Projects: []};
    this.unsubscribe = null;
  }
  componentDidMount() {this.subscribeToProject()}

  componentWillUnmount() {this.unsubscribeFromProject()}
  
  subscribeToProject = () => {
    this.unsubscribe = firestore().collection('Project')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(snapshot => {
        const projects = snapshot.docs.map(document => {
          const data = document.data();
          const updatedAt = data.updatedAt.toDate();
          return {id: document.id, ...data,
            updatedAt: FormatDate(updatedAt),
          };
        });
        this.setState({
          projects: projects,
          isLoading: false,
        });
      });
  };
  unsubscribeFromProject = () => {
    if (this.unsubscribe) {this.unsubscribe()}
  };

  render() {
    const {projects, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>L a s t  P r o g r e s s</Text>
        </View>
        <ScrollView style={{marginBottom: 35}}>
          {isLoading ? (<LoadingCompnentS />) 
          : (projects.map(item => (
              <Project
                key={item.id} id={item.id}
                ProjectName={item.projectName}
                status={item.status}
                update={item.updatedAt}
              />
          )))}
        </ScrollView>
      </View>
    );
  }
}
export default RecapProject;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    height: height * 0.55,
    borderRadius: 20,
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
    borderBottomRightRadius: 200,
    elevation: 8,
    paddingLeft:20
  },
  recap: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  status: {
    color: BiruKu,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginHorizontal: 5,
  },
  projectName: {color: BiruKu, fontFamily: 'Poppins-Medium', fontSize: 16},
  title: {color: '#fff', fontFamily: 'Acme-Regular', fontSize: 21},
});