import React from 'react';
import {ScrollView, View} from 'react-native';
import Header from '../../components/Header/Header';
import styles from './Charts.style';
import { systemStyles } from '../../assets/styles';

export const Charts = (props) => {
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Charts'} />
      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
    </View>
  );
};