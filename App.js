import React from "react";
import { Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoginScreen from "./Screens/Login";
import HomeScreen from "./Screens/Home";
import ProfileScreen from "./Screens/Profile";
import JoinScreen from "./Screens/Join";

const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "Home",
    }),
  }
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "Profile",
    }),

    initialRouteName: "ProfileScreen",
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon = "▲";

        if (routeName === "Home") {
          icon = "🧭";
        } else if (routeName === "Profile") {
          icon = "🧑";
        }

        // can use react-native-vector-icons
        // <Icon name={iconName} size={iconSize} color={iconColor} />
        return (
          <Text style={{ color: (focused && "#46c3ad") || "#888" }}>
            {icon}
          </Text>
        );
      },
    }),
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "#888",
    },
  }
);

const AppStack = createStackNavigator({
  LoginScreen: LoginScreen,
  JoinScreen: JoinScreen,
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  },
});

export default createAppContainer(AppStack);
