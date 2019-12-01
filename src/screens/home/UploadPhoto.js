import { useActionSheet } from "@expo/react-native-action-sheet";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Text } from "../../components";
import { styles } from "./style";

const UploadComp = ({ onSelection, imageUri, onImageSelect, card }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const _showActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ["Take photo", "Choose Photo"];
    const title = true ? "Choose An Action" : undefined;
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        onSelection(buttonIndex);
      }
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#0f3875",
        height: 100,
        width: 100
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1
        }}
        onPress={() => _showActionSheet()}
      >
        {imageUri ? (
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: imageUri }}
            />
          </View>
        ) : (
          <View style={styles.uploadPhotoContainer}>
            <View style={styles.uploadIconParent}>
              <Icon name="cloud-upload" color="#ffffff" />
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text bold white center>
                Upload Photo
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const UploadPhoto = UploadComp;

export default UploadPhoto;
