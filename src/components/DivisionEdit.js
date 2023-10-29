import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../utils/constant';
import {Picker} from '@react-native-picker/picker';

const DivisionEdit = props => {
  const [attn, setAttn] = useState(props.value || '');

  return (
    <View style={styles.area}>
      <Picker
        style={styles.picked}
        value={attn}
        onValueChange={(newValue) => {
          setAttn(newValue);
          props.onValueChange(newValue);
        }}>
        {props.divisions.map((attn, index) => (
          <Picker.Item key={index} label={attn} value={attn} />
        ))}
      </Picker>
    </View>
  );
};

export default DivisionEdit;

const styles = StyleSheet.create({
  area: {
    // backgroundColor: '#EDEDED',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BiruKu,
    // marginHorizontal: 25,
    // marginTop: 5,
    // marginBottom: 5,
    height: 40,
    width: '80%',
    // fontSize: 14,
    justifyContent: 'center',
  },
  picked: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
    paddingTop: -5,
    marginHorizontal: -10,
  },
});
