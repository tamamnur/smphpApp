import {Dimensions} from 'react-native';
import {BiruKu} from './constant';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export const DiscTitle = {
  marginLeft: 10,
  // fontSize: 30,
  fontSize: height*.032,
  fontFamily: 'Acme-Regular',
  color: BiruKu,
  marginBottom:10
};
export const BigTitle = {
  textAlign: 'center',
  fontSize: height * 0.026,
  fontFamily: 'Poppins-Bold',
  color: BiruKu,
};
export const title = {
  fontFamily: 'Poppins-SemiBold',
  fontSize: height * 0.022,
  paddingLeft: 3,
  color: BiruKu,
  textAlign: 'center',
};
export const subTitle = {
  fontFamily: 'Poppins-MediumItalic',
  fontSize: height * 0.02,
  paddingLeft: 3,
  color: BiruKu,
};
export const left = {
  fontFamily: 'Poppins-Medium',
  fontSize: 15,
  marginBottom: 3,
  height: 35,
  width: '100%',
  paddingVertical: 6.5,
  color: BiruKu,
};
export const right = {
  fontFamily: 'Poppins-Medium',
  fontSize: 15,
  borderWidth: 1,
  borderColor: BiruKu,
  borderRadius: 5,
  marginBottom: 5,
  marginLeft: 5,
  height: 35,
  padding: 7,
  color: BiruKu,
};
export const unvailable = {
  fontFamily: 'Poppins-Italic',
  fontSize: 15,
  textAlign: 'center',
  color: BiruKu,
  marginHorizontal: 30,
  padding: 10,
  borderWidth: 1,
  borderColor: BiruKu,
};
export const txtInput = {
  borderWidth: 1,
  borderColor: BiruKu,
  borderRadius: 5,
  height: 33,
  padding: -10,
  marginVertical: 4,
  fontSize: 13,
  marginLeft: 5,
};
export const dropdownSugesstion = {
  borderWidth: 1,
  borderColor: BiruKu,
  borderTopColor: '#fff',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  backgroundColor: '#E8E8E8',
  marginLeft: 6,
  position: 'absolute',
  flex: 1,
  top: 35,
  width: '98%',
  zIndex: 1,
};
export const sugesstion = {
  fontFamily: 'Poppins-Medium',
  fontSize: 14,
  color: BiruKu,
  marginHorizontal: 5,
};
export const errorTxt = {
  color: 'red',
  fontSize: 13,
  textAlign: 'center',
  marginBottom: 10,
  marginTop: -10,
  marginHorizontal: 20,
};
export const descOnPages = {
  marginHorizontal: 15,
  marginTop: 10,
  textAlign: 'center',
  fontSize: 16,
  fontFamily: 'Poppins-Medium',
  color: BiruKu,
};
export const wrapperOnPagePro = {
  alignItems: 'center',
  backgroundColor: '#E5E5E5',
  paddingVertical: 20,
  paddingHorizontal: 30,
  marginHorizontal: 20,
  borderWidth: 1.5,
  borderRadius: 20,
  borderColor: BiruKu,
};
export const wrapperOnPagePre = {
  alignItems: 'center',
  backgroundColor: '#E5E5E5',
  // paddingVertical: 15,
  // paddingHorizontal: 10,
  marginHorizontal: 5,
  borderColor: BiruKu,
  borderWidth: 1.5,
  // width: '95%'
};
export const names = {
  fontFamily: 'Poppins-Medium',
  // fontSize: 13,
  fontSize: height*0.015,
  color: BiruKu,
  textAlignVertical: 'center',
  paddingLeft: 4,
  marginRight: -1,
  height: 28,
};
export const status = {
  // fontFamily: 'Poppins-Regular',
  // fontSize: 12,
  fontSize: height*0.014,
  color: BiruKu,
  textAlignVertical: 'center',
  textAlign: 'center',
  borderWidth: 1,
  borderColor: BiruKu,
  height: 30,
  width: '16%',
};
export const area = {
  backgroundColor: '#EDEDED',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: BiruKu,
  marginVertical: 1,
  marginLeft: 5,
  marginRight: -5,
  elevation: 1,
  height: 33,
};
export const pickerItem = {
  fontSize: 16,
  fontFamily: 'Poppins-Medium',
  color: BiruKu,
};
export const titleIcon= {
  fontFamily: 'Poppins-Medium',
  fontSize: height * 0.02,
  color: BiruKu,
  alignSelf: 'center',
};
export const wrapper = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginHorizontal: 20,
  marginTop: -10,
  marginBottom: 30,
};
export const icon = {
  borderWidth: height * 0.0035,
  borderColor: BiruKu,
  borderRadius: 10,
  width: width*.4,
  padding: 20,
  marginBottom: 15
};
export const iconSize = height * 0.1;
export const iconDisc = height * 0.15;
