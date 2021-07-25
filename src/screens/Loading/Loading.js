import React from 'react';
import {Button, Text, View} from 'react-native';

import styles from './Loading.style';
import {useAuth} from '../../contexts/Auth';

export const Loading = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Loading Screen</Text>
    </View>
  );
};