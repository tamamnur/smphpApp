import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconAdd, IconSD_Approv, IconSD_Pengajuan, IconSD_Revisi } from '../assets'
import { WarnaAbu, WarnaPutih, BiruKu } from '../utils/constant'

const width = Dimensions.get('window').width;

const SDrawing = ({title, active, onPress}) => {
    const Icon = () => {
        if(title === "Submission") return <IconSD_Pengajuan />;
        if(title === "Approval") return <IconSD_Approv />;
        if(title === "Revision") return <IconSD_Revisi />;
        return <IconSD_Pengajuan />
    }
    return (
    <TouchableOpacity style={[styles.pilihan(active), {width: width*0.28}]} onPress={onPress}>
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
        borderWidth: 3,
        borderColor: BiruKu,
        marginHorizontal: 4,
        marginTop: 45,
    }),
    titleText: active => ({
        fontFamily: 'Poppins-Medium',
        color: BiruKu,
        // margin: 5,
        textAlign: 'center',
    }),
    icon:{
        alignItems: 'center',
        marginTop: -40,
        // marginHorizontal: 10
    }
})