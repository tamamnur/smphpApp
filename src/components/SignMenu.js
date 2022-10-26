import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BiruKu } from "../utils/constant";

const SignMenu = props => {
    return (
     <View style={{
        flexDirection: 'row',
        marginHorizontal: 20,         
        marginTop:5,
        paddingHorizontal: 40}}>
         <TouchableOpacity style={{flex: 1, alignItems:'flex-start'}}>
          <Text style={{fontWeight: 'bold', color: BiruKu}}>
            Forgot Password</Text></TouchableOpacity>        
         <TouchableOpacity style={{flex: 1, alignItems:'flex-end'}}>
          <Text style={{fontWeight: 'bold', color: BiruKu}}>
            Signup</Text></TouchableOpacity>
      
      </View>
    );
    };
export default SignMenu;