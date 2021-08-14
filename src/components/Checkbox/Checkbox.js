import React from 'react';
import { View } from 'react-native';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../assets/theme.style';
import styles from './Checkbox.style';

export default ({ checked = false, active = false }) => {
  const checkboxStyles = [styles.container];
  if (checked) {
    checkboxStyles.push(styles.checked);
  } else if (active) {
    checkboxStyles.push(styles.active);
  } else {
    checkboxStyles.push(styles.inactive);
  }
  return (
    <View style={checkboxStyles}>
      {checked ? (
        <MatComIcon
          name={'check-bold'}
          size={13}
          color={theme.FOREGROUND_COLOR}
        />
      ) : null}
    </View>
  );
};
