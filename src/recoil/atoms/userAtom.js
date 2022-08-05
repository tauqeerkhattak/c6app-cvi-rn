import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  atom,
} from 'recoil';

const localForageEffect = key => ({setSelf, onSet}) => {
  setSelf(AsyncStorage.getItem(key).then(savedValue =>
    savedValue != null
      ? JSON.parse(savedValue)
      : null // Abort initialization if no value was stored
  ));

  // Subscribe to state changes and persist them to localForage
  onSet((newValue, _, isReset) => {
    isReset
      ? AsyncStorage.removeItem(key)
      : AsyncStorage.setItem(key, JSON.stringify(newValue));
  });
};

const homeState = atom({
  key: 'homeState', // unique ID (with respect to other atoms/selectors)
  default: '1', // default value (aka initial value)
});

export const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: '00000',
  effects: [
    localForageEffect('current_user'),
  ]
});

export const apiTokenState = atom({
  key: 'CSAPITOKEN',
  default: {token: '', refreshToken: ''},
  effects: [
    localForageEffect('CSAPITOKEN'),
  ]
});