import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconKonsutruksi, IconKomponen, IconCu } from './../assets'
import { WarnaAbu, WarnaPutih  } from './../utils/constant'

const Procurement = ({title, active, onPress}) => {
    const Icon = () => {
        if(title === "Konstruksi") return <IconKonsutruksi />;     //<FontAwesomeIcon icon="fa-thin fa-buildings" />
        if(title === "Busbar Cu") return <IconCu />;
        if(title === "Komponen") return <IconKomponen />;
    }
    return (
    <TouchableOpacity style={styles.pilihan(active)} onPress={onPress}>
      <View style={styles.icon}>
          <Icon />
          <Text style={styles.plate(active)} onPress={onPress}>{title} </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Procurement

const styles = StyleSheet.create({
    pilihan:active => ({
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor:active ? WarnaAbu: '#CECECE',
        borderWidth: active ? 0 : 3,
        borderColor: active ? 0:'gray',
        marginHorizontal: 8,
        marginTop: 20,
    }),
    plate: active => ({
      marginTop: 6,
      paddingVertical: 2,
      paddingHorizontal: 5,
      borderRadius: 10,
      color: active ? '#000' : 'gray',
      fontWeight : 'bold',
    }),

    icon:{
      alignItems:'center',
      marginTop:12,
      marginHorizontal: 8,
    }
})