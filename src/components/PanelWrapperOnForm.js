import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BiruKu } from '../utils/constant';

const PanelWrapperOnForm = ({selectAll, onPress}) => {
  return (
      <View style={styles.wrappPanelTitle}>
        <Text style={styles.panelTitle}>Panel Name</Text>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={onPress}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.toggleAll}>
              {selectAll ? 'Unselect All  ' : 'Select All  '}
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: BiruKu,
                paddingHorizontal: 0.2,
                marginBottom: 5,
              }}>
              <Icon
                name={'check-bold'}
                size={16}
                color={selectAll ? BiruKu : 'white'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
  );
};
export default PanelWrapperOnForm;

const styles = StyleSheet.create({
  wrappPanelTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: BiruKu,
    marginRight: 30,
    marginLeft: 20,
    marginBottom: 5,
    paddingRight: 20,
    paddingLeft: -20,
  },
  panelTitle: {
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
    fontSize: 16,
    marginRight: 50,
  },
  toggleAll: {
    fontFamily: 'Poppins-MediumItalic',
    fontSize: 14,
    marginTop: 2, 
    marginBottom: 1,
    color: BiruKu,
  }
});