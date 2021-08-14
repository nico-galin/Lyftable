/* eslint-disable no-sparse-arrays */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { systemStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';
import styles from './ActionButton.style';

export default ({
  height,
  width = 'large',
  text,
  color = theme.SECONDARY_COLOR,
  textColor = theme.BACKGROUND_COLOR,
  onPress = () => {},
  icon = null,
  moreBR = false,
  elevated = false,
}) => {
  let heightStyle = null;
  if (height === 'large') {
    heightStyle = styles.tallButton;
  } else if (height === 'small') {
    heightStyle = styles.shortButton;
  }
  let widthStyle = null;
  if (width === 'large') {
    widthStyle = styles.wideButton;
  } else if (width === 'small') {
    widthStyle = styles.skinnyButton;
  }
  return (
    <TouchableOpacity
      activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color },
        heightStyle,
        widthStyle,
        moreBR ? styles.moreBR : null,
        elevated ? styles.elevated : null,
        ,
      ]}>
      {icon && icon}
      {icon && <View style={systemStyles.formSpacer} />}
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};
