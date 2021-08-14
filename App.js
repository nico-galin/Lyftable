import React from 'react';
import { Router } from './src/routes/Router.js';
import { AuthProvider } from './src/contexts/AuthContext.js';
import { enableScreens } from 'react-native-screens';
import { ActiveWorkoutProvider } from './src/contexts/ActiveWorkoutContext.js';
import { StatusBar } from 'react-native';
import theme from './src/assets/theme.style.js';

const App = () => {
  enableScreens();
  return (
    <AuthProvider>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ActiveWorkoutProvider>
        <Router />
      </ActiveWorkoutProvider>
    </AuthProvider>
  );
};

export default App;
