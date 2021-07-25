import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../assets/theme.style';
import styles from './Counter.style';

export default ({formattedValue = "", initialValue = 0, increment = 1, onChange = () => {}, min, max}) => {
  const [counter, setCounter] = useState(initialValue);
  const handleAdd = () => {
    if (max != null && counter + increment > max) {
      return;
    }
    onChange(counter + increment);
    setCounter(counter + increment);
  }
  const handleSubtract = () => {
    if (min != null && counter - increment < min) {
      return;
    }
    onChange(counter - increment);
    setCounter(counter - increment);
  }
  const continuedAdd = () => {

  }
  const continuedSubtract = () => {

  }

  return (
    <View style={styles.container}>
      <Text style={styles.formattedData}>{formattedValue}</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={handleSubtract} onPressIn={continuedSubtract}>
          <Icon name={'minus'} size={15} color={theme.SUBTITLE_COLOR}/>
        </TouchableOpacity>
          <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={handleAdd} onPressIn={continuedAdd}>
          <Icon name={'plus'} size={15} color={theme.SUBTITLE_COLOR}/>
        </TouchableOpacity>
      </View>
    </View>
  )
};