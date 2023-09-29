import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BiruKu } from '../utils/constant'
const {width} = Dimensions.get('window');

const InfoProject = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.left}>
            <Text style={styles.label}>{props.label}</Text>
        </View>
        <View style={styles.right}>
            <Text style={styles.value}>{props.value}</Text>
        </View>
    </View>
  )
}

export default InfoProject

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center', // Pusatkan elemen vertikal
      },
      left: {
        // borderWidth: 1,

        // flex: 1, // Bagian kiri mengambil setengah lebar
        // marginRight: 10, // Spasi antara leftContainer dan rightContainer
        width: width*0.23,
    },
    right: {
        // flex: 1, // Bagian kanan mengambil setengah lebar
        // marginLeft: 10, // Spasi antara leftContainer dan rightContainer
        width: width*0.7,
        // borderWidth: 2,
        // alignItems

      },
      label: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginVertical: 4,
        padding: 2,
        color: BiruKu,
        height: 25,
        textAlignVertical: 'center'

      },
      value: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        borderWidth: 1,
        borderColor: BiruKu,
        borderRadius: 2,
        height: 25,
        padding: 2,
        paddingHorizontal: 5,
        // marginVertical: 14,
        color: BiruKu,
        textAlignVertical: 'center'
      },
})