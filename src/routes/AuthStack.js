import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login/Login.js';
import { StatusBar } from 'react-native';
import changeNavigationBarColor, { hideNavigationBar } from "react-native-navigation-bar-color";
import theme from '../assets/theme.style.js';
import { Signup } from '../screens/Signup/Signup.js';

const Stack = createStackNavigator();

export const AuthStack = () => {
  changeNavigationBarColor(theme.SECONDARY_COLOR, false);
  StatusBar.setBackgroundColor(theme.SECONDARY_COLOR_LIGHT);
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};