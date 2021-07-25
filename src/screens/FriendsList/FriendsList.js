import React, { useState, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header/Header';
import { systemStyles } from '../../assets/styles';
import SearchBar from '../../components/SearchBar/SearchBar';
import CodeBanner from '../../components/CodeBanner/CodeBanner';
import { AppContext } from '../../contexts/AppContext';
import styles from './FriendsList.style';

export const FriendsList = ({ route }) => {
  const [searchText, setSearchText] = useState("");
  const context = useContext(AppContext);
  const handleSearch = (val) => {
    setSearchText(val);
  }

  return (
    <View style={systemStyles.pageContainer}>
      <Header backButton={true} title={'Friends List'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar value={searchText} onChangeText={handleSearch} onBlur={() => handleSearch('')} onButtonPress={() => context.openModal("AddFriends")} iconName={'plus'}/>
        <Text style={styles.friendCount}>{Object.keys(context.userData.friends).length} Friends</Text>
      </ScrollView>
      <CodeBanner label={'Your Friend Code'} code={'ABCDEFGHIJK'} data={{}} />
    </View>
  );
};