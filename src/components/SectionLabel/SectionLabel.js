import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './SectionLabel.style';

export default ({label = "[Label]", buttonLabel, buttonOnPress}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {buttonLabel && buttonOnPress && 
          <TouchableOpacity style={styles.button} onPress={buttonOnPress}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        }
    </View>
  );
};