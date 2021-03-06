import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Card.style';
import theme from '../../assets/theme.style';

export default ({
  onPress,
  onDelete,
  data,
  topData,
  bottomData,
  moveable = false,
  ind = 0,
}) => {
  return (
    <CardWrapper onPress={onPress} ind={ind}>
      <View style={styles.leftContent}>
        {onDelete != null && (
          <TouchableOpacity
            activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
            style={styles.delete}
            onPress={onDelete}>
            <Icon name={'delete'} size={25} color={theme.SUBTITLE_COLOR} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.rightContent}>
        <View style={styles.dataContainer}>
          {topData && <Text style={styles.subData}>{topData}</Text>}
          <Text style={styles.data}>{data}</Text>
          {bottomData && <Text style={styles.subData}>{bottomData}</Text>}
        </View>
        {moveable && (
          <Icon
            name={'drag-horizontal-variant'}
            size={25}
            color={theme.SUBTITLE_COLOR}
            style={styles.handle}
          />
        )}
      </View>
    </CardWrapper>
  );
};

const CardWrapper = ({ onPress, children, ind }) => {
  return onPress != null ? (
    <TouchableOpacity
      activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
      style={styles.container}
      onPress={onPress}
      key={'Card' + ind}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={styles.container} key={'Card' + ind}>
      {children}
    </View>
  );
};
