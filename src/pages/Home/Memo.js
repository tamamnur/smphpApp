import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { BiruKu } from '../../utils/constant'

const ListMemo = (props) => {
    return(
        <View style={styles.recap}>
            <TouchableOpacity>
                <Text style={styles.projectName}>
                    {props.projectName} </Text></TouchableOpacity>
                <Text style={styles.status}>
                    Status {props.status}</Text>
                 <Text style={styles.update}>
                    {props.update}</Text>
        </View>
    )
} 
const Memo = () => {
    return (
        <View style={styles.MemoContainer}>
            <View style={styles.titleWrap}>
                <Text style={styles.title}>Memo</Text>
            </View>
            <ScrollView style={styles.select}>
                <ListMemo 
                projectName="Sanbe Farma" 
                status="Shopdrawing -- Submission"
                update="20-07-2022"/>
                <ListMemo
                projectName="Cluster Uptown Lippo" 
                status="Procurement -- Construction"
                update="20-07-2022"/>
                <ListMemo 
                projectName="Sanbe Farma" 
                status="Shopdrawing -- Submission"
                update="20-07-2022"/>
                <ListMemo
                projectName="Cluster Uptown Lippo" 
                status="Procurement -- Construction"
                update="20-07-2022"/>

            </ScrollView>
        </View>
    )
}

export default Memo;

const styles = StyleSheet.create({
    MemoContainer:{
        width: '98%',
        height: '27%',
        borderRadius: 20,
        marginTop: 10,
        marginHorizontal: 4,
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
        marginTop: 15
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