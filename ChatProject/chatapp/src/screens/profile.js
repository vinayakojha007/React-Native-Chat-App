import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createImageFromInitials } from "../components/Customimage";
import { getRandomColor } from "../components/Customimage";

export default function Profile() {
  //const [currentUser, setCurrentUser] = useState(null);
  let currentUser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userid, setuserid] = useState("");

  useEffect(() => {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setName(currentUser.name);
    setEmail(currentUser.email);
    setImage(currentUser.image);
    setuserid(currentUser.id);
    console.log(currentUser.name);
  }, []); // effect will run only once

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={
          image == ""
            ? createImageFromInitials(500, name, getRandomColor())
            : { uri: image }
        }
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          {/* <Text style={styles.name}>{name} <Icon name="edit" onPress={() => editProfile()} size={20} ></Icon></Text> */}
          <Text style={styles.info}>{email}</Text>

          <View style={styles.iconContent}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/color/70/000000/cottage.png",
              }}
            />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.info}>Home</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/color/70/000000/filled-like.png",
                }}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Software Engineer</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/color/70/000000/administrator-male.png",
                }}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info1}>7772962855</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image
                style={styles.icon}
                source={{
                  uri: "https://img.icons8.com/color/70/000000/facebook-like.png",
                }}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info1}>Settings</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  info1: {
    fontSize: 18,
    marginTop: 20,
    color: "black",
  },
  item: {
    flexDirection: "row",
  },
});
