import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from './Header.style';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';

export default ({
  title = '',
  modal = false,
  subtitle,
  maxTitleLength,
  maxSubtitleLength,
  backButton = false,
  leftButtonText,
  leftButtonName,
  leftButtonOnPress,
  leftButtonSize = 25,
  leftButtonColor = theme.PRIMARY_COLOR,
  rightButtonText,
  rightButtonName,
  rightButtonOnPress,
  rightButtonSize = 25,
  rightButtonColor = theme.PRIMARY_COLOR,
}) => {
  const navigation = backButton ? useNavigation() : null;
  let leftIcon, rightIcon;
  if (MatIcon.hasIcon(leftButtonName)) {
    leftIcon = (
      <MatIcon
        name={leftButtonName}
        size={leftButtonSize}
        color={leftButtonColor}
      />
    );
  } else {
    leftIcon = (
      <MatComIcon
        name={leftButtonName}
        size={leftButtonSize}
        color={leftButtonColor}
      />
    );
  }
  if (MatIcon.hasIcon(leftButtonName)) {
    rightIcon = (
      <MatIcon
        name={rightButtonName}
        size={rightButtonSize}
        color={rightButtonColor}
      />
    );
  }
  if (IonIcon.hasIcon(rightButtonName)) {
    rightIcon = (
      <IonIcon
        name={rightButtonName}
        size={rightButtonSize}
        color={rightButtonColor}
      />
    );
  } else {
    rightIcon = (
      <MatComIcon
        name={rightButtonName}
        size={rightButtonSize}
        color={rightButtonColor}
      />
    );
  }

  return (
    <View
      style={
        modal ? styles.container : [styles.container, styles.extraPadding]
      }>
      {backButton && (
        <TouchableOpacity
          activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <FeatherIcon
            name={'chevron-left'}
            size={25}
            color={theme.PRIMARY_COLOR}
          />
        </TouchableOpacity>
      )}
      {leftButtonName && leftButtonOnPress ? (
        <TouchableOpacity
          activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
          style={styles.leftBtn}
          onPress={leftButtonOnPress}>
          {leftIcon}
        </TouchableOpacity>
      ) : null}
      {leftButtonText && leftButtonOnPress ? (
        <TouchableOpacity
          activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
          style={[styles.leftBtn, { backgroundColor: leftButtonColor }]}
          onPress={leftButtonOnPress}>
          <Text style={styles.otherBtnText}>{leftButtonText}</Text>
        </TouchableOpacity>
      ) : null}
      <View>
        <Text style={styles.title}>
          {!maxTitleLength || title.length < maxTitleLength
            ? title
            : title.substring(0, maxTitleLength) + '...'}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle}>
            {!maxSubtitleLength || subtitle.length < maxSubtitleLength
              ? subtitle
              : subtitle.substring(0, maxSubtitleLength) + '...'}
          </Text>
        ) : null}
      </View>
      {rightButtonName && rightButtonOnPress ? (
        <TouchableOpacity
          activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
          style={styles.rightBtn}
          onPress={rightButtonOnPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : null}
      {rightButtonText && rightButtonOnPress ? (
        <TouchableOpacity
          activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
          style={[styles.rightBtn, { backgroundColor: rightButtonColor }]}
          onPress={rightButtonOnPress}>
          <Text style={styles.otherBtnText}>{rightButtonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
