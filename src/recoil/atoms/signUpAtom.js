import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  atom,
} from 'recoil';

export const signUpInfoState = atom({
  key: 'signUpInfoState', // unique ID (with respect to other atoms/selectors)
  default: { phone:'',
             name: '',
             phoneCountryCode: 'SG',
             phoneCountryName: 'Singapore',
             phoneCallingCode: ['65'],
             userCountryCode: 'SG',
             userCountryName: 'Singapore',
             password: ''}, // default value (aka initial value)
});