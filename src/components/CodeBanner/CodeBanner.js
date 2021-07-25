import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './CodeBanner.style';
import theme from '../../assets/theme.style';

export default ({label, code, data}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.info} onPress={() => Clipboard.setString(code)}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>{code.slice(0, 15)}...</Text>
          <MatIcon name={"content-copy"} size={13} color={theme.BACKGROUND_COLOR} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.prompt}>
        <Text style={styles.promptText}>tap to open qr</Text>
        <AntIcon name={'qrcode'} size={40} color={theme.BACKGROUND_COLOR}/>
      </TouchableOpacity>
    </View>
  );
};