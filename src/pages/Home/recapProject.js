import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { Component } from 'react'
import { BiruKu } from '../../utils/constant'
import CreateProject from './createProject'
import { IconAdd } from '../../assets'

const Project = (props) => {
    return(
        <View style={styles.recap}>
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('CreateProject')}>
                <Text style={styles.projectName}>
                    {props.projectName} </Text></TouchableOpacity>
            <Text style={styles.status}>
                Status {props.status}</Text>
            <Text style={styles.update}>
                {props.update}</Text>
        </View>
    )
} 
const RecapProject = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrap}>
                <Text style={styles.title}>Progress Terkini</Text>
            </View>
            <TouchableOpacity style={styles.iconAdd}>
                <IconAdd />
            </TouchableOpacity>
            <ScrollView style={styles.select}>
                <Project 
                projectName="Sanbe Farma" 
                status="Shopdrawing -- Submission"
                update="20-07-2022"/>
                <Project 
                projectName="Sanbe Farma" 
                status="Shopdrawing -- Submission"
                update="20-07-2022"/>
                <Project 
                projectName="Sanbe Farma" 
                status="Shopdrawing -- Submission"
                update="20-07-2022"/>
                <Project 
                projectName="Cluster Uptown Lippo Cikarang" 
                status="Procurement -- Construction"
                update="21-07-2022"/>
                <Project 
                projectName="Cluster Uptown Lippo Cikarang" 
                status="Procurement -- Construction"
                update="21-07-2022"/>
                <Project 
                projectName="Cluster Uptown Lippo Cikarang" 
                status="Procurement -- Construction"
                update="21-07-2022"/>
                <Project 
                projectName="Cluster Uptown Lippo Cikarang" 
                status="Procurement -- Construction"
                update="21-07-2022"/>
                <Project 
                projectName="Cluster Uptown Lippo Cikarang" 
                status="Procurement -- Construction"
                update="21-07-2022"/>

            </ScrollView>
        </View>
    )
}

export default RecapProject;

const styles = StyleSheet.create({
    container:{
        width: '98%',
        height: '50%',
        borderRadius: 20,
        marginHorizontal: 4,
        marginBottom: 10,
        backgroundColor: '#F9F9F9',
        elevation: 10
    },
    titleWrap:{
        backgroundColor: '#84A2AA',
        height: 50,
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 100,
        elevation: 8
    },
    title:{
        fontFamily: 'Acme-Regular',
        fontSize: 20,
        color: '#FFF',
        marginHorizontal: 20
    },
    iconAdd:{
        alignItems: 'flex-end',
        marginHorizontal: 30,
        marginTop: 8
    },
    recap:{
        marginHorizontal: 15,
        marginVertical: 6
    },
    projectName:{
        color: BiruKu,
        fontFamily: "Poppins-Medium",
        fontSize: 12
    },
    status:{
        color: BiruKu,
        fontFamily: "Poppins-Medium",
        fontSize: 10,
        marginHorizontal: 5

    },
    update:{
        color: BiruKu,
        fontFamily: "Poppins-Medium",
        fontSize: 11,
        textAlign: 'right',
        marginTop: -20,
        marginEnd: 10
    }


})