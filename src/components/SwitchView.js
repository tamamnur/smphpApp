import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BiruKu} from '../utils/constant';

const StagesSwitch = ({onSelect}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const titles = [
    'Full Stages',
    'Shopdrawing',
    'Construction',
    'Busbar Cu',
    'Component',
    'FAB Layouting',
    'FAB Mechanic',
    'FAB Wiring',
    'Finishing',
  ];
  const handleButtonPress = index => {
    setActiveIndex(index);
    onSelect(titles[index])
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{titles[activeIndex]}</Text>
      <View style={styles.buttonWrapper}>
        {titles.map((title, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleButtonPress(index)}>
            <Icon
              color={BiruKu}
              name={activeIndex === index ? 'circle' : 'circle-o'}
              size={activeIndex === index ? 20 : 16}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StagesSwitch;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 25,
    marginBottom: 2,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 85,
  },
  title: {
    marginRight: 6,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
  },
  activeTitlle: {color: BiruKu, fontWeight: 'bold'},
  button: {marginHorizontal: 2},
});
