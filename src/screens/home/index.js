import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Block, Button, Input, Text } from "../../components";
import { theme } from "../../constants";
import { styles } from "./style";
import UploadPhoto from "./UploadPhoto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";

export const APP_URL =
  "https://uploadclaimform.azurewebsites.net/api/claimupload";
// export const APP_URL = "http://192.168.0.117:3003";

const Home = props => {
  const title = "AgriTech";
  const { navigation } = props;
  const [imageUri, setimageUri] = useState("");
  const [image64, setImage64] = useState("");
  const [step, setstep] = useState(1);
  const [showDate, setShowdate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartdate] = useState("");
  const [endDate, setEnddate] = useState("");
  const [inputFrom, setinputFrom] = useState("");

  const [inputStartDate, setinputStartDate] = useState(new Date());
  const [webInputFormatStartDate, setwebInputFormatStartDate] = useState(
    new Date()
  );
  const [webInputFormatEndDate, setwebInputFormatEndDate] = useState(
    new Date()
  );
  const [webImageUri, setWebImageUri] = useState("");

  const [inputEndDate, setinputEndDate] = useState(new Date());
  const [webImageUpload, setWebImageUpload] = useState({});

  useEffect(() => {
    console.log("step ", step);
  }, [step]);

  // Proceed to next step
  const nextStep = () => {
    setstep(prevState => prevState + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setstep(prevState => prevState - 1);
  };

  const onImageSelect = result => {
    console.log("result ", result);
    console.log("result uri", result.uri);
    if (result.uri) {
      setimageUri(result.uri);
      setImage64(result.base64);
    } else {
      setimageUri("");
    }
  };

  const _pickImageG = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true
      // aspect: [4, 3]
    });

    if (!result.cancelled) {
      onImageSelect(result);
    }
  };

  const _pickImageC = async () => {
    const options = {
      quality: 1,
      base64: true,
      fixOrientation: true,
      exif: true
    };
    const result = await ImagePicker.launchCameraAsync(options);
    if (result) {
      console.log(result.uri);
      onImageSelect(result);
    }
  };

  const onSelection = buttonIndex => {
    console.log("onSelection ", buttonIndex);
    if (buttonIndex === 1) {
      console.log("from Gallery");
      _pickImageG();
    }
    if (buttonIndex === 0) {
      console.log("from Camera");
      _pickImageC();
    }
  };

  const uploadImageAsync = async uri => {
    console.log("uploadImageAsync uri ", uri);
    let options;
    const apiUrl = `${APP_URL}`;
    // const apiUrl = `${APP_URL}/upload`;
    if (Platform.OS === "web") {
      console.log("Platform.OS ", Platform.OS);
      const data = new FormData();
      data.append("image", uri);
      options = {
        mode: "no-cors",
        method: "post",
        body: data
      };
    } else {
      const imgName = uri.split("ImagePicker/");
      const uriParts = uri.split(".");
      const fileType = `image/${uriParts[uriParts.length - 1]}`;
      console.log("fileType ", fileType, imgName[1]);
      options = {
        method: "post",
        body: createFormData(uri, imgName[1], fileType)
      };
    }
    console.log("API called ", apiUrl);
    return fetch(apiUrl, options).catch(err => {
      console.log("err ", err, err.message);
    });
  };

  const createFormData = (uri, imgName, fileType) => {
    const data = new FormData();
    data.append("image", {
      name: imgName,
      type: fileType,
      uri: Platform.OS === "android" ? uri : uri.replace("file://", "")
    });
    console.log("formData ", data);
    return data;
  };

  const handleSubmit = async () => {
    console.log("handleSubmit ");
    console.log("imageUri ", imageUri);
    let uploadResponse;
    if (Platform.OS === "web") {
      uploadResponse = await uploadImageAsync(webImageUpload);
    } else {
      uploadResponse = await uploadImageAsync(imageUri);
    }
    console.log("upload completed ", uploadResponse);
    // uploadResult = await uploadResponse.json();
    // console.log(uploadResult.location);
    // setImageLocation(uploadResult.location);
  };

  const datepicker = inputFrom => {
    console.log("datepicker open ", inputFrom);
    setinputFrom(inputFrom);
    setShowdate(true);
  };

  const hideDateTimePicker = () => {
    setShowdate(false);
  };

  const handleDatePicked = selectDate => {
    console.log("A date has been picked: ", selectDate);
    const formattedDate =
      selectDate.getDate() +
      "-" +
      (selectDate.getMonth() + 1) +
      "-" +
      selectDate.getFullYear();
    console.log("formattedDate ", formattedDate);
    if (inputFrom === "startDate") {
      setStartdate(formattedDate);
    } else {
      setEnddate(formattedDate);
    }
    // setDate(formattedDate);
    hideDateTimePicker();
  };

  const handleChange = date => {
    console.log(date);
    setDate(date);
  };

  const ExampleCustomInput = ({ value, onClick, fromLabel }) => {
    console.log("ExampleCustomInput ", value, fromLabel);
    if (inputFrom === "startDate") {
      setinputStartDate(value);
    } else {
      setinputEndDate(value);
    }
    return (
      <button className="example-custom-input" onClick={onClick}>
        Select Date
      </button>
    );
  };

  const formatdate = selectDate => {
    const formattedDate =
      selectDate.getDate() +
      "-" +
      (selectDate.getMonth() + 1) +
      "-" +
      selectDate.getFullYear();
    return formattedDate;
  };

  function parseDateForStore(pickedDate) {
    // the returned value will be stored in the redux store
    return moment(pickedDate).format("MM/DD/YYYY");
  }

  useEffect(() => {
    console.log("inputStartDate ", inputStartDate);
    setwebInputFormatStartDate(parseDateForStore(inputStartDate));
    console.log(parseDateForStore(inputStartDate));
  }, [inputStartDate]);

  useEffect(() => {
    console.log("inputEndDate ", inputEndDate);
    setwebInputFormatEndDate(parseDateForStore(inputEndDate));
    console.log(parseDateForStore(inputEndDate));
  }, [inputEndDate]);

  const uploadWebImage = async (e, method) => {
    if (method === "multer") {
      setWebImageUri(URL.createObjectURL(e.target.files[0]));
      setWebImageUpload(e.target.files[0]);
    }
  };
  return (
    <KeyboardAvoidingView
      style={Platform.OS === "web" ? null : styles.login}
      behavior="padding"
    >
      <Block padding={[theme.sizes.base * 2, theme.sizes.base * 2]}>
        <Block row middle>
          <Text center h1 bold>
            {title}
          </Text>
        </Block>

        <Block middle>
          {step === 1 ? (
            <Block row>
              <Text center h1>
                Welcome to AgriTech. Please click continue to proceed with the
                policy cliam.
              </Text>
            </Block>
          ) : null}

          {step === 2 ? (
            <>
              <Text center h2>
                Please upload the claim form
              </Text>
              <Block center middle>
                {Platform.OS === "web" ? (
                  <>
                    <input
                      type="file"
                      onChange={e => uploadWebImage(e, "multer")}
                    />
                    <Image
                      style={{ height: 100, width: 100 }}
                      source={webImageUri}
                    />
                  </>
                ) : (
                  <UploadPhoto
                    onSelection={buttonIndex => onSelection(buttonIndex)}
                    imageUri={imageUri}
                    onImageSelect={result => onImageSelect(result)}
                  />
                )}
              </Block>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <Text center h2>
                Please confirm the submitted form details below.
              </Text>
            </>
          ) : null}
          {step === 4 ? (
            <>
              {Platform.OS !== "web" ? (
                <Input
                  onPress={() => datepicker("startDate")}
                  label="Start Date"
                  style={[styles.input]}
                  editable={false}
                  value={startDate}
                  valueProp={startDate}
                />
              ) : null}
              {Platform.OS === "web" ? (
                <>
                  <Text center h2>
                    Start Date
                  </Text>
                  <DatePicker
                    selected={inputStartDate}
                    onChange={date => setinputStartDate(date)}
                  />
                </>
              ) : null}

              {Platform.OS !== "web" ? (
                <Input
                  onPress={() => datepicker("endDate")}
                  label="End Date"
                  style={[styles.input]}
                  editable={false}
                  value={endDate}
                />
              ) : null}

              {Platform.OS === "web" ? (
                <>
                  <Text center h2>
                    End Date
                  </Text>
                  <DatePicker
                    selected={inputEndDate}
                    onChange={date => setinputEndDate(date)}
                    // customInput={<ExampleCustomInput fromLabel="startDate" />}
                  />
                </>
              ) : null}
              {Platform.OS === "web" ? null : (
                <DateTimePicker
                  isVisible={showDate}
                  onConfirm={handleDatePicked}
                  onCancel={hideDateTimePicker}
                />
              )}
            </>
          ) : null}

          {/* <Button onPress={() => navigation.navigate("eCard")}>
            <Text gray center style={{ textDecorationLine: "underline" }}>
              Upload Image
            </Text>
          </Button> */}

          {/* 
          <Button gradient onPress={() => handleSubmit()}>
            {false ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Submit
              </Text>
            )}
          </Button> */}
        </Block>
        {step === 2 || step === 4 ? (
          <Block row center>
            <Button
              style={{ flex: 1, marginHorizontal: 5 }}
              gradient
              onPress={() => prevStep()}
            >
              {false ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  back
                </Text>
              )}
            </Button>
            <Button
              style={{ flex: 1, marginHorizontal: 5 }}
              gradient
              onPress={async () => {
                console.log("next press");
                nextStep();
                // const resp = await handleSubmit();
                // if (resp) {
                //   console.log("handleSubmit Response recieved");
                //   nextStep();
                // }
              }}
            >
              {false ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  next
                </Text>
              )}
            </Button>
          </Block>
        ) : null}

        {step === 1 ? (
          <Block>
            <Button gradient onPress={() => nextStep()}>
              {false ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Continue
                </Text>
              )}
            </Button>
          </Block>
        ) : null}
        {step === 3 ? (
          <Block row center>
            <Button
              style={{ flex: 1, marginHorizontal: 5 }}
              gradient
              onPress={() => prevStep()}
            >
              {false ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  retake
                </Text>
              )}
            </Button>
            <Button
              style={{ flex: 1, marginHorizontal: 5 }}
              gradient
              onPress={() => nextStep()}
            >
              {false ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  continue
                </Text>
              )}
            </Button>
          </Block>
        ) : null}
      </Block>
    </KeyboardAvoidingView>
  );
};

export default Home;
