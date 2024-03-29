import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconKonsutruksi, IconKomponen, IconCu } from './../assets'
import { BiruKu, WarnaAbu, WarnaPutih  } from './../utils/constant'
const width = Dimensions.get('window').width;
const Procurement = ({title, active, onPress}) => {
    const Icon = () => {
        if(title === "Konstruksi") return <IconKonsutruksi />;     //<FontAwesomeIcon icon="fa-thin fa-buildings" />
        if(title === "Busbar Cu") return <IconCu />;
        if(title === "Komponen") return <IconKomponen />;
    }
    return (
    <TouchableOpacity style={[styles.pilihan(active), {width: width*0.285}]} onPress={onPress}>
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
        borderColor: active ? 0: BiruKu,
        marginHorizontal: 5,
        marginTop: 20,
    }),
    plate: active => ({
      paddingBottom: 6,
      borderRadius: 10,
      color: BiruKu,
      fontFamily: 'Poppins-Medium',
    }),
    icon:{
      alignItems:'center',
      marginTop: 8,
    }
})