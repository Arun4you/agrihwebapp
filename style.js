import { StyleSheet } from "react-native";

import { appColors } from "./styles/darkTheme";
import { flexDirection } from "./styles/flexDirection";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.primaryColor,
    flex: 1,
    flexDirection: flexDirection.Column,
    marginTop: 28
  },
  flatList: {
    backgroundColor: appColors.primaryColor,
    height: "45%"
  },
  user: {
    height: 80,
    width: 70
  },
  redirectList: {
    backgroundColor: appColors.secondaryColor
  },
  screenHeaderBackground: {
    backgroundColor: "#202529"
  },
  screenBackground: {
    backgroundColor: "#13171A"
  },
  fontColor: {
    color: "#ffffff"
  }
});
