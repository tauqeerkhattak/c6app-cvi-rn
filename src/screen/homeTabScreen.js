import * as React from 'react';
import * as RN from 'react-native';
import * as NB from 'native-base'

import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import dynamicLinks from '@react-native-firebase/dynamic-links';

import { currentUserIDState, apiTokenState } from '../recoil/atoms/userAtom'
import { getHomeSampleList } from '../recoil/selectors/homeSelector'

import { theme } from '../common/csTheme'
import BCSectionListView from '../common/BCSectionListView'

import HomeSigninSignupHeader from '../component/homeSigninSignupHeader';
import HomeNearByHeader from '../component/homeNearByHeader';

import HomeCardCell from '../component/homeCardCell';

import FastImage from 'react-native-fast-image'

const { width, height } = RN.Dimensions.get('window')

const useMount = func => React.useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = React.useState(null);
  const [processing, setProcessing] = React.useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await RN.Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return { url, processing };
};

function HomeTabScreen({ route, navigation }) {
  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    console.log(link)
  };

  const { itemId } = route.params

  const [currentUserID, setCurrentUserID] = useRecoilState(currentUserIDState)
  const [apiToken, setApiToken] = useRecoilState(apiTokenState)

  // const homeSampleList = useRecoilValue(getHomeSampleList);

  const { url: initialUrl, processing } = useInitialURL();

  console.log(initialUrl)

  const data = [{
    title: "Cyan",
    data: ["cyan.100", "cyan.200", "cyan.300", "cyan.400", "cyan.500"]
  }, {
    title: "Yellow",
    data: ["yellow.100", "yellow.200", "yellow.300", "yellow.400", "yellow.500"]
  }, {
    title: "Violet",
    data: ["violet.100", "violet.200", "violet.300", "violet.400", "violet.500"]
  }];

  React.useState(() => {
    if (route.params?.postsomething) {

    }
  }, [route.params?.postsomething]);

  function toLoginAction() {
    navigation.navigate('Login')
  }

  function toSignupAction() {
    navigation.navigate('SignUpStep1')
  }

  function toEWalletAction () {
    navigation.navigate('EWalletScreen',);
  }

  React.useEffect(() => {
    RN.Linking.addEventListener('url', _handleOpenURL);
    return () => {
      RN.Linking.removeAllListeners('url');
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  const _handleOpenURL = link => {
    console.log(link)
    // Handle dynamic link inside your own application
    if (link.url === 'https://80e4-1-169-117-157.jp.ngrok.io/') {
      // ...navigate to your offers screen
      navigation.navigate('SignUpStep1')
    }
  };

  const DATA = [
    {
      title: "USER_INFO",
      data: []
    },
    {
      title: 'NEAR_BY',
      data: [1, 2, 3 ,4 ,4 ,6]
    }
  ];

  function renderSectionHeader({section}) {
    console.log(section)

    switch (section.title) {
      case 'USER_INFO':
        if (!!apiToken) {
          return (
            <NB.View/>
          )
        }
        return (
          <HomeSigninSignupHeader toLoginAction={toLoginAction}
                                  toSignupAction={toSignupAction}/>
        )
      case 'NEAR_BY':
        return (
          <HomeNearByHeader toEWalletAction={toEWalletAction}/>
        )
      default:
        return (
          <NB.View/>
        );
    }
  }

  function renderItem({...data}) {
    console.log(data)
    const {section, item , index} = data;

    return (
      <HomeCardCell item={item}
                    index={index} />
    )
  }

  function renderSeparator() {
    return (
        <NB.View flex={1} h={4} bgColor={'white'}/>
    )
  }
  return (
      <NB.NativeBaseProvider theme={theme}>
      <BCSectionListView
            data = {DATA}
            renderSectionHeader = {renderSectionHeader}
            renderItem = { renderItem }
            renderSeparator = { renderSeparator }
            sectionStyle={{contentContainerStyle:{flexDirection: 'row',flexWrap: 'wrap',}}}
        />
      </NB.NativeBaseProvider>
  );
}

export default HomeTabScreen;
