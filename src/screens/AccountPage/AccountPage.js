import React from 'react';
import { ScrollView, View, Button } from 'react-native';
import Header from '../../components/Header/Header';
import { systemStyles } from '../../assets/styles';
import { useAuth } from '../../contexts/AuthContext';

export const AccountPage = ({ route }) => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Account'} rightButtonName={"logout"} rightButtonOnPress={signOut} rightButtonSize={22}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        
      </ScrollView>
    </View>
  );
};