import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingComponent = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} marginTop={170} />
    </View>
  );
};

export default LoadingComponent;