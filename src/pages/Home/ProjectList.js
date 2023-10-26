import React, {useEffect, useRef, useState} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, 
  View, } from 'react-native';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import Title from '../../components/Title1';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingComponent from '../../components/LoadingComponent';
import SearchBar from '../../components/SearchBar2'
import DataNotFound from '../../components/dataNotFound';

const Projects = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{marginVertical: 2, paddingVertical: 3}}>
      <View style={styles.container}>
        <TouchableOpacity 
            onPress={() => navigation.navigate('ProjectDetails', {id: props.id})}
            style={{marginVertical: 3, flexDirection: 'row'}}>
          <View style={{width: '78%'}}>
            <Text style={styles.projectName}>
              <MCIcons name="label-variant" /> {props.project}{' '}
            </Text>
            <Text style={styles.client}>{props.client}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProjectStatus', {id: props.id})}>
          <Text style={styles.qty}>{props.qty} Unit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProjectList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState([]);
  const [searchText, setSearchText] = useState('');
  const handleSearchText = (text) => {
    setSearchText(text);
  };

    const filtered = project.filter(item => {
      const projectNameLower = item.projectName.toLowerCase();
      const customerLower = item.customer.toLowerCase();
      const searchKeywordLower = searchText.toLowerCase();
      return (
        projectNameLower.includes(searchKeywordLower) ||
        customerLower.includes(searchKeywordLower)
      );
    });

    const sorting = (a, b) => {
      const nameA = a.projectName.toLowerCase();
      const nameB = b.projectName.toLowerCase();
      if (nameA < nameB) {return -1}
      if (nameA > nameB) {return 1}
      return 0
    };
  
  useEffect(() => {
    let isMounted = true

    const unsubscribe = firestore().collection('Project').onSnapshot(snapshot => {
      const projectData = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        firestore().collection('Project').doc(doc.id).collection('PanelName').get()
          .then(panelSnapshot => {
            const panelCount = panelSnapshot.size;
            const projectPanelCount = { id: doc.id, ...data, panelCount };
            projectData.push(projectPanelCount);
            if (projectData.length === snapshot.size && isMounted) {
              setProject(projectData);
              setIsLoading(false);
            }
          })
          .catch(error => {
            console.error('Error fetching panel data: ', error);
          });
      });

      return () => {
        unsubscribe();
        isMounted = false
      };
    }, []);

    return () => {
      isMounted = false;
    };
  }, []);

  const filterResult = filtered.sort(sorting)
  return (
    <View style={{marginTop: 20}}>
      <Header />
      <Title TxtTitle={'PROJECT LIST'} />
      <SearchBar value={searchText} onChangeText={handleSearchText}/>
      <ScrollView style={{marginTop: -6, height: '80%'}}>
        {isLoading ? (<LoadingComponent />) 
        : filterResult.length > 0 ? (
          filterResult.map(item => (
          <Projects key={item.id} 
            id={item.id} project={item.projectName} 
            client={item.customer} qty={item.panelCount}/>
          ))
          ) : (<View style={{marginHorizontal: 10}}><DataNotFound/></View>)
        }
      </ScrollView>
    </View>
  );
};
export default ProjectList;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2.5,
    width: '92%',
    marginHorizontal: 15,
    borderColor: BiruKu,
    flexDirection: 'row'
  },
  projectName: {
    color: BiruKu,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    paddingLeft: 10,
  },
  client: {
    color: BiruKu,
    fontFamily: 'Poppins-Medium',
    fontSize: 14.5,
    paddingLeft: 10,
  },
  qty: {
    color: BiruKu,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'right',
    paddingRight: 10,
    marginTop: 10,
  },
});