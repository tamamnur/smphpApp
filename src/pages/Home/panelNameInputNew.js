import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BiruKu } from '../../utils/constant';

const PanelNameInputNew = ({ onAddPanel }) => {
  const [newPanelName, setNewPanelName] = useState('');

  const handleAddPanel = () => {
    if (newPanelName.trim() !== '') {
      onAddPanel(newPanelName.trim());
      setNewPanelName('');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.addButtonText}>Add</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Enter New Panel Name"
        value={newPanelName}
        onChangeText={(text) => setNewPanelName(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPanel}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 10,
    marginHorizontal: 30,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,
    padding: 10,
    height: 35,
    flex: 1,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
});

export default PanelNameInputNew;
