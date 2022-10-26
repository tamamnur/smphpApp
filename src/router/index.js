import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Akun, Discover, Splash, Login, Signup } from '../pages'
import { BottomTabNavigator } from '../components'
import CreateProject from '../pages/Home/createProject'
import ResetPassword from '../pages/Log/resetPassword'
import PanelNameInput from '../pages/Home/panelNameInput'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false}}/>
      <Tab.Screen name="Discover" component={Discover}options={{ headerShown: false}}/>
      <Tab.Screen name="Akun" component={Akun}options={{ headerShown: false}}/>
    </Tab.Navigator>
  )
}
const Router = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="CreateProject" component={CreateProject}options={{ headerShown: false}}/>
        <Stack.Screen name="PanelNameInput" component={PanelNameInput}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}options={{ headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Router;

const styles = StyleSheet.create({})