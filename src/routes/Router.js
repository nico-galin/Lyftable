import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './AppStack.js';
import { AuthStack } from './AuthStack.js';
import { useAuth } from '../contexts/AuthContext.js';
import { Loading } from '../screens/Loading/Loading.js';
import { AppProvider } from '../contexts/AppContext.js';
import { useActiveWorkoutContext } from '../contexts/ActiveWorkoutContext.js';

export const Router = () => {
  const { authData, authLoading } = useAuth();
  const { activeWorkoutLoading } = useActiveWorkoutContext();

  if (authLoading || activeWorkoutLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppProvider><AppStack /></AppProvider> : <AuthStack />}
    </NavigationContainer>
  );
};