import React from 'react';
import { Router } from './src/routes/Router.js';
import { AuthProvider } from './src/contexts/AuthContext.js';
import { enableScreens } from 'react-native-screens';
import { ActiveWorkoutProvider } from './src/contexts/ActiveWorkoutContext.js';
import { StatusBar } from 'react-native';
import theme from './src/assets/theme.style.js';
import changeNavigationBarColor, { hideNavigationBar } from "react-native-navigation-bar-color";

const App = () => {
  enableScreens();
  changeNavigationBarColor(theme.SECONDARY_COLOR, false)
  return (
    <AuthProvider>
        <StatusBar
          animated={true}
          barStyle={'dark-content'}
          backgroundColor={theme.SECONDARY_COLOR_LIGHT}
          translucent={false}
        />
      <ActiveWorkoutProvider>
        <Router />
      </ActiveWorkoutProvider>
    </AuthProvider>
  );
};

export default App;