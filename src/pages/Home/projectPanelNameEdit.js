import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconBack, LogoSmpHP, EditButton} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {CommonActions, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PanelNameInputNew from './panelNameInputNew';

const Panel = props => {
  const navigation = useNavigation();
  const [ListPanel, setListPanel] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.pname);
  const handleEdit = () => {
    setEditing(true);
  };
  const updatePanelName = async (id, newName) => {
    try {
      const projectRef = firestore()
        .collection('Project')
        .doc(props.route.params.id);
      const panelRef = projectRef.collection('PanelName').doc(id);
      await panelRef.update({pnameInput: newName});
      ToastAndroid.show('Panel name has been updated', ToastAndroid.TOP);
      setListPanel(prevListPanel => {
        return prevListPanel.map(item => {
          if (item.id === id) {
            return {...item, pnameInput: newName};
          }
          return item;
        });
      });
    } catch (error) {
      console.error('Error updating panel name:', error);
    }
  };
  const handleSave = () => {
    if (newName !== props.pname) {
      updatePanelName(props.pnomor, newName);
    }
    setEditing(false);
  };
  const handleCancel = () => {
    setNewName(props.pname);
    setEditing(false);
  };
  const deletePanel = async id => {
    try {
      const projectRef = firestore()
        .collection('Project')
        .doc(props.route.params.id);
      const panelRef = projectRef.collection('PanelName').doc(id);

      await panelRef.delete();
      ToastAndroid.show('Panel has been deleted', ToastAndroid.TOP);
    } catch (error) {
      console.error('Error deleting panel:', error);
    }
  };
  const handleDelete = () => {
    deletePanel(props.pnomor);
  };

  useEffect(() => {
    setNewName(props.pname);
  }, [props.pname]);

  useEffect(() => {
    setNewName(props.pname);
    return () => {
      setNewName(props.pname);
    };
  }, [props.pname, props.pnomor]);

  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.pnomor}>{props.pnomor}</Text>
      {editing ? (
        <TextInput
          style={styles.pname}
          value={newName}
          onChangeText={text => setNewName(text)}
        />
      ) : (
        <Text style={styles.pname}>{props.pname}</Text>
      )}
      {editing ? (
        <>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.btnSave}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.btnEdit}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.btnEdit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.btnDelete}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const PanelNameEdit = props => {
  const navigation = useNavigation();
  const [projectInfo, setProjectInfo] = useState({
    ProjectName: '', ProjectId: '', Customer: '', NumberPO: '', DatePO: '', });
  const [listPanel, setListPanel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleReload = () => {
    setRefreshing(true);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'PanelNameEdit'}],
      }),
    );
    setTimeout(() => {
      navigation.navigate('PanelNameEdit');
      setRefreshing(false);
    }, 1000);
  };
  useEffect(() => {
    const id = props.route.params.id;
    const unsubscribe = firestore()
      .collection('Project')
      .doc(id)
      .onSnapshot(async doc => {
        const panelName = await doc.ref.collection('PanelName').get();
        const PanelNames = panelName.docs.map(item => ({
          id: item.id, ...item.data(),
        }));
        setProjectInfo({
          ProjectName: doc.data().projectName,
        }),
        setListPanel(PanelNames);
        setIsLoading(false);
        console.log(
          panelName.docs.map(item => ({id: item.id, ...item.data()})),
        );
      });
    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleAddPanel = (newPanelName) => {
    const projectRef = firestore().collection('Project').doc(props.route.params.id);
    const newPanelId = listPanel.length;      
    projectRef.collection('PanelName').add({id: newPanelId, pnameInput: newPanelName});
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
        <IconBack onPress={() => navigation.goBack()} />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      {isLoading ? (
        <View style={{marginTop: 50}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>PANEL NAME EDIT</Text>
          <Text style={styles.subtitle}>{projectInfo.ProjectName}</Text>

          <TouchableOpacity
            style={{flexDirection: 'row', marginHorizontal: 20}}
            onPress={handleReload}>
            <AntDesign name="reload1" size={20} color={BiruKu} />
            <Text style={styles.reload}>{refreshing ? 'Refreshing...':'Refresh'}</Text>
          </TouchableOpacity>

          <ScrollView style={{marginBottom: 50}}>
            {listPanel.map(item => {
              return (
                <Panel
                  key={item.id}
                  pnomor={item.id}
                  pname={item.pnameInput}
                  route={props.route}
                  listPanel={listPanel}
                  setListPanel={setListPanel}
                />
              );
            })}
          </ScrollView>
          <PanelNameInputNew onAddPanel={handleAddPanel} />
        </View>
      )}
    </View>
  );
};

export default PanelNameEdit;

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    marginBottom: -5,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: BiruKu,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: BiruKu,
  },
  pname: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlignVertical: 'center',
    marginVertical: 2,
    paddingLeft: 10,
    paddingBottom: -6,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 270,
    height: 35,
  },
  pnomor: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    paddingBottom: -6,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 2,
    marginLeft: 20,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 25,
    height: 35,
  },
  btnEdit: {
    fontSize: 11,
    color: 'blue',
    paddingTop: 5,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  btnSave: {
    fontSize: 11,
    color: 'green',
    paddingTop: 5,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  btnDelete: {
    fontSize: 11,
    color: 'red',
    paddingTop: 5,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  wrappNewPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 30,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingLeft: 10,
    paddingBottom: -6,
    paddingTop: 2,
    color: BiruKu,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 35,
    width: 280,
  },
  addButton: {
    marginLeft: 15,
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
