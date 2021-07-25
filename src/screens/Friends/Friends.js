import React, { useState, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../components/Header/Header';
import { systemStyles } from '../../assets/styles';
import OptionSlider from '../../components/OptionSlider/OptionSlider';
import SearchBar from '../../components/SearchBar/SearchBar';
import CodeBanner from '../../components/CodeBanner/CodeBanner';
import { AppContext } from '../../contexts/AppContext';

export const Friends = ({route}) => {
  const [tab, setTab] = useState("Feed");
  const [searchText, setSearchText] = useState("");
  const context = useContext(AppContext);
  const handleSearch = (val) => {
    setSearchText(val);
  }

  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Friends'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={systemStyles.pageSection}>
          <OptionSlider options={["Feed", "List"]} default={0} onChange={setTab}/>
        </View>
        { tab === "Feed" &&
          <View></View>
        }
        { tab === "List" &&
          <SearchBar value={searchText} onChangeText={handleSearch} onBlur={() => handleSearch('')} onButtonPress={() => context.openModal("AddFriends")} iconName={'plus'}/>
        }
      </ScrollView>
      <CodeBanner label={'Your Friend Code'} code={'ABCDEFGHIJK'} data={{}} />
    </View>
  );
};