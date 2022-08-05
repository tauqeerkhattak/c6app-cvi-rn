import * as React from 'react';
import * as RN from 'react-native';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { currentUserIDState } from '../recoil/atoms/userAtom'
import { getHomeSampleList } from '../recoil/selectors/homeSelector'

function SettingTabScreen({ route, navigation }) {
  const { itemId } = route.params
  
  const [currentUserID, setCurrentUserID] = useRecoilState(currentUserIDState)
  // const homeSampleList = useRecoilValue(getHomeSampleList);

  React.useState(() => {
    if (route.params?.postsomething) {
      
    }
  }, [route.params?.postsomething]);

  return (
    <RN.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <RN.Text>Setting Screen</RN.Text>
      <RN.Text>Current User ID: {currentUserID}</RN.Text>
      <RN.Text>{route.params?.postsomething}</RN.Text>
      <RN.Button
        title = {"Go to Details with itemId" + itemId}
        onPress={() => { navigation.navigate('Details') }}
      />
    </RN.View>
  );
}

export default SettingTabScreen;