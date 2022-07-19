import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Login_Screen";
import WelcomePage from "./Welcome";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./RootNavigation";
import RegisterPage from "./Register_Screen";
import HomePage from "./Homepage";
import { StatusBar } from "expo-status-bar";
import Test from "./Dashboard";
import GroupChat from "./chat";

import ManageUser from "./ManageUser";
import EditUser from "./EditUser";
import Home from "./Homepage";
import UploadFile from "./SharedDocument";
import MyTabs from "./ManageDocument";
import SplashScreen from "./Welcome";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack />
    </NavigationContainer>
  );
}
