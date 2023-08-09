import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';
import {useNavigation } from '@react-navigation/native';
import {IconInput} from '../assets/icon';


const InputProgress = (props) => {
  const navigation = useNavigation();
  return(
    <View style={{marginVertical: 20, backgroundColor: '#E5E5E5', marginHorizontal: 20, borderWidth: 2, borderColor: BiruKu, borderRadius: 20,height: 50 }}>


    <TouchableOpacity onPress={props.onPress}>
      <View style={{flexDirection: 'row', marginTop: 8, alignSelf: 'center', marginBottom: -15}}>
        <View>
          <IconInput/>
        </View>
        <View>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14, color: BiruKu, marginLeft: 5, marginTop: 3}}>
          Input Progress
        </Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  )
};

export default InputProgress;