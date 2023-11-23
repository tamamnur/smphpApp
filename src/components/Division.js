import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {BiruKu} from '../utils/constant';

const Division = props => {
  const [division, setDivision] = useState();
  return (
    <View style={styles.area}>
      <Picker style={styles.picked} selectedValue={division}
        onValueChange={(label, value) => {setDivision(label);
          props.onValueChange(label);
        }}
      >
        <Picker.Item label="---" />
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Drafter" value="Drafter" />
        <Picker.Item label="Logistic" value="Logistic" />
        <Picker.Item label="Production" value="Production" />
        <Picker.Item label="Marketing" value="Marketing" />
        <Picker.Item label="Director" value="Director" />
      </Picker>
    </View>
  );
};

export default Division;

const styles = StyleSheet.create({
  area: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 40,
    width: '80%',
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