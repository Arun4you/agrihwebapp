import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Block } from "./components";
import ScreensRoutes from "./screens";

// import all used images
export const images = [
  require("./assets/icons/back.png"),
  require("./assets/icons/plants.png"),
  require("./assets/icons/seeds.png"),
  require("./assets/icons/flowers.png"),
  require("./assets/icons/sprayers.png"),
  require("./assets/icons/pots.png"),
  require("./assets/icons/fertilizers.png"),
  require("./assets/images/plants_1.png"),
  require("./assets/images/plants_2.png"),
  require("./assets/images/plants_3.png"),
  require("./assets/images/explore_1.png"),
  require("./assets/images/explore_2.png"),
  require("./assets/images/explore_3.png"),
  require("./assets/images/explore_4.png"),
  require("./assets/images/explore_5.png"),
  require("./assets/images/explore_6.png"),
  require("./assets/images/illustration_1.png"),
  require("./assets/images/illustration_2.png"),
  require("./assets/images/illustration_3.png"),
  require("./assets/images/avatar.png")
];

const AppContainer = props => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={error => console.warn(error)}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  } else {
    return (
      <ActionSheetProvider>
        <Block style={Platform.OS === "web" ? styles.web : null} white>
          <ScreensRoutes />
        </Block>
      </ActionSheetProvider>
    );
  }
};

export default AppContainer;

export const styles = StyleSheet.create({
  web: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }]
  }
});
