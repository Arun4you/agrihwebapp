import { StyleSheet } from "react-native";
import { appColors } from "../../../styles/darkTheme";
import { flexDirection } from "../../../styles/flexDirection";
import { theme } from "../../constants";

export const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  container: {
    flex: 1 / 3,
    flexDirection: flexDirection.column
  },
  cardImage: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    width: "100 %",
    height: "100 %"
  },
  checkCircleContainer: {
    position: "absolute",
    top: 5,
    right: 5
  },
  checkCircleBackgroundView: {
    position: "absolute",
    top: 7,
    left: 5,
    width: 15,
    height: 10,
    backgroundColor: appColors.white
  },
  uploadPhotoContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#0066ff",
    flexDirection: "column"
  },
  uploadImageText: {
    color: appColors.white,
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 5,
    textAlign: "center",
    fontFamily: "IBM-light"
  },
  uploadIconParent: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 5
  }
});
