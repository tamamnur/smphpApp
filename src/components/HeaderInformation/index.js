import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IconDefaultUser, IconUserSmall} from '../../assets';
import {BiruKu} from '../../utils/constant';
import moment from 'moment';

const HeaderInformation = () => {
  const [date] = useState(moment);

  useEffect(() => {
    var date = new Date().getDate();
  });

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <IconDefaultUser />
        <Text style={styles.user}>Admin</Text>
      </View>
      <View style={styles.waktu}>
        <Text style={styles.tanggal}>{date.format('dddd, DD-MMM-YYYY')}</Text>
      </View>
    </View>
  );
};

export default HeaderInformation;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    padding: 5,
    color: BiruKu,
  },
  waktu: {
    alignContent: 'center',
  },
  tanggal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: BiruKu,
  },
});