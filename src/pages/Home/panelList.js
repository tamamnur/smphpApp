import { Text, StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid, } from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IconBack, LogoSmpHP, EditButton, } from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Panel = props => {
    const navigation = useNavigation();
    const [ListPanel, setListPanel] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.pname);
    const handleEdit =()=> {
      setEditing(true);
    }
    const updatePanelName = async (id, newName) => {
      try {
        const projectRef = firestore().collection('Project').doc(props.route.params.id);
        const panelRef = projectRef.collection('PanelName').doc(id);  
        await panelRef.update({ pnameInput: newName });
        ToastAndroid.show('Panel name has been updated', ToastAndroid.TOP)
        setListPanel(prevListPanel => {
          return prevListPanel.map(item => {
            if (item.id === id) {
              return { ...item, pnameInput: newName };
            }
            return item;
          });
        });
      } catch (error) {
        console.error('Error updating panel name:', error);
      }
    };
    const handleSave =()=> {
      if(newName !== props.pname){
        updatePanelName(props.pnomor, newName);
      }
      setEditing(false);
    }
    const handleCancel =()=> {
      setNewName(props.pname);
      setEditing(false);
    }
    const deletePanel = async (id) => {
      try {
        const projectRef = firestore().collection('Project').doc(props.route.params.id);
        const panelRef = projectRef.collection('PanelName').doc(id);
    
        await panelRef.delete();
        ToastAndroid.show('Panel has been deleted', ToastAndroid.TOP)
      } catch (error) {
        console.error('Error deleting panel:', error);
      }
    };
    const handleDelete =()=> {
      deletePanel(props.pnomor);
    }
  
    useEffect(() => {
      setNewName(props.pname);
    }, [props.pname]);
  
    useEffect(() => {
      setNewName(props.pname);
      return () => {
        setNewName(props.pname);
      }
    }, [props.pname, props.pnomor]);
  
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.pnomor}>{props.pnomor}</Text>
        {editing ? (
          <TextInput style={styles.pname} value={newName} onChangeText={text => setNewName(text)}/>
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
  export default Panel;
  const styles = StyleSheet.create({
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
      height: 35
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
      height: 35
    },
    btnEdit:{
      fontSize: 11,
      color: 'blue',
      paddingTop: 5,
      marginHorizontal: 8,
      marginVertical: 5,
    },
    btnSave:{
      fontSize: 11,
      color: 'green',
      paddingTop: 5,
      marginHorizontal: 3,
      marginVertical: 5,
    },
    btnDelete:{
      fontSize: 11,
      color: 'red',
      paddingTop: 5,
      marginHorizontal: 3,
      marginVertical: 5,
    }
  });