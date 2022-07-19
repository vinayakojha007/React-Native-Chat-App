import React, { useEffect, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from "../../database/config";
import firebase from "firebase";
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


export default function Share() {
  // functional component
  const [newsData, setData] = useState([]); // initial value is empty array

  useEffect(() => {
    db.ref("sharedDocument")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });
        setData(user); // updating state
        console.log(newsData);
      });
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserInfo>
            <TextSection>
              <UserInfoText>
                <UserName>{item.filename}</UserName>
                <UserName>shared By-{item.curUser}</UserName>
                <UserName>{item.time}</UserName>
              </UserInfoText>
            </TextSection>
          </UserInfo>
        )}
      ></FlatList>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "85%",
    padding: 20,
  },
  title: {
    paddingBottom: 10,
    fontWeight: "bold",
  },
});
