import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login_Screen";
import WelcomePage from "./src/screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./src/navigation/RootNavigation";
import RegisterPage from "./src/screens/Register_Screen";
import HomePage from "./src/navigation/Homepage";
import { StatusBar } from "expo-status-bar";
import Test from "./src/screens/Dashboard";
import GroupChat from "./src/screens/Chat";
import ManageUser from "./src/screens/ManageUser";

import Home from "./src/navigation/Homepage";
import UploadFile from "./src/screens/SharedDocument";
import MyTabs from "./src/navigation/ManageDocument";
import SplashScreen from "./src/screens/Welcome";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        {/* <Stack.Screen name="Dashboard" component={Test} />

        <Stack.Screen name="Chat" component={GroupChat} />
        <Stack.Screen name="Newchat" component={NEWChat} />
        <Stack.Screen name="ManageUser" component={ManageUser} />

        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="UploadFile" component={UploadFile} /> 
        <Stack.Screen name="Documents" component={MyTabs} />  */}
        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
