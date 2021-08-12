import React from 'react';
import { Router } from './src/routes/Router.js';
import { AuthProvider } from './src/contexts/AuthContext.js';
import { enableScreens } from 'react-native-screens';
import { ActiveWorkoutProvider } from './src/contexts/ActiveWorkoutContext.js';

const App = () => {
  enableScreens();
  return (
    <AuthProvider>
      <ActiveWorkoutProvider>
        <Router />
      </ActiveWorkoutProvider>
    </AuthProvider>
  );
};

export default App;