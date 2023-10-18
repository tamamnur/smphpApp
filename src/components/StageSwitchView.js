import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFab from 'react-native-vector-icons/AntDesign';
import IconFull from 'react-native-vector-icons/MaterialCommunityIcons';
import {BiruKu} from '../utils/constant';

const StagesSwitch = ({onSelect}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const titles = [
    {title: 'Full Stages', icon: 'sort-bool-ascending-variant', component: IconFull},
    {title: 'Shopdrawing', icon: 'file-cad-box', component: IconFull},
    {title: 'Construction', icon: 'cube-outline', component: IconFull},
    {title: 'Busbar Cu', icon: 'magic', component: Icon},
    {title: 'Component', icon: 'mini-sd', component: IconFull},
    {title: 'FAB Layouting', icon: 'layout', component: IconFab},
    {title: 'FAB Mechanic', icon: 'tool', component: IconFab},
    {title: 'FAB Wiring', icon: 'fork', component: IconFab},
    {title: 'Finishing', icon: 'checksquare', component: IconFab},
  ];
  const handleButtonPress = index => {
    setActiveIndex(index);
    onSelect(titles[index].title);
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{titles[activeIndex].title}</Text>
      <View style={styles.buttonWrapper}>
        {titles.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button2, {
              color: activeIndex === index ? BiruKu: 'gray',
              borderColor: activeIndex === index ? BiruKu: 'gray'
            }]}
            onPress={() => handleButtonPress(index)}>
              {React.createElement(item.component, {
                name: item.icon,
                size: activeIndex === index ? 25 : 20, 
                color: activeIndex === index ? BiruKu : 'green'
                
              })}
          </TouchableOpacity>
        ))}
      </View>
      {/* <Text style={styles.title}>{titles[activeIndex].title}</Text> */}

    </View>
  );
};

export default StagesSwitch;

const styles = StyleSheet.create({
  wrapper: {
    // flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'flex-end',
    // marginHorizontal: 15,
    marginTop: -10,
    marginBottom: 5,
    width: '100%',
    // borderWidth: 1
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 85,
  },
  title: {
    // marginRight: 6,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: BiruKu,
  },
  // activeTitlle: {color: BiruKu, fontWeight: 'bold'},
  button: {marginHorizontal: 2},
  button2: {marginHorizontal: 3, borderWidth: 1, padding: 3 },
});