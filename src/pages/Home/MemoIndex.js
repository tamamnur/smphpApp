import {Dimensions,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import React from 'react';
import {BiruKu} from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';

const MemoIndex = props => {
  const navigation = useNavigation()
  return (
    <View style={styles.MemoContainer}>
      <TouchableOpacity onPress={()=> navigation.navigate('MemoView', {id: props.id})}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{props.proj}</Text>
        </View>
        <View style={{marginHorizontal: 10, marginBottom: 4}}>
          <Text style={styles.for}>For : {props.for}</Text>
          <Text style={styles.subject}>{props.subject}</Text>
        </View>
        <Text style={styles.time}>{props.due}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemoIndex;
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  MemoContainer: {
    width: width*.425,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 2,
    marginLeft: 20,
    backgroundColor: '#F9F9F9',
    elevation: 3,
  },
  titleWrap: {
    backgroundColor: '#84A2AA',
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 100,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    textAlignVertical: 'center',
    color: '#FFF',
    marginHorizontal: 10,
  },
  for: {
    fontFamily: 'Poppins-MediumItalic',
    fontSize: 14,
    color: BiruKu,
  },
  subject: {
    fontFamily: 'Poppins-Italic',
    fontSize: 15,
    paddingLeft: 10,
    color: BiruKu,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Poppins-Italic',
    color: BiruKu,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginVertical: 5
  },
});