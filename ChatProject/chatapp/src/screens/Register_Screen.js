import React, { useState, useEffect } from "react";
import { db } from "../../database/config";
import Login from "./Login_Screen";
import { navigationRef } from "../navigation/RootNavigation";
import * as ImagePicker from "expo-image-picker";
import { Constants } from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";

export default function RegisterPage({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [usersData, setUsers] = useState([]);
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      borderRadius: 8,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    db.ref("users")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });

        setUsers(user); // updating state
        console.log(usersData);
      });
  }, []);

  const verifyUser = () => {
    var count = 0;
    for (let index = 0; index < usersData.length; index++) {
      if (email == usersData[index].email) count = 1;
    }
    if (count == 1) {
      alert("user already exist");
    } else {
      signup();
      alert("You are successfully registerd");
    }
  };

  const validation = () => {
    let apos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (name == "") {
      alert("Please enter username");
      return false;
    } else if (email == "") {
      alert("Please enter email");
      return false;
    } else if (password == "") {
      alert("Please enter password");
      return false;
    } else if (confirmPassword == "") {
      alert("Please enter Confirm password");
      return false;
    } else if (password != confirmPassword) {
      alert("Passwords must be same");
      return false;
    } else if (apos < 1 || dotpos - apos < 2) {
      alert("Enter a valid Email address");
      return false;
    } else {
      verifyUser();
    }
  };
  const signup = () => {
    const data = {
      id: Number(new Date()),
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      image: image,
    };
    db.ref("users")
      .update({ [data.id]: data })
      .then(() => {
        console.log("Inserted");
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
          value={name}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(confirmPassword) =>
            setconfirmPassword(confirmPassword)
          }
          value={confirmPassword}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Upload image" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={validation}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    width: "90%",
    flex: 1,
    padding: 10,
    marginLeft: 20,
    borderStyle: "",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "skyblue",
  },
});
