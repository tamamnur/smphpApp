import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';

const ProjectBlank = ({navigation, props}) => {
    useEffect(()=> {
        setTimeout(()=> {
        navigation.replace("ProjectStatus")
        {id: props.id}
    },5000)
    }, [])
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginHorizontal: 30,
          marginBottom: 80,
        }}>
        <IconBack onPress={''} />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <ActivityIndicator size={'large'} />
    </View>
  );
};
export default ProjectBlank;