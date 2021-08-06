import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './Header.style';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';

export default ({
  title = "Title", subtitle, backButton = false,
  leftButtonText, leftButtonName, leftButtonOnPress, leftButtonSize = 25, leftButtonColor = theme.PRIMARY_COLOR, 
  rightButtonText, rightButtonName, rightButtonOnPress, rightButtonSize = 25, rightButtonColor = theme.PRIMARY_COLOR
}) => {
  const navigation = backButton ? useNavigation() : null;
  let leftIcon, rightIcon;
  if (MatIcon.hasIcon(leftButtonName)) {
    leftIcon = <MatIcon name={leftButtonName} size={leftButtonSize} color={leftButtonColor}/>;
  } else {
    leftIcon = <MatComIcon name={leftButtonName} size={leftButtonSize} color={leftButtonColor}/>;
  }
  if (MatIcon.hasIcon(leftButtonName)) {
    rightIcon = <MatIcon name={rightButtonName} size={rightButtonSize} color={rightButtonColor}/>;
  } else {
    rightIcon = <MatComIcon name={rightButtonName} size={rightButtonSize} color={rightButtonColor}/>;
  }

  return (
    <View style={styles.container}>
      {backButton && 
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <FeatherIcon name={'chevron-left'} size={25} color={theme.PRIMARY_COLOR}/>
        </TouchableOpacity>
      }
      {leftButtonName && leftButtonOnPress ?
        <TouchableOpacity style={styles.leftBtn} onPress={leftButtonOnPress}>
          {leftIcon}
        </TouchableOpacity>
      : null}
      {leftButtonText && leftButtonOnPress ? 
        <TouchableOpacity style={[styles.leftBtn, {backgroundColor: leftButtonColor}]} onPress={leftButtonOnPress}>
          <Text style={styles.otherBtnText}>{leftButtonText}</Text>
        </TouchableOpacity>
      : null}
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text>: null}
      </View>
      {rightButtonName && rightButtonOnPress ?
        <TouchableOpacity style={styles.rightBtn} onPress={rightButtonOnPress}>
          {rightIcon}
        </TouchableOpacity>
      : null}
      {rightButtonText && rightButtonOnPress ? 
        <TouchableOpacity style={[styles.rightBtn, {backgroundColor: rightButtonColor}]} onPress={rightButtonOnPress}>
          <Text style={styles.otherBtnText}>{rightButtonText}</Text>
        </TouchableOpacity>
      : null}
    </View>
  );
};