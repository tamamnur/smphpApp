import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { BiruKu } from '../utils/constant';
import { LogoForSignUp } from '../assets';

const Title = ({TxtTitle, placeholder, secureTextEntry}) => {
        return(
          <View style={styles.container}>
            <View style={{alignItems: 'flex-end', marginTop: 35, marginEnd: 35}}>
                <Image source ={LogoForSignUp} /></View>
                <Text style={styles.TxtTitle}>{TxtTitle}</Text>
          </View>
        );
      };

export default Title;

const styles=StyleSheet.create({
  TxtTitle:{
    marginTop: 35, 
    marginEnd: 40,
    marginLeft: 45,
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: "Poppins-Black",
    fontSize: 16,
    color: BiruKu
  }
});