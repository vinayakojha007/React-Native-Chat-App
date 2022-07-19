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


export default function ManageUser({ navigation }) {
  // functional component
  const [newsData, setData] = useState([]); // initial value is empty array
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setname] = useState("");
  const [newname, setnewname] = useState("");
  useEffect(() => {
    db.ref("users")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });
        setData(user); // updating state
      });
  }, []);

  const deleteUser = (i) => {
    console.log(i);
    firebase
      .database()
      .ref("/users/" + i)
      .remove();
  };

  const editUser = (item) => {
    console.log(item.name);
    setname(item.name);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Container style={styles.container}>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // <Card
          // // onPress={() => {navigation.navigate("EditUser")}}
          //   >
          <UserInfo>
            <UserImgWrapper>
              <UserImg source={{ uri: item.image }} />
            </UserImgWrapper>
            <TextSection>
              <UserInfoText>
                <UserName>{item.name}</UserName>
                <Icon
                  name="delete"
                  size={20}
                  onPress={() => deleteUser(item.id)}
                ></Icon>
                <Icon
                  name="edit"
                  size={20}
                  onPress={() => {
                    editUser(item);
                  }}
                ></Icon>
              </UserInfoText>
            </TextSection>
          </UserInfo>
          // </Card>
        )}
      ></FlatList>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={hideModal}>
                <Ionicons name="close-circle-outline" size={22} />
              </TouchableOpacity>
              <Text>Enter new name</Text>
              <TextInput
                onChangeText={(newname) => setnewname(newname)}
                placeholder={name}
              />
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                title="Update"
              ></Button>
            </View>
          </View>
        </Modal>
      </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "skyblue",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalHeaderCloseText: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
