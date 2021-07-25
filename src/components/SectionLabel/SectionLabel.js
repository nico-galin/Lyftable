import React from 'react';
import {Button, Text, View, TouchableHighlight} from 'react-native';

import styles from './SectionLabel.style';
import { systemStyles } from '../../assets/styles';

export default ({label = "[Label]", buttonLabel, buttonOnPress}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {buttonLabel && buttonOnPress && 
          <TouchableHighlight style={styles.button} onPress={buttonOnPress}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableHighlight>
        }
    </View>
  );
};