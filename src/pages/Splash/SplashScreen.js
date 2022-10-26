import { StyleSheet, View, Image} from 'react-native'
import React, {useEffect} from 'react'
import { LogoForSplash } from '../../assets/img';

const Splash = ({ navigation}) => {
  useEffect(() => {
    setTimeout( () => {
      navigation.replace("Signup");
    }, 300)
  }, [navigation]);

  return (
    <View style={styles.background}>
      <Image source={LogoForSplash} />
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