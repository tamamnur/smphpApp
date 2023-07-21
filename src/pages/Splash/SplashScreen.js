import { StyleSheet, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import { LogoCubicleWT } from '../../assets/icon';
import auth from '@react-native-firebase/auth'

const Splash = ({ navigation}) => {
  // // useEffect(() => {
  //   // setTimeout( () => {
  //     navigation.replace("MainApp");
  //     // navigation.replace("Login")
  //   }, 1000)
  // }, [navigation]);

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    
    useEffect(() => {
     if (initializing === false) {
      if (user ) {
        navigation.replace("SecuredNav");
        // setTimeout( () => {
        // }, 1000)
      } else {
        navigation.replace("PublicNav");
        // setTimeout( () => {
        // }, 1000)
      }
     }
    }, [user, initializing] 
    )
  
  return (
    <View style={styles.background}>
      <LogoCubicleWT/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  }
})