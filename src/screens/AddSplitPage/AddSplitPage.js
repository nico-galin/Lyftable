import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './AddSplitPage.style';
import { systemStyles } from '../../assets/styles';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import theme from '../../assets/theme.style';
import { useAppContext } from '../../contexts/AppContext';
import SplitCard from '../../components/SplitCard/SplitCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export const AddSplitPage = ({ route }) => {
  const [splitSearchText, setSplitSearchText] = useState("");
  const [splitCode, setSplitCode] = useState("");
  const context = useAppContext();
  const navigation = useNavigation();

  const handleSubmitSplitCode = () => {

  }

  const filterSplit = (filter, split) => {
    const sFilter = filter.toLowerCase();
    if (split.name.toLowerCase().includes(sFilter)) {
      return true;
    }
    for (let i=0, l=split.exercises.length; i < l; i++) {
      if (split.exercises[i].movement.toLowerCase().includes(sFilter)) {
        return true;
      }
    }
    return false
  }
  const filteredSplits = Object.entries(context.verifiedSplits).filter(([id, split]) => filterSplit(splitSearchText, split));
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={"Add Split"} backButton={true}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputWrapper label={"Verified Splits"}>
          {Object.keys(context.verifiedSplits).length > 0 ?
            <View>
              <SearchBar value={splitSearchText} placeholder={"Search Verified Splits..."} onChangeText={setSplitSearchText}/>
              {filteredSplits.length > 0 ? filteredSplits.slice(0, 3).map(([id, split], ind) => (
                <View key={ind}><SplitCard key={ind} split={split} /></View>
              )): 
                <Text style={styles.centeredText}>No Results</Text>
              }
            </View>
          :
            <Text style={styles.centeredText}>None Available</Text>
          }
        </InputWrapper>
        <InputWrapper label={"Split Code"}>
          <SearchBar value={splitCode}
            placeholder={'Enter Split Code...'}
            onChangeText={setSplitCode}
            onButtonPress={handleSubmitSplitCode}
            buttonContent={'Go'}
            buttonColor={theme.SPECIAL_FOREGROUND_COLOR_DARK}/>
          <ActionButton text={'Scan Split QR Code'} color={theme.SECONDARY_COLOR} icon={
            <AntIcon name={'qrcode'} size={25} color={theme.BACKGROUND_COLOR}/>
          }/>
        </InputWrapper>
        <InputWrapper label={"Custom Split"}>
            <ActionButton text={"Create Custom Split"} height={"large"} color={theme.SPECIAL_FOREGROUND_COLOR_DARK} onPress={() => navigation.navigate("EditSplit")}/>
        </InputWrapper>
        <View style={styles.bottomSpacer}/>
      </ScrollView>
    </View>
  )
};