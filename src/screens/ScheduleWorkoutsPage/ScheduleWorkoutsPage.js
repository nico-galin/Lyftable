import React, { useState, useContext } from 'react';
import {ScrollView, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import styles from './ScheduleWorkoutsPage.style';
import { systemStyles } from '../../assets/styles';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import OptionSlider from '../../components/OptionSlider/OptionSlider';
import Counter from '../../components/Counter/Counter';
import { filterSplitsByString, formatSetsReps, getSplitTemplate, msToHM, getWeekday } from '../../services/utilities';
import theme from '../../assets/theme.style';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import SplitCard from '../../components/SplitCard/SplitCard';
import SearchBar from '../../components/SearchBar/SearchBar';
let _ = require("lodash");

export const ScheduleWorkoutsPage = ({ route }) => {
  const context = useAppContext();
  const navigation = useNavigation();
  const [splitSearchText, setSplitSearchText] = useState("");
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [repeating, setRepeating] = useState(false);
  const [weekCounter, setWeekCounter] = useState(4);
  const [selectedDays, setSelectedDays] = useState([0, 0, 0, 0, 0, 0, 0]);

  const handleRepeating = (val) => {
    if (val === "Yes") {
      setRepeating(true);
    } else {
      setRepeating(false);
    }
  }

  const handleSubmit = () => {

  }

  const toggleDay = (ind) => {
    let newSelectedDays = [...selectedDays];
    newSelectedDays[ind] = newSelectedDays[ind] === 1 ? 0 : 1;
    setSelectedDays(newSelectedDays);
  }

  const filteredSplits = filterSplitsByString(context.userData.splits, splitSearchText);
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={"Schedule Workouts"} backButton={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputWrapper label={'Split'}>
          { selectedSplit ?
            <SplitCard split={selectedSplit} onDelete={() => setSelectedSplit(null)}/>
          :
            <View>
              <SearchBar value={splitSearchText} placeholder={"Search Splits..."} onChangeText={setSplitSearchText}/>
              {filteredSplits.map(([id, split], ind) => (
                <View key={ind}>
                  <SplitCard split={split} onPress={() => setSelectedSplit(split)}/>
                  {ind != filteredSplits.length - 1 && <View style={styles.spacer}/>}
                </View>
              ))}
            </View>
          }
        </InputWrapper>
        <InputWrapper label={"Starting Date"}>

        </InputWrapper>
        <InputWrapper label={"Starting Time"}>

        </InputWrapper>
        <InputWrapper label={'Repeating?'}>
          <OptionSlider options={["No", "Yes"]} defaultIndex={0} onChange={handleRepeating}/>
          {repeating && 
            <View>
              <View style={styles.spacer}/>
              <Counter formattedValue={`for ${weekCounter} weeks`} initialValue={weekCounter} min={1} increment={1} onChange={setWeekCounter}/>
              <View style={styles.spacer}/>
              <View style={styles.daySelectorContainer}>
                {selectedDays.map((val, ind) => (
                    <TouchableWithoutFeedback onPress={() => toggleDay(ind)}>
                      <View style={[ styles.dayBtn, val === 1 ? styles.dayBtnActive : null]}>
                        <Text style={styles.dayBtnText}>{getWeekday(ind, "d")}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          }
        </InputWrapper>
        <View style={styles.spacer}/>
        <ActionButton onPress={handleSubmit} text={'Done'} height={'large'} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
        <View style={styles.bottomSpacer}/>
      </ScrollView>
    </View>
  )
};