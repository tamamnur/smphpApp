// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import Todos from './pages/Home/todo';

function App() {
  return (
    <NavigationContainer>
      <Router />
      {/* <Todos /> */}
    </NavigationContainer>
  );
}

export default App;