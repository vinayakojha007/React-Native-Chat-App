import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Share,
} from "react-native";
import {
  Container,
  Card,
  UserName,
  UserImgWrapper,
  UserImg,
  TextSection,
  UserInfo,
  UserInfoText,
  MessageText,
  PostTime,
} from "../style/chatstyle";
import { db } from "../../database/config";
import firebase from "firebase";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/AntDesign";

const UploadFile = () => {
  const [filename, setFileName] = useState("");
  const [fileURI, setFileUri] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [filedetails, setFileDetails] = useState("");
  const [docDetails, setDocDetails] = useState("");
  const [sdoc, setsdoc] = useState("");
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "/",
    });

    console.log(result);

    if (!result.cancelled) {
      setFileName(result.name);
      setFileUri(result.uri);
      setMimeType(result.mimeType);
    }
  };
  const storeDoc = () => {
    if (filename == "") {
      alert("Please Select file");
    } else {
      const data = {
        id: Number(new Date()),
        filename: filename,
        fileURI: fileURI,
        mimeType: mimeType,
      };

      db.ref("documents")
        .update({ [data.id]: data })
        .then(() => {
          console.log("Inserted");
        })
        .catch((error) => {
          console.log(error);
        });
      fetchDocs();
    }
  };

  const deleteDoc = (i) => {
    console.log(i);
    firebase
      .database()
      .ref("/documents/" + i)
      .remove();
    fetchDocs();
  };

  var curUser = JSON.parse(localStorage.getItem("currentUser"));
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();

  const onShare = async (item) => {
    const f = () => {
      let data = {
        id: Number(new Date()),
        curUser: curUser.name,
        uid: curUser.id,
        filename: item.filename,
        fileURI: item.fileURI,
        mimeType: item.mimeType,
        time: time,
      };
      db.ref("sharedDocument")
        .update({ [data.id]: data })
        .then(() => {
          console.log("Inserted");
        })
        .catch((error) => {
          console.log(error);
        });
      fetchDocs();
    };
    try {
      f();
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = () => {
    db.ref("documents")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });
        setDocDetails(user); // updating state
      });
  };

  return (
    <View>
      <FlatList
        data={docDetails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserInfo>
            <TextSection>
              <UserInfoText>
                <UserName>{item.filename}</UserName>
                <Icon
                  name="delete"
                  size={20}
                  onPress={() => deleteDoc(item.id)}
                ></Icon>
                <Icon name="edit" size={20}></Icon>
                <Icon
                  name="sharealt"
                  size={20}
                  onPress={() => {
                    onShare(item);
                  }}
                />
              </UserInfoText>
              <MessageText>{item.mimeType}</MessageText>
            </TextSection>
          </UserInfo>
        )}
      ></FlatList>

      <View>
        <TouchableOpacity>
          <Button
            style={StyleSheet.btn}
            title="Choose file"
            onPress={pickFile}
          />
          <Button
            style={StyleSheet.btn}
            title="Click to Upload"
            onPress={storeDoc}
          />
        </TouchableOpacity>
      </View>
      <Text>{filename}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  btn: {
    flex: 1,
    marginTop: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default UploadFile;
