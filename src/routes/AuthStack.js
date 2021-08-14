import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login/Login.js';
import theme from '../assets/theme.style.js';
import { Signup } from '../screens/Signup/Signup.js';
import { StatusBar } from 'react-native';
import changeNavigationBarColor, {
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import LinearGradient from 'react-native-linear-gradient';
import { systemStyles } from '../assets/styles.js';

const Stack = createStackNavigator();

export const AuthStack = () => {
  StatusBar.setBarStyle('light-content');
  setTimeout(function () {
    showNavigationBar();
  }, 1000);

  return (
    <LinearGradient
      colors={[theme.SECONDARY_COLOR_LIGHT, theme.SECONDARY_COLOR]}
      style={systemStyles.flex}>
      <Stack.Navigator
        screenOptions={{
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
    </LinearGradient>
  );
};
