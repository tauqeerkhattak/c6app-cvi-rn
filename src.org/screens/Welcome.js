import { Button } from "native-base";
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { range } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Title from "../components/Title";
import i18n from "../utils/i18n";

const WelcomeScreen = ({ navigation }) => {
  const entries = range(1, 6, 1).map((ele) => {
    return {
      title: i18n.t("WELCOME.ITEM_TITLE", { number: ele }),
      text: i18n.t("WELCOME.ITEM_TEXT", { number: ele }),
    };
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const carousel = useRef(null);

  const signUp = () => navigation.navigate("Signup");
  const logIn = () => navigation.navigate("Login");

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title={i18n.t("WELCOME.TITLE")} />
      <View style={styles.sliderView}>
        <Carousel
          ref={carousel}
          data={entries}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
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
      </View>

      <View style={styles.buttonView}>
        <Button onPress={signUp} backgroundColor="gray.900" mb={4} width="1/2">
          {i18n.t("WELCOME.SIGNUP_BUTTON")}
        </Button>
        <Button onPress={logIn} backgroundColor="gray.500" width="1/2">
          {i18n.t("WELCOME.LOGIN_BUTTON")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
