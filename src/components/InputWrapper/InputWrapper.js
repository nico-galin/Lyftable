import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import theme from '../../assets/theme.style';
import styles from './InputWrapper.style';

export default ({
  label = '',
  secondaryLabel = '',
  children,
  valid = [true, null],
  onPress = null,
}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={theme.CALENDAR_HIGHLIGHT_COLOR}
        disabled={onPress == null ? true : false}
        onPress={onPress}
        style={[styles.outline, !valid[0] ? styles.invalidOutline : null]}>
        <>
          <Text style={[styles.label, !valid[0] ? styles.invalidLabel : null]}>
            {label}
            {!valid[0] && (
              <Text style={styles.invalidReason}> ({valid[1]})</Text>
            )}
          </Text>
          {secondaryLabel ? (
            <Text
              style={[
                styles.secondaryLabel,
                !valid[0] ? styles.invalidSecondaryLabel : null,
              ]}>
              {secondaryLabel}
            </Text>
          ) : null}
          {children}
        </>
      </TouchableHighlight>
    </View>
  );
};
