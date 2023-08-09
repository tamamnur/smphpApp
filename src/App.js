// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router/Router';
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