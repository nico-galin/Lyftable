import React from 'react';
import { Text, View } from 'react-native';

import styles from './InputWrapper.style';

export default ({ label = "", children, valid = [true, null] }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.outline, !valid[0] ? styles.invalidOutline : null]}>
        <Text style={[styles.label, !valid[0] ? styles.invalidLabel : null]}>
          {label}
          {!valid[0] && <Text style={styles.invalidReason}> ({valid[1]})</Text>}
        </Text>
        {children}
      </View>
    </View>
  );
};