import {Dimensions} from 'react-native';
import {BiruKu} from './constant';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export const BigTitle = {
  textAlign: 'center',
  // fontSize: 25,
  fontSize: height * 0.033,
  fontFamily: 'Poppins-Bold',
  color: BiruKu,
};
export const title = {
  fontFamily: 'Poppins-SemiBold',
  fontSize: height * 0.024,
  paddingLeft: 3,
  color: BiruKu,
  textAlign: 'center'
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
  marginHorizontal: 20,
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
  paddingVertical: 25,
  marginHorizontal: 5,
  borderColor: BiruKu,
  borderWidth: 1.5,
}
