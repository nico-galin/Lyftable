import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './Header.style';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';

export default ({title = "Title", backButton = false, rightButtonName, rightButtonOnPress, rightButtonSize = 25}) => {
  const navigation = backButton ? useNavigation() : null;
  const icon = <MatIcon name={rightButtonName} size={rightButtonSize} color={theme.PRIMARY_COLOR}/>;
  if (!icon) icon = <MatComIcon name={rightButtonName} size={rightButtonSize} color={theme.PRIMARY_COLOR}/>
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
          {icon}
        </TouchableOpacity>
      : null}
    </View>
  );
};