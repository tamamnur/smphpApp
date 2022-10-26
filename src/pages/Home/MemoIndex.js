import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { BiruKu } from '../../utils/constant'
import moment from 'moment'

const MemoIndex = (props) => {
    return (
        <View style={styles.MemoContainer}>
            <View style={styles.titleWrap}>
                <Text style={styles.title}>{props.proj}</Text>
                <Text style={styles.subTitle}>{props.day}</Text>
            </View>
            <View style={styles.recap}>
                <Text style={styles.from}>
                    From :  {props.from} </Text>
                <Text style={styles.for}>
                    For     :  {props.for}</Text>
                <Text style={styles.for}>
                    Due    :  {props.due}</Text>
                <Text style={styles.message}>     
                    {props.message}</Text>
            </View>
        </View>
    )
}

export default MemoIndex;

const styles = StyleSheet.create({
    MemoContainer:{
        width: '90%',
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 20,
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
        fontSize: 18,
        color: '#FFF',
        marginHorizontal: 20
    },
    subTitle:{
        fontFamily: 'Acme-Regular',
        color: '#FFF',
        marginHorizontal: 20,
        textAlign: 'right',
        marginTop: -16
    },
    recap:{
        marginHorizontal: 15,
        marginVertical: 6
    },
    from:{
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        color: BiruKu,
        marginTop: 6
    },
    for:{
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        color: BiruKu,
    },
    message:{
        color: BiruKu,
        fontFamily: "Poppins-Medium",
        fontSize: 11,
        textAlign: 'justify',
        marginTop: 10,
        marginHorizontal: 5
    },
})