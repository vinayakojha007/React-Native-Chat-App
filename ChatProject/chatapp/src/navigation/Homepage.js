import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GroupChat from '../screens/Chat';
import ManageUser from '../screens/ManageUser';
import Test from '../screens/Dashboard';
import CustomDrawer from '../components/CustomNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadFile from '../screens/SharedDocument';
import MyTabs from './ManageDocument';

import Profile from '../screens/profile';

const Drawer = createDrawerNavigator();


function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation 
      drawerContent={props => <CustomDrawer {...props} />}
     >
      <Drawer.Screen name="Dashboard" component={Test} options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }} />
      
      <Drawer.Screen name="GroupChat" component={GroupChat} options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbubbles-outline" size={22} color={color} />
          ),
        }} />
       {/* <Drawer.Screen name="Manage Document" component={UploadFile} options={{
          drawerIcon: ({color}) => (
            <Ionicons name="document-text-outline" size={22} color={color}/>
          ),
       }}
       />  */}
       <Drawer.Screen name="Documents" component={MyTabs} options={{
          drawerIcon: ({color}) => (
            <Ionicons name="document-text-outline" size={22} color={color}/>
          ),
       }}
       /> 
      <Drawer.Screen name="Manage User" component={ManageUser} options={{
          drawerIcon: ({color}) => (
            <Ionicons name="people-outline" size={22} color={color} />
          ),
        }}/>
      {/* <Drawer.Screen name='Documents' component={MyTabs}/>  */}
      <Drawer.Screen name="Profile" component={Profile} options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }} />
    </Drawer.Navigator>
    
  );
}

export default function Home() {
  return (
    <NavigationContainer independent={true}>
      <MyDrawer />
    </NavigationContainer>
  );
}
