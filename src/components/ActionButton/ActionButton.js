import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { systemStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';
import styles from './ActionButton.style';

export default ({height = 'small',
  width,
  text,
  color,
  textColor = theme.BACKGROUND_COLOR,
  onPress = () => {},
  icon = null
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.button,
      {backgroundColor: color},
      height === 'large' ? styles.largeButton : null,
      width === 'small' ? styles.skinnyButton : styles.wideButton
    ]}>
      {icon &&
        icon
      }
      {icon &&
        <View style={systemStyles.formSpacer} />
      }
      <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};