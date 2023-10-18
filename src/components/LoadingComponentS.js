import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingComponentS = () => {
  return (
    <View>
      <ActivityIndicator size={30} color={'#427583'} marginVertical={50} />
    </View>
  );
};

export default LoadingComponentS;