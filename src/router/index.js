import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'

import { Home, Akun, Discover, Splash, 
        Signup } from '../pages'
import { BottomTabNavigator } from '../components'
import CreateProject from '../pages/Home/createProject'
import PanelNameInput from '../pages/Home/panelNameInput'
import CreateSPG from '../pages/Discover/CreateSPG'
import CreateSPK from '../pages/Discover/CreateSPK'
import SD_Submission from '../pages/Discover/SD_Submission'
import SD_Approval from '../pages/Discover/SD_Approval'
import SD_Revisi from '../pages/Discover/SD_Revisi.js'
import ResetPassword from '../pages/Akun/resetPassword'
import Login from '../pages/Akun/Login'
import MemoPage from '../pages/Home/MemoPage'
import MemoCreate from '../pages/Home/MemoCreate'
import Project from '../pages/Discover/project'
import { AuthContext } from '../Config/AuthProvider';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SecuredNav = () => {
  return (
    <Stack.Navigator initialRouteName='MainApp'>
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false}}/>
      
      <Stack.Screen name="MemoPage" component={MemoPage} options={{ headerShown: false}}/>
      <Stack.Screen name="MemoCreate" component={MemoCreate} options={{ headerShown: false}}/>
      <Stack.Screen name="CreateProject" component={CreateProject}options={{ headerShown: false}}/>
      <Stack.Screen name="PanelNameInput" component={PanelNameInput} options={{ headerShown: false}}/>

      <Stack.Screen name="CreateSPG" component={CreateSPG} options={{ headerShown: false}}/>
      <Stack.Screen name="CreateSPK" component={CreateSPK} options={{ headerShown: false}}/>

      <Stack.Screen name="SD_Submission" component={SD_Submission} options={{ headerShown: false}}/>
      <Stack.Screen name="SD_Approval" component={SD_Approval} options={{ headerShown: false}}/>
      <Stack.Screen name="SD_Revisi" component={SD_Revisi} options={{ headerShown: false}}/>
    
    </Stack.Navigator>
  )
}

const PublicNav = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}

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

  // const {user, setUser} = useContext(AuthContext);
  // const {initializing, setInitializing} = useState(true);

  // const onAuthStateChanged = (user) => {
  //   setUser(user);
  //   if(initializing) setInitializing(false);
  // }
  
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  // if (initializing) return null;
  
  return (
    <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
        <Stack.Screen name="SecuredNav" component={SecuredNav} options={{ headerShown: false}}/>
        <Stack.Screen name="PublicNav" component={PublicNav} options={{ headerShown: false}}/>
      
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}options={{ headerShown: false}}/>

        {/* <Stack.Screen name="Project" component={Project} options={{ headerShown: false}}/> */}
    </Stack.Navigator>
  )
}

// function SignApp() {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
// }

// export default class Router extends Component <props> {};
export default Router;


const styles = StyleSheet.create({})