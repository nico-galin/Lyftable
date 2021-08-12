import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import theme from '../../assets/theme.style';
import styles from './OptionSlider.style';

export default ({options=[], defaultIndex = 0, onChange = () => {}}) => {
  const [selected, setSelected] = useState(defaultIndex);
  const handlePress = (value) => {
    onChange(options[value]);
    setSelected(value);
  }
  return (
    <View style={styles.container}>
      {options.map((option, ind) => (
        <TouchableOpacity activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY} key={"Option" + ind} style={ind === selected ? styles.selected : styles.unselected} onPress={() => handlePress(ind)}>
          <Text style={ind === selected ? styles.textSelected : styles.textUnselected}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};