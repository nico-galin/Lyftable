import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './Header.style';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';

export default ({title = "Title", backButton = false}) => {
  const navigation = backButton ? useNavigation() : null;
  return (
    <View style={styles.container}>
      {backButton && 
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <FeatherIcon name={'chevron-left'} size={25} color={theme.PRIMARY_COLOR}/>
        </TouchableOpacity>
      }
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};