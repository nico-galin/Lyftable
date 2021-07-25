import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './CodeBanner.style';
import theme from '../../assets/theme.style';

export default ({label, code, data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.code}>{code}</Text>
      </View>
      <View style={styles.prompt}>
        <Text style={styles.promptText}>tap to open qr</Text>
        <Icon name={'qrcode'} size={50} color={theme.BACKGROUND_COLOR}/>
      </View>
    </View>
  );
};