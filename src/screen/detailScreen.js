import * as React from 'react';
import * as RN from 'react-native';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { currentUserIDState, apiTokenState } from '../recoil/atoms/userAtom'

function DetailScreen({ navigation }) {

  const [currentUserID, setCurrentUserID] = useRecoilState(currentUserIDState)
  const [apiToken, setApiToken] = useRecoilState(apiTokenState)

  return(
    <RN.View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <RN.Text>Detail</RN.Text>
      <RN.Button
        title='Clean the user token'
        onPress={() => {
          setApiToken(null)
        }}
       />
    </RN.View>
  )
}

export default DetailScreen;