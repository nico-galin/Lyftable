import React, { useEffect } from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import Header from '../../components/Header/Header';
import styles from './Charts.style';
import { systemStyles } from '../../assets/styles';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';

export const Charts = (props) => {
  const navigator = useNavigation()
  const context = useAppContext();
  const testFunc = async () => {
    return null;
  }
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Charts'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button title={"Test Button"} onPress={testFunc} />
      </ScrollView>
    </View>
  );
};