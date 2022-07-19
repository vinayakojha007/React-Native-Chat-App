import React, { useState, useEffect } from "react";
import { db } from "../../database/config";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login({ navigation }) {
  // default value is empty
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersData, setUsers] = useState([]);

  useEffect(() => {
    db.ref("users")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });

        setUsers(user); // updating state
      });
  }, []);

  const loginUser = () => {
    var count = 0;
    for (let index = 0; index < usersData.length; index++) {
      if (
        email == usersData[index].email &&
        password == usersData[index].password
      ) {
        count = 1;
        localStorage.setItem("currentUser", JSON.stringify(usersData[index]));
        console.log(usersData[index]);
      }
    }
    if (count == 1) {
      navigation.navigate("HomePage");
    } else {
      alert("User doesnot exists");
    }
  };

  const validation = () => {
    let apos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (email == "") {
      alert("Please enter email");
      return false;
    } else if (password == "") {
      alert("Please enter password");
      return false;
    } else if (apos < 1 || dotpos - apos < 2) {
      alert("Enter a valid Email address");
      return false;
    } else {
      loginUser();
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: "https://images8.alphacoders.com/107/thumb-1920-1075679.jpg",
      }}
    >
      <View>
        <ScrollView>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            placeholder="Enter email"
            value={email}
          />

          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            placeholder="Enter password"
            value={password}
          />
          <TouchableOpacity style={styles.Button}>
            <Button title="Login" color={"green"} onPress={validation} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button1}>
            <Button
              title="Registration"
              color={"grey"}
              onPress={() => navigation.navigate("RegisterPage")}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 15,
    width: 250,
  },
  label: {
    fontSize: 18,
    paddingTop: 20,
  },

  Button: {
    paddingTop: 20,
    marginTop: 15,
  },
  Button1: {
    paddingTop: 20,
    marginTop: 15,
  },
  multi: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 16,
    width: 300,
  },
});
