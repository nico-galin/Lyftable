import React from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import Header from '../../components/Header/Header';
import styles from './Charts.style';
import { systemStyles } from '../../assets/styles';
import { useAppContext } from '../../contexts/AppContext';

export const Charts = (props) => {
  const context = useAppContext();
  const testFunc = async () => {
    try {
      const sp = await context.getSplitFromShareCode("eyJpZCI6IjlkNWNhNDIzLTZmODctNGY1ZC1iMjM4LTVhZmVmMTNhMTZjOCIsInVzZXJJZCI6IlBRcjJkWXV3N2RYRWJSWGZNUEoweHhVQlZBZzIifQ==");
      console.log("Success!", sp);
    } catch (e) {
      console.log(e);
    }
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