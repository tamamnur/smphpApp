import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconAdd, IconSD_Approv, IconSD_Pengajuan, IconSD_Revisi } from '../assets'
import { WarnaAbu, WarnaPutih } from '../utils/constant'

const SDrawing = ({title, active, onPress}) => {
    const Icon = () => {
        if(title === "Pengajuan  Shopdrawing") return <IconAdd />;
        if(title === "Approval Shopdrawing") return <IconSD_Approv />;
        if(title === "Revisi Shopdrawing") return <IconSD_Revisi />;
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
        backgroundColor:active ? WarnaAbu: '#CECECE',
        borderWidth: active ? 0 : 3,
        borderColor: active ? 0:'gray',
        marginHorizontal: 8,
        marginTop: 45,

    }),
    titleText: active => ({
        margin: 6,
        textAlign: 'center',
        fontWeight: 'bold',
        color:active ? '#000' : 'gray',
    }),
    icon:{
        alignItems: 'center',
        marginTop: -35,

    }
})