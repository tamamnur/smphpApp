import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { BiruKu } from '../utils/constant';
import { LogoForSignUp, LogoSmpHP } from '../assets';

const Title2 = ({TxtTitle, SubTitle}) => {
        return(
          <View >
                <Text style={styles.TxtTitle}>{TxtTitle}</Text>
                <Text style={styles.SubTitle}>{SubTitle}</Text>                
          </View>
        );
      };

export default Title2;

const styles=StyleSheet.create({
  TxtTitle:{
    marginTop: 25, 
    textAlign: 'center',
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: BiruKu
  },
  SubTitle:{ 
      marginBottom: 8,
      textAlign: 'center',
      fontFamily: "Poppins-Italic",
      fontSize: 13,
      color: BiruKu
  }
});