import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './SearchBar.style';
import { systemStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';

export default ({
  value = '',
  placeholder = 'Search...',
  onChangeText = () => {},
  onBlur = () => {},
  onButtonPress = () => {},
  buttonContent = '',
  buttonColor = theme.SECONDARY_COLOR,
  buttonTextColor = theme.BACKGROUND_COLOR,
  iconName,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, systemStyles.pageSection]}>
        <TextInput
          value={value}
          style={styles.textInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
        <Icon name={'search'} size={20} color={theme.PLACEHOLDER_COLOR} />
      </View>
      {iconName || buttonContent ? (
        <TouchableOpacity
          activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
          onPress={onButtonPress}
          style={[styles.button, { backgroundColor: buttonColor }]}>
          {iconName ? (
            <FeatherIcon
              name={iconName}
              size={22}
              color={theme.BACKGROUND_COLOR}
            />
          ) : (
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>
              {buttonContent}
            </Text>
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
