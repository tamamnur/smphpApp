import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconAdd, IconSD_Approv, IconSD_Pengajuan, IconSD_Revisi } from '../assets'
import { WarnaAbu, WarnaPutih, BiruKu } from '../utils/constant'

const SDrawing = ({title, active, onPress}) => {
    const Icon = () => {
        if(title === "Submission") return <IconSD_Pengajuan />;
        if(title === "Approval") return <IconSD_Approv />;
        if(title === "Revision") return <IconSD_Revisi />;
        return <IconSD_Pengajuan />
    }
    return (
    <TouchableOpacity style={styles.pilihan(active)} onPress={onPress}>
      <View style={styles.icon}>
          <Icon />
          <Text style={styles.titleText(active)} onPress={onPress}>{title.replace(' ', '\n')}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SDrawing 

const styles = StyleSheet.create({

    pilihan:active => ({
        alignItems: 'center',
        borderRadius: 10,
        // backgroundColor:active ? WarnaAbu: '#CECECE',
        // borderWidth: active ? 0 : 3,
        // borderColor: active ? 0:'gray',
        borderWidth: 3,
        borderColor: BiruKu,
        marginHorizontal: 5,
        marginTop: 45,

    }),
    titleText: active => ({
        // fontFamily: 'Poppins-Medium',
        color: BiruKu,
        margin: 5,
        textAlign: 'center',
        color: BiruKu,
        fontFamily: 'Poppins-Medium',
    }),
    icon:{
        alignItems: 'center',
        marginTop: -40,
        marginHorizontal: 10
    }
})