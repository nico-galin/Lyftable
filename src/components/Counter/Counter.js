import React, { useState } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../assets/theme.style';
import styles from './Counter.style';

export default ({
  formattedValue = '',
  initialValue = 0,
  increment = 1,
  onChange = () => {},
  min,
  max,
}) => {
  const [counter, setCounter] = useState(initialValue);
  const handleAdd = () => {
    if (max != null && counter + increment > max) {
      return;
    }
    onChange(counter + increment);
    setCounter(counter + increment);
  };
  const handleSubtract = () => {
    if (min != null && counter - increment < min) {
      return;
    }
    onChange(counter - increment);
    setCounter(counter - increment);
  };
  const continuedAdd = () => {};
  const continuedSubtract = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.formattedData}>{formattedValue}</Text>
      <View style={styles.wrapper}>
        <TouchableHighlight
          underlayColor={theme.CALENDAR_HIGHLIGHT_COLOR}
          style={[styles.button, styles.leftButton]}
          onPress={handleSubtract}
          onPressIn={continuedSubtract}>
          <Icon name={'minus'} size={15} color={theme.SUBTITLE_COLOR} />
        </TouchableHighlight>
        <View style={styles.separator} />
        <TouchableHighlight
          underlayColor={theme.CALENDAR_HIGHLIGHT_COLOR}
          style={[styles.button, styles.rightButton]}
          onPress={handleAdd}
          onPressIn={continuedAdd}>
          <Icon name={'plus'} size={15} color={theme.SUBTITLE_COLOR} />
        </TouchableHighlight>
      </View>
    </View>
  );
};
