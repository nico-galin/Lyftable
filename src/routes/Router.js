import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack.js';
import {AuthStack} from './AuthStack.js';
import {useAuth} from '../contexts/Auth.js';
import {Loading} from '../screens/Loading/Loading.js';

export const Router = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};