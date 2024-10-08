import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Akun, Discover, Splash, Signup } from '../pages'
import { BottomTabNavigator } from '../components'
import ProjectCreate from '../pages/Home/projectCreate'
import PanelNameInput from '../pages/Home/panelNameInput'
import SD_Submission from '../pages/Discover/SD_Submission'
import SD_Approval from '../pages/Discover/SD_Approval'
import SD_Revisi from '../pages/Discover/SD_Revisi.js'
import ResetPassword from '../pages/Akun/resetPassword'
import Login from '../pages/Akun/Login'
import MemoPage from '../pages/Home/MemoPage'
import MemoCreate from '../pages/Home/MemoCreate'
import ProjectDetails from '../pages/Home/projectDetails';
import ProjectStatus from '../pages/Home/projectStatus';
import ProjectDetailsEdit from '../pages/Home/projectDetailsEdit';
import FormShopdrawing from '../pages/Discover/FormShopdrawing';
import FormProcurement from '../pages/Discover/FormProcurement';
import FormFabrication from '../pages/Discover/FormFabrication';
import ProfileEdit from '../pages/Akun/profileEdit';
import PageComponent from '../pages/Discover/pageComponent';
import ComponentOrder from '../pages/Discover/componentOrder';
import FormPOComponent from '../pages/Discover/FormPOComponent'
import PageConstruction from '../pages/Discover/pageConstruction'
import PageBusbar from '../pages/Discover/pageBusbar'
import FormPOBusbar from '../pages/Discover/FormPOBusbar'
import PageLayouting from '../pages/Discover/pageLayouting'
import FormFBLayouting from '../pages/Discover/FormFBLayouting'
import FormPOConstruction from '../pages/Discover/FormPOConstruction'
import FormFBMechanic from '../pages/Discover/FormFBMechanic'
import FormFBWiring from '../pages/Discover/FormFBWiring'
import PageWiring from '../pages/Discover/pageWiring'
import PageMechanic from '../pages/Discover/pageMechanic'
import FormFinishing from '../pages/Discover/FormEndFinish'
import ComponentSchedule from '../pages/Discover/componentSchedule'
import ComponentRealized from '../pages/Discover/componentRealized'
import BusbarOrder from '../pages/Discover/busbarOrder' 
import BusbarSchedule from '../pages/Discover/busbarSchedule'
import BusbarRealized from '../pages/Discover/busbarRealized'
import ConstructionOrder from '../pages/Discover/constructionOrder'
import ConstructionSchedule from '../pages/Discover/constructionSchedule'
import ConstructionRealized from '../pages/Discover/constructionRealized'
import LayoutingStart from '../pages/Discover/fabLayoutingStart'
import LayoutingFinish from '../pages/Discover/fabLayoutingFinish'
import MechanicStart from '../pages/Discover/fabMechanicStart'
import MechanicFinish from '../pages/Discover/fabMechanicFinish'
import WiringFinish from '../pages/Discover/fabWiringFinish'
import WiringStart from '../pages/Discover/fabWiringStart'
import TestReport from '../pages/Discover/endTested'
import DeliveryReport from '../pages/Discover/endDelivery'
import PanelNameInputEdit from '../pages/Home/panelNameInputEdit'
import ProjectList from '../pages/Home/ProjectList'
import MemoView from '../pages/Home/MemoView'
import MemoEdit from '../pages/Home/MemoEdit'
import PanelStatus from '../pages/Home/panelStatus'
import TableShopdrawing from '../pages/Discover/tableShopdrawing.js'
import TableConstruction from '../pages/Discover/tableConstruction.js'
import TableBusbar from '../pages/Discover/tableBusbar.js'
import PageShopdrawing from '../pages/Discover/pageShopdrawing.js'
import PageProcurement from '../pages/Discover/pageProcurement.js'
import TableComponent from '../pages/Discover/tableComponent.js'
import PageFabrication from '../pages/Discover/pageFabrication.js'
import PageFinishing from '../pages/Discover/pageFinishing.js'
import TableFinishing from '../pages/Discover/tableFinishing.js'
import TableLayout from '../pages/Discover/tableLayout.js'
import TableWiring from '../pages/Discover/tableWiring.js'
import TableMech from '../pages/Discover/tableMech.js'
import FormShopdrawingSales from '../pages/Discover/FormShopdrawingSales.js'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SecuredNav = () => {
  return (
    <Stack.Navigator initialRouteName='MainApp'>
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false}}/>
      
      <Stack.Screen name="MemoPage" component={MemoPage} options={{ headerShown: false}}/>
      <Stack.Screen name="MemoView" component={MemoView} />
      <Stack.Screen name="MemoCreate" component={MemoCreate} options={{ headerShown: false}}/>
      <Stack.Screen name="MemoEdit" component={MemoEdit} />
      <Stack.Screen name="ProjectCreate" component={ProjectCreate}options={{ headerShown: false}}/>
      <Stack.Screen name="PanelNameInput" component={PanelNameInput} options={{ headerShown: false}}/>
      <Stack.Screen name="ProjectList" component={ProjectList} options={{ headerShown: false}}/>

      <Stack.Screen name="SD_Submission" component={SD_Submission} options={{ headerShown: false}}/>
      <Stack.Screen name="SD_Approval" component={SD_Approval} options={{ headerShown: false}}/>
      <Stack.Screen name="SD_Revisi" component={SD_Revisi} options={{ headerShown: false}}/>

      <Stack.Screen name="ProjectDetails" component={ProjectDetails} options={{ headerShown: false}}/>
      <Stack.Screen name="ProjectStatus" component={ProjectStatus} options={{ headerShown: false}}/>
      <Stack.Screen name="PanelStatus" component={PanelStatus} options={{ headerShown: false}}/>

      <Stack.Screen name="ProjectDetailsEdit" component={ProjectDetailsEdit} options={{ headerShown: false}}/>
      <Stack.Screen name="PanelNameInputEdit" component={PanelNameInputEdit} options={{ headerShown: false}}/>
      
      <Stack.Screen name="FormShopdrawingSales" component={FormShopdrawingSales} options={{ headerShown: false}}/>
      <Stack.Screen name="FormShopdrawing" component={FormShopdrawing} options={{ headerShown: false}}/>
      <Stack.Screen name="FormProcurement" component={FormProcurement} options={{ headerShown: false}}/>
      <Stack.Screen name="FormFabrication" component={FormFabrication} options={{ headerShown: false}}/>
      <Stack.Screen name="FormPOComponent" component={FormPOComponent} options={{ headerShown: false}}/>
      <Stack.Screen name="FormPOConstruction" component={FormPOConstruction} options={{ headerShown: false}}/>
      <Stack.Screen name="FormPOBusbar" component={FormPOBusbar} options={{ headerShown: false}}/>
      <Stack.Screen name="FormFBLayouting" component={FormFBLayouting} options={{ headerShown: false}}/>
      <Stack.Screen name="FormFBMechanic" component={FormFBMechanic} options={{ headerShown: false}}/>
      <Stack.Screen name="FormFBWiring" component={FormFBWiring} options={{ headerShown: false}}/>
      <Stack.Screen name="FormFinishing" component={FormFinishing} options={{ headerShown: false}}/>

      <Stack.Screen name="PageComponent" component={PageComponent} options={{ headerShown: false}}/>
      <Stack.Screen name="PageConstruction" component={PageConstruction} options={{ headerShown: false}}/>
      <Stack.Screen name="PageBusbar" component={PageBusbar} options={{ headerShown: false}}/>
      <Stack.Screen name="PageLayouting" component={PageLayouting} options={{ headerShown: false}}/>
      <Stack.Screen name="PageMechanic" component={PageMechanic} options={{ headerShown: false}}/>
      <Stack.Screen name="PageWiring" component={PageWiring} options={{ headerShown: false}}/>

      <Stack.Screen name="ComponentOrder" component={ComponentOrder} options={{ headerShown: false}}/>
      <Stack.Screen name="ComponentSchedule" component={ComponentSchedule} options={{ headerShown: false}}/>
      <Stack.Screen name="ComponentRealized" component={ComponentRealized} options={{ headerShown: false}}/>
            
      <Stack.Screen name="BusbarOrder" component={BusbarOrder} options={{ headerShown: false}}/>
      <Stack.Screen name="BusbarSchedule" component={BusbarSchedule} options={{ headerShown: false}}/>
      <Stack.Screen name="BusbarRealized" component={BusbarRealized} options={{ headerShown: false}}/>

      <Stack.Screen name="ConstructionOrder" component={ConstructionOrder} options={{ headerShown: false}}/>
      <Stack.Screen name="ConstructionSchedule" component={ConstructionSchedule} options={{ headerShown: false}}/>
      <Stack.Screen name="ConstructionRealized" component={ConstructionRealized} options={{ headerShown: false}}/>
      
      <Stack.Screen name="LayoutingStart" component={LayoutingStart} options={{ headerShown: false}}/>
      <Stack.Screen name="LayoutingFinish" component={LayoutingFinish} options={{ headerShown: false}}/>
      <Stack.Screen name="MechanicStart" component={MechanicStart} options={{ headerShown: false}}/>
      <Stack.Screen name="MechanicFinish" component={MechanicFinish} options={{ headerShown: false}}/>
      <Stack.Screen name="WiringStart" component={WiringStart} options={{ headerShown: false}}/>
      <Stack.Screen name="WiringFinish" component={WiringFinish} options={{ headerShown: false}}/>
      
      <Stack.Screen name="DeliveryReport" component={DeliveryReport} options={{ headerShown: false}}/>
      <Stack.Screen name="TestReport" component={TestReport} options={{ headerShown: false}}/>
      
      <Stack.Screen name="TableShopdrawing" component={TableShopdrawing} options={{ headerShown: false}}/>
      <Stack.Screen name="TableConstruction" component={TableConstruction} options={{ headerShown: false}}/>
      <Stack.Screen name="TableBusbar" component={TableBusbar} options={{ headerShown: false}}/>
      <Stack.Screen name="TableComponent" component={TableComponent} options={{ headerShown: false}}/>
      <Stack.Screen name="TableLayout" component={TableLayout} options={{ headerShown: false}}/>
      <Stack.Screen name="TableMech" component={TableMech} options={{ headerShown: false}}/>
      <Stack.Screen name="TableWiring" component={TableWiring} options={{ headerShown: false}}/>
      <Stack.Screen name="TableFinishing" component={TableFinishing} options={{ headerShown: false}}/>
      
      <Stack.Screen name="PageShopdrawing" component={PageShopdrawing} options={{ headerShown: false}}/>
      <Stack.Screen name="PageProcurement" component={PageProcurement} options={{ headerShown: false}}/>
      <Stack.Screen name="PageFabrication" component={PageFabrication} options={{ headerShown: false}}/>
      <Stack.Screen name="PageFinishing" component={PageFinishing} options={{ headerShown: false}}/>
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
  return (
    <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
        <Stack.Screen name="SecuredNav" component={SecuredNav} options={{ headerShown: false}}/>
        <Stack.Screen name="PublicNav" component={PublicNav} options={{ headerShown: false}}/>
      
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}options={{ headerShown: false}}/>
        <Stack.Screen name="Profile Edit" component={ProfileEdit}options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}
export default Router;


const styles = StyleSheet.create({})