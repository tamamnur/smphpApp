import { View, ScrollView, Image, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LogoForLogin } from '../../assets'
import InputForm from '../../components/TextInput'
import Button from '../../components/Button'
import SignMenu from '../../components/SignMenu'
import { BiruKu, WarnaPutih } from '../../utils/constant'

const Login = ({navigation}) => {
  useEffect(() => {
    setTimeout( () => {
      navigation.replace("Signup");
    }, 300)
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState ('');

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF', width: 400}}>
      <StatusBar backgroundColor={WarnaPutih} barStyle="dark" />
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
        <Image source ={LogoForLogin} />
      </View>
      
        <InputForm set={email} state={setEmail} placeholder='username'/>
        <InputForm set={password} state={setPassword} placeholder='password' 
          secureTextEntry/>

      <Button text="Login" color={BiruKu} />
      <SignMenu />

    </ScrollView>


    );
}

export default Login;