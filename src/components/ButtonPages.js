import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BigTitle, descOnPages, title, wrapperOnPagePre, wrapperOnPagePro} from '../utils/fontStyles';

export const ButtonStart = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={wrapperOnPagePro}>
        <AntDesign name="playcircleo" color={'teal'} size={80} />
        <Text style={descOnPages}>Start</Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonFinish = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={wrapperOnPagePro}>
        <AntDesign name="carryout" color={'steelblue'} size={80} />
        <Text style={descOnPages}>Finish</Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonOrder = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={wrapperOnPagePre}>
        <AntDesign name="profile" color={'teal'} size={50} />
        <Text style={descOnPages}>Purchase</Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonSchedule = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={wrapperOnPagePre}>
        <AntDesign name="hourglass" color={'darkorange'} size={50} />
        <Text style={descOnPages}>Schedule</Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonRealized = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={wrapperOnPagePre}>
        <AntDesign name="carryout" color={'steelblue'} size={50} />
        <Text style={descOnPages}>Realized</Text>
      </View>
    </TouchableOpacity>
  );
};

export const TitlePages = props => {
  return(
    <View style={{marginVertical: 35}}>
        <Text style={BigTitle}>{props.Title}</Text>
        <Text style={title}>{props.Subtitle}</Text>  
    </View>
  )
}