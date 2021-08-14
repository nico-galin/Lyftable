import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header/Header';
import { systemStyles } from '../../assets/styles';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';
import styles from './FriendsActivity.style';

export const FriendsActivity = ({ route }) => {
  const [searchText, setSearchText] = useState('');
  const context = useAppContext();
  const navigation = useNavigation();
  const handleSearch = val => {
    setSearchText(val);
  };

  return (
    <View style={systemStyles.pageContainer}>
      <Header
        title={'Friend Activity'}
        rightButtonName={'menu-open'}
        rightButtonOnPress={() => navigation.navigate('FriendsList')}
      />
      <Text style={styles.noActivity}>No Recent Activity Found</Text>
    </View>
  );
};
