import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Entypo";
import { db } from "../../database/config";
import {
  Container,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  MessageText,
  TextSection,
} from '../style/chatstyle'



export default function GroupChat() {
  const [message, setMssg] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [Messages, setData] = useState([]);

  const refreshMessage = () => {
    db.ref("chatList")
      .once("value")
      .then((item) => {
        let users = [];
        console.log(item.val());
        item.forEach((childSnapshot) => {
          users.push(childSnapshot.val());
        });
        console.log(users);
        setData(users); // updating state
      });
  };

  useEffect(() => {
    refreshMessage();
  }, []); // effect will run only once
  const storyItem = ({ item }) => {
    return (
      <ScrollView>
        <UserInfo>
          <UserImgWrapper>
            <UserImg source={{ uri: item.image }} />
          </UserImgWrapper>
          <TextSection>
            <UserInfoText>
              <UserName>{item.userName}</UserName>
            </UserInfoText>
            <MessageText>{item.message}</MessageText>
            <MessageText>{item.time}</MessageText>
          </TextSection>
        </UserInfo>
      </ScrollView>
    );
  };

  postMessage = () => {
    var uname = JSON.parse(localStorage.getItem("currentUser"));

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    if (!message) {
      setErrMsg("Message can't be empty");
    } else {
      const data = {
        id: Number(new Date()),
        time: time,
        userName: uname.name,
        message: message,
        image: uname.image,
      };

      db.ref("chatList")
        .update({ [data.id]: data })
        .then(() => {
          console.log("Inserted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    refreshMessage();
  };

  return (
    <View style={styles.container}>
      <Text>{errMsg}</Text>
      <Container>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={storyItem}
        ></FlatList>
      </Container>

      <View style={styles.buttons}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMssg(text)}
          value={message}
          placeholder="Type here"
        />
        <TouchableOpacity>
          <Icon name="direction" onPress={() => postMessage()} size={30}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 80,
  },
  buttons: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: "90%",
    height: 80,
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "lightblue",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20,
    height: 30,
  },
});
