import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconDiscover, IconDrawing, IconProcurement, IconProduction } from '../../assets'
import { WarnaAbu, WarnaPutih  } from '../../utils/constant'

const Layanan = ({title, active, onPress}) => {
    const Icon = () => {
        if(title === "Shopdrawing") return <IconDrawing />;
        if(title === "Procurement") return <IconProcurement />;
        if(title === "Pabrikasi") return <IconProduction />;
    }
    return (
    <TouchableOpacity style={styles.container(active)} onPress={onPress}>
      <View style={styles.icon}>
          <Icon />
          <Text style={styles.titleText(active)} onPress={onPress}>{title} </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Layanan

const styles = StyleSheet.create({
    container:active => ({
        alignItems: 'center',
        backgroundColor: WarnaAbu,
        borderRadius: 10,
        borderWidth: active ? 3 : 0,
    }),
    titleText:{
      paddingVertical:2,
      fontSize: 14,
      fontFamily: 'Arial-Bold',
      textAlign: 'center',
      
    },
    titleText: active => ({
      marginTop: 6,
      backgroundColor: WarnaAbu,
      paddingHorizontal: 5,
      color: active ? '#000' : WarnaPutih,
      borderRadius: 10
    }),

    icon:{
      alignItems:'center',
      marginTop:12,
      marginHorizontal: 8,
    }
})