import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../../utils/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputProgress from '../../components/inputProgress';

const PageComponent = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        <IconBack onPress={() => navigation.goBack()} style={{marginTop: 10, marginLeft: 30}} />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center', marginVertical: 50}}>
        <Text style={styles.title}>COMPONENT{'\n'}- MONITORING -</Text>
      </View>
      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=> navigation.navigate('ComponentOrder')}>
          <View style={{alignItems: 'center', backgroundColor: '#E5E5E5', paddingVertical: 25, borderWidth: 1, borderColor: BiruKu}}>
            <AntDesign name="profile" color={BiruKu} size={50} />
            <Text style={styles.desc}>Purchase</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ComponentSchedule')}>
          <View style={{alignItems: 'center', backgroundColor: '#E5E5E5', paddingVertical: 25, borderWidth: 1, borderColor: BiruKu, marginHorizontal: 10}}>
            <AntDesign name="hourglass" color={BiruKu} size={50} />
            <Text style={styles.desc}>Schedule</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ComponentRealized')}>
          <View style={{alignItems: 'center', backgroundColor: '#E5E5E5', paddingVertical: 25, borderWidth: 1, borderColor: BiruKu}}>
            <AntDesign name="carryout" color={BiruKu} size={50} />
            <Text style={styles.desc}>Realized</Text>
          </View>
        </TouchableOpacity>
      </View>
        <InputProgress onPress={()=> navigation.navigate('FormPOComponent')}/>
    </View>
  );
};

export default PageComponent;
const styles = StyleSheet.create({
  desc: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
  },
  title: {
    marginHorizontal: 20,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: BiruKu,
  },
});