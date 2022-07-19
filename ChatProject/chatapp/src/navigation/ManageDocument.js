import React from "react";
import UploadFile from "../screens/SharedDocument";
import Share from "../screens/ShareDoc";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Uploads" component={UploadFile} />
      <Tab.Screen name="Shared Uploads" component={Share} />
    </Tab.Navigator>
  );
}
