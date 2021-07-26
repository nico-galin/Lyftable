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
  const context = useAppContext();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [friends, setFriends] = useState({});
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      setFriends(context.getUserFriends());
    });
    return willFocusSubscription;
  }, []);

  const handleSearch = (val) => {
    setSearchText(val);
  }

  const filteredFriends = Object.entries(friends).filter(([id, friend]) => friend.name.toLowerCase().includes(searchText.toLowerCase())).map(([id, friend], ind) => (
    <View key={ind}>
      <Text>{friend.name}</Text>
    </View>
  ));

  return (
    <View style={systemStyles.pageContainer}>
      <Header backButton={true} title={'Friends List'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar value={searchText} onChangeText={handleSearch} onBlur={() => handleSearch('')} onButtonPress={() => context.openModal("AddFriends")} iconName={'plus'}/>
        { filteredFriends }
        <Text style={styles.friendCount}>{Object.keys(context.userData.friends).length} Friends</Text>
      </ScrollView>
      <CodeBanner label={'Your Friend Code'} code={'ABCDEFGHIJKASDASDASDASDASDSAD'} data={{}} />
    </View>
  );
};