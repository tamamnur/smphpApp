import {Dimensions} from 'react-native';
import {BiruKu} from './constant';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export const title = {
  fontFamily: 'Poppins-SemiBold',
  fontSize: height * 0.024,
  paddingLeft: 3,
  color: BiruKu,
};
export const subTitle = {
  fontFamily: 'Poppins-MediumItalic',
  fontSize: height*.02,
  paddingLeft: 3,
  color: BiruKu,
};
