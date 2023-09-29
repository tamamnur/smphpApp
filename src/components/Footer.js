import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BiruKu } from '../utils/constant';

const EndOf = () => {
  return (
    <View>
      <Text style={styles.endOfPage}>-- o O o --</Text>
    </View>
  );
};

export default EndOf

const styles = StyleSheet.create({
  endOfPage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: BiruKu,
    textAlign: 'center',
    marginTop: 15,
    paddingTop: 5,
    marginHorizontal: 80,
    borderTopWidth: 1,
    borderColor: BiruKu,
  },
})