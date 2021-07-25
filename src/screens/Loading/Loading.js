import React from 'react';
import { Text, View } from 'react-native';
import styles from './Loading.style';
import { useAuth } from '../../contexts/AuthContext';

export const Loading = () => {
  const auth = useAuth();
  
  return (
    <View style={styles.container}>
      <Text>Loading Screen</Text>
    </View>
  );
};