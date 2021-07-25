import React from 'react';
import {Button, Text, View, ScrollView} from 'react-native';

import styles from './InputWrapper.style';

export default ({ label = "", children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.outline}>
        <Text style={styles.label}>{label}</Text>
        {children}
      </View>
    </View>
  );
};