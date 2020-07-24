import * as React from 'react';
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Detail from './components/Detail'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{
        title: 'MaAnimeList',
        headerLeft: () => (
          <Icon
            name="menu"
            onPress={() => navigation.toggleDrawer()}
            color={colors.black}
            size={22}
            style={{ paddingHorizontal: 16 }}
          />
        ),
        headerStyle: {
          backgroundColor: colors.orangeWeb,
        }
      }} />
      <Stack.Screen name="Detail" component={Detail} options={{
        title: 'Detail',
        headerStyle: {
          backgroundColor: colors.orangeWeb,
        }
      }} />
    </Stack.Navigator>
  )
}

const ProfileScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{
        title: 'Profile',
        headerLeft: () => (
          <Icon
            name="menu"
            onPress={() => navigation.toggleDrawer()}
            color={colors.black}
            size={22}
            style={{ paddingHorizontal: 16 }}
          />
        ),
        headerStyle: {
          backgroundColor: colors.orangeWeb,
        }
      }} />
    </Stack.Navigator>
  )
}

const DrawerScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerStyle={{
        backgroundColor: "rgba(252, 163, 17, 0.65)",
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        activeBackgroundColor: 'rgba(255,255,255, 0.35)',
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        }
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  )
}

export default class Index extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          {<Stack.Screen name='Drawer' component={DrawerScreen} options={{ headerShown: false }} />}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const colors = {
  black: "#000000",
  oxfordBlue: "#14213D",
  orangeWeb: "#FCA311",
  platinum: "#E5E5E5",
  white: "#FFFFFF"
}