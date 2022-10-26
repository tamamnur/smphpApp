import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IconDefaultUser, IconUserSmall } from '../../assets'
import { BiruKu } from '../../utils/constant'
import moment from 'moment'

const HeaderInformation = () => {
  const [currentDate, setcurrentDate] = useState('')
  const [currentDay, setcurrentDay] = useState('')
  const [date] = useState(moment);

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth()+1
    var year = new Date().getFullYear()
    setcurrentDate(
      date + ' - ' + month + ' - ' + year)
    },
    [])

  // useEffect(()=>{
  //   var day = new Date().getDay()
  //   setcurrentDay(day)
  //   var dayMoment = Moment().format('dddd')    
  // },
  // [])

   return (
    <View style={styles.container}>
        <View style={styles.userInfo}>
            <IconDefaultUser />
            <Text style={styles.user}>Admin</Text>
        </View>
      <View style={styles.waktu}>
        {/* <Text style={styles.hari}>{currentDay}</Text> */}
        {/* <Text style={styles.tanggal}>{currentDate}</Text> */}
        {/* <Text style={styles.tanggal}>{moment}</Text> */}
        <Text style={styles.tanggal}>{date.format("DD - MMMM - YYYY")}</Text>

      </View>
    </View> 
  )
}

export default HeaderInformation

const styles = StyleSheet.create({
  container:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    
  },
  userInfo:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  user:{
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    padding: 5,
    color: BiruKu
  },
  waktu:{
    alignContent:'center',
    
  },
  hari: {
    fontSize:18
  },
  tanggal :{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: BiruKu
  }  
  

})