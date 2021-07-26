import React from 'react';
import { Router } from './src/routes/Router.js';
import { AuthProvider } from './src/contexts/AuthContext.js';
import { enableScreens } from 'react-native-screens';

const App = () => {
  enableScreens();
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;