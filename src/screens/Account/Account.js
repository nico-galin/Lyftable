import React from 'react';
import {ScrollView, View, Button} from 'react-native';
import Header from '../../components/Header/Header';
import styles from './Account.style';
import { systemStyles } from '../../assets/styles';
import {useAuth} from '../../contexts/AuthContext';

export const Account = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Account'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button title="Sign Out" onPress={signOut} />
      </ScrollView>
    </View>
  );
};