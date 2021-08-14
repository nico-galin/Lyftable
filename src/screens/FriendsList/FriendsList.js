import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header/Header';
import { systemStyles } from '../../assets/styles';
import SearchBar from '../../components/SearchBar/SearchBar';
import CodeBanner from '../../components/CodeBanner/CodeBanner';
import { useAppContext } from '../../contexts/AppContext';
import styles from './FriendsList.style';
import { useNavigation } from '@react-navigation/native';

export const FriendsList = ({ route }) => {
  const { userFriends, userMetadata, openModal } = useAppContext();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = val => {
    setSearchText(val);
  };

  const filteredFriends = Object.entries(userFriends)
    .filter(([id, friend]) =>
      friend.name.toLowerCase().includes(searchText.toLowerCase()),
    )
    .map(([id, friend], ind) => (
      <View key={ind}>
        <Text>{friend.name}</Text>
      </View>
    ));

  return (
    <View style={systemStyles.pageContainer}>
      <Header backButton={true} title={'Friends List'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar
          value={searchText}
          onChangeText={handleSearch}
          onBlur={() => handleSearch('')}
          onButtonPress={() => openModal('AddFriends')}
          iconName={'plus'}
        />
        {filteredFriends}
        <Text style={styles.friendCount}>
          {Object.keys(userFriends).length} Friends
        </Text>
      </ScrollView>
      <CodeBanner label={'Your Friend Code'} code={userMetadata.id} data={{}} />
    </View>
  );
};
