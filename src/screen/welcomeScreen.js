import * as React from 'react';
import * as RN from 'react-native';
import * as NB from 'native-base';

import _ from 'lodash';
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { theme } from '../common/csTheme'

const { width, height } = RN.Dimensions.get('window')

function WelcomeScreen({ route, navigation }) {
  const entries = _.range(1, 6, 1).map((ele) => {
    return {
      title: 'title',
      text: 'content',
    };
  });
  
  const renderItem = ({ item }) => {
    return (
      <RN.View style={styles.itemView}>
        <RN.Text style={styles.itemText}>{item.title}</RN.Text>
        <RN.Text>{item.text}</RN.Text>
      </RN.View>
    );
  };

  const [activeIndex, setActiveIndex] = React.useState(0);
  const carousel = React.useRef(null);

  function loginAction() {
    console.log('login action')
    navigation.navigate('Login')
  }

  function signupAction() {
    console.log('signup action')
    navigation.navigate('SignUpStep1')
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:theme.colors.screenBG}}>
      <NB.NativeBaseProvider theme={theme}>
        <NB.Center flex={1}>
          <NB.Heading mb={10}>Welcome</NB.Heading>
          <RN.View style={{marginBottom: 46, width:width, height:width}}>
            <Carousel
              ref={carousel}
              data={entries}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width}
              hasParallaxImages={true}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              // inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => setActiveIndex(index)}
            />

            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeIndex}
              containerStyle={styles.paginationContainer}
              dotColor={"rgba(255, 125, 0, 0.92)"}
              dotStyle={styles.paginationDot}
              inactiveDotColor={"#000"}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={carousel}
              tappableDots={!!carousel?.current}
            />
          </RN.View>
          <NB.Button mb={6} backgroundColor={'csPrimary.50'} rounded={'full'} width={width - 32} onPress={() => loginAction() }>
            <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'3xl'}>Login</NB.Text>
          </NB.Button>
          <NB.Button backgroundColor={'csPrimary.600'} rounded={'full'} width={width - 32} onPress={() => signupAction() }>
            <NB.Text color={'title.black'} fontSize={'xl'} lineHeight={'3xl'}>Sign Up</NB.Text>
          </NB.Button>
        </NB.Center>
      </NB.NativeBaseProvider>
    </SafeAreaView>
  )
  
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#efefef",
    paddingVertical: 50,
  },
  itemView: {
    backgroundColor: "floralwhite",
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  itemText: { fontSize: 30 },
  sliderView: {
    flex: 1,
    minHeight: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    marginTop: 15,
    overflow: "visible", // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  buttonView: {
    minHeight: 200,
    width: "60%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default WelcomeScreen;