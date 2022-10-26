
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native'
import React, { useState, useEffect, Component } from 'react'
import { LogoForSignUp } from '../../assets'
import Button from '../../components/Button'
import { BiruKu } from '../../utils/constant'
import FormInput from '../../components/FormInput'
import { Picker } from '@react-native-picker/picker' 
import CheckBox  from '@react-native-community/checkbox'
import InputData from '../../components/TextInput'

// const Signup = ({navigation}) => {
//     useEffect(() => {
//         setTimeout( () => {
    //           navigation.replace("MainApp");
    //         }, 300)
    //       }, [navigation]);

export default class Signup extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         division:'',
    //         fullname:'',
    //         username:'',
    //         password:''
    //     }
    // }

    // onChangeText = (namaState, value) => {
    //     this.setState({
    //         [namaState]: value
    //     })  
    // }

    // onSubmit = () => {
    //     console.log("Masuk Submit");
    // }


    
    
    
    // const [fullname, setFullname] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [division, setDivision] = useState();
    // const pilihDivisi = (label) => {setDivision(label)}
    
    
    render(){
    return (
      <ScrollView>
        <View style={{alignItems: 'flex-end', marginTop: 55, marginEnd: 40}}>
            <Image source ={LogoForSignUp} />
        </View>

        <Text style={styles.title}>REGISTER </Text>
        <Text style={styles.subTitle}>Division </Text>
        <View style={styles.area}>
            <Picker 
            // selectedValue={division} 
            // onValueChange={(label, index)=>pilihDivisi(label)}
            >
                <Picker.Item label="---" value ="" style={styles.pickStyl}/>
                <Picker.Item label="Admin" value ="admin" style={styles.pickStyl}/>
                <Picker.Item label="Drafter" value ="drafter" style={styles.pickStyl}/>
                <Picker.Item label="Logistics" value ="logistik" style={styles.pickStyl}/>
                <Picker.Item label="Production" value ="produksi" style={styles.pickStyl}/>
                <Picker.Item label="Sales" value ="sales" style={styles.pickStyl}/>
                <Picker.Item label="Direktur" value ="direktur" style={styles.pickStyl}/>
            </Picker>
        </View>

        <View style={styles.pages}>
            <InputData label="Fullname" />
            <InputData label="Username"  />
            <InputData label="Password" secureTextEntry={true}/>

        </View>
        {/* <Text style={styles.subTitle}>Fullname </Text>
        <FormInput set={fullname} state={setFullname}/>
        <Text style={styles.subTitle}>Username / Email </Text>
        <FormInput set={email} state={setEmail}/>
        <Text style={styles.subTitle}>Password </Text>
        <FormInput set={password} state={setPassword} secureTextEntry/> */}
        {/* <Text style={styles.subTitle}>Confirm Password </Text>
        <FormInput set={password} state={setPassword} secureTextEntry/> */}
        
        <View style={styles.checkBox}>
            <CheckBox 
            // disabled={false} 
            // value={ceklist} 
            // onValueChange={(newValue)=> 
            // setCeklist(newValue)}
            />
        <Text style={styles.Term}> 
        {/* {ceklist? "I agree":"I disagree"}  */}
        to all the Terms and Privacy Policy </Text>
        </View>
    

    
         <Button text="Create Account" color={BiruKu}/>
       </ScrollView>
   )}
}

const styles = StyleSheet.create({
    title:{
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 20,
        color: BiruKu,
        marginHorizontal: 35,
        marginVertical: 0
    },
    subTitle:{
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: BiruKu,
        marginStart: 35,
        marginTop: 10    
    },
    area:{
        backgroundColor: '#EDEDED', 
        borderRadius:5,
        borderWidth: 1.5,
        borderColor: BiruKu,
        marginHorizontal: 35,
        marginTop: 5,
        marginBottom: 20, 
        elevation: 9,
        height: 45,
        fontSize: 13,
        justifyContent: 'center'
    },
    pickStyl:{
        fontSize: 13
    },
    checkBox:{
        marginHorizontal: 30,
        marginTop: 10,
        flexDirection:'row'
    },
    Term:{
        color: BiruKu,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 5

    }
})