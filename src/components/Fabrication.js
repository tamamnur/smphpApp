import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BiruKu, Darkred, WarnaAbu } from '../utils/constant'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Fabrication = ({title, active, onPress}) => {
  const Icon = () => {
      if(title === "Layouting") return <AntDesign name='layout' size={50}  color={Darkred}/>;
      if(title === "Mechanic") return <AntDesign name='tool' size={50} color={'#000'} />;
      if(title === "W i r i n g") return <AntDesign name='fork' size={50}  color={'blue'}/>;
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
export default Fabrication
const styles = StyleSheet.create({
  pilihan:active => ({
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor:active ? WarnaAbu: '#CECECE',
      borderWidth: active ? 0 : 3,
      borderColor: BiruKu,
      marginRight: 12,
      marginTop: 20,
  }),
  plate: active => ({
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    color: BiruKu,
    fontFamily: 'Poppins-Medium',
  }),
  icon:{
    alignItems:'center',
    marginTop:3,
    marginHorizontal: 8,
  }
})