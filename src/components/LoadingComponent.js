import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingComponent = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} color={'#427583'} marginTop={170} />
    </View>
  );
};

export default LoadingComponent;