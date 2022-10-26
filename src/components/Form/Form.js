import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const Form = () => {
  render () {
    return (
    <View style={styles.container}>
      <TextInput style={styles.inputBox}
      underlineColorAndroid="#545454"
      placeholder="Username"
      placeholderTextColor={"#545454"}
      selectionColor="#FFF"
      keyboardType='email-address'
      onSubmitEditing={()=> this.password.focus()}
      />
      <TextInput style={styles.inputBox}
      underlineColorAndroid="#545454"
      placeholder="Password"
      secureTextEntry={true}
      selectionColor="#FFF"
      ref={(input) => this.password = input}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{this.props.type}</Text>
      </TouchableOpacity>
    </View>
  )
}
}
export default Form

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox:{
        width: 300,
        backgroundColor:"#DEDEDE",
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize:15,
        color:"#FFF",
        marginVertical:10,
    },
    button:{
        width: 300,
        backgroundColor: "#000",
        borderRadius: 20,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText:{
        fontSize: 16,
        fontWeight: "500",
        color: "#FFF",
        textAlign: 'center'
    }
})