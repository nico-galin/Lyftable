import React, { useEffect } from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import Header from '../../components/Header/Header';
import styles from './Charts.style';
import { systemStyles } from '../../assets/styles';

export const Charts = (props) => {
  const testFunc = async () => {
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