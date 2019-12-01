import React from "react";
import { Image, Platform } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { theme } from "../../src/constants";
import Home from "./home";
// import * as DeshtopRouter from "./DeshtopRouter";

const screens = createStackNavigator(
  {
    Home
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

const navigation = Platform.OS === "web" ? Home : createAppContainer(screens);

export default navigation;
