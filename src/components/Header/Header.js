import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Header.style';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';

export default ({title = "Title", backButton = false, rightButtonName, rightButtonOnPress}) => {
  const navigation = backButton ? useNavigation() : null;
  return (
    <View style={styles.container}>
      {backButton && 
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <FeatherIcon name={'chevron-left'} size={25} color={theme.PRIMARY_COLOR}/>
        </TouchableOpacity>
      }
      <Text style={styles.title}>{title}</Text>
      {rightButtonName && rightButtonOnPress ? 
        <TouchableOpacity style={styles.rightBtn} onPress={rightButtonOnPress}>
          <MatComIcon name={rightButtonName} size={25} color={theme.SUBTITLE_COLOR}/>
        </TouchableOpacity>
      : null}
    </View>
  );
};