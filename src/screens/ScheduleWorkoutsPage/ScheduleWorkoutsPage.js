import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import {ScrollView, Text, View, TouchableWithoutFeedback} from 'react-native';
import styles from './ScheduleWorkoutsPage.style';
import { systemStyles } from '../../assets/styles';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import OptionSlider from '../../components/OptionSlider/OptionSlider';
import Counter from '../../components/Counter/Counter';
import { filterSplitsByString, getWeekday, validator } from '../../services/utilities';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import SplitCard from '../../components/SplitCard/SplitCard';
import SearchBar from '../../components/SearchBar/SearchBar';
let _ = require("lodash");

export const ScheduleWorkoutsPage = ({ route }) => {
  const { userSplits, addUserWorkout, addUserWorkoutsBATCH } = useAppContext();
  const navigation = useNavigation();
  const splits = userSplits;
  const [splitSearchText, setSplitSearchText] = useState("");
  const [selectedSplit, setSelectedSplit] = useState({});
  const [date, setDate] = useState(new Date());
  const [repeating, setRepeating] = useState(false);
  const [weekCounter, setWeekCounter] = useState(4);
  const [selectedDays, setSelectedDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [validation, setValidation] = useState({
    selectedSplit: [true, null],
    selectedDays: [true, null]
  });

  const handleRepeating = (val) => {
    if (val === "Yes") {
      setRepeating(true);
    } else {
      setRepeating(false);
    }
  }

  const handleSubmit = () => {
    const newValidation = {
      selectedSplit: validator.validateSplit(selectedSplit),
      selectedDays: validator.validateSelectedDays(repeating, selectedDays)
    }
    setValidation(newValidation);
    if (!validator.allValid(newValidation)) return;
    let workout = {
      split: Object.assign({}, selectedSplit),
      scheduled: date.toISOString(),
    }
    if (repeating) {
      addUserWorkoutsBATCH(workout, weekCounter, selectedDays);
    } else {
      addUserWorkout(workout);
    }
    navigation.goBack();
  }

  const toggleDay = (ind) => {
    let newSelectedDays = [...selectedDays];
    newSelectedDays[ind] = newSelectedDays[ind] === 1 ? 0 : 1;
    setSelectedDays(newSelectedDays);
  }

  const filteredSplits = filterSplitsByString(splits, splitSearchText);
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={"Schedule Workouts"} backButton={true} />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <InputWrapper label={'Split'} valid={validation.selectedSplit}>
          { Object.keys(selectedSplit).length > 0 ?
            <SplitCard split={selectedSplit} onDelete={() => setSelectedSplit({})}/>
          :
            <ScrollView style={styles.yourSplits} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
              <SearchBar value={splitSearchText} placeholder={"Search Splits..."} onChangeText={setSplitSearchText}/>
              {filteredSplits.length > 0 ?
                filteredSplits.map(([id, split], ind) => (
                  <View key={ind}>
                    <SplitCard split={split} onPress={() => setSelectedSplit(split)} onInfo={() => {}}/>
                    {ind != filteredSplits.length - 1 && <View style={systemStyles.formSpacer}/>}
                  </View>
                ))
              : 
                <Text style={styles.noSplitsText}>No Results</Text>
              }
            </ScrollView>
          }
        </InputWrapper>
        <InputWrapper label={"Starting Date"}>
          <DatePicker 
            date={date}
            onDateChange={setDate}
            androidVariant={"iosClone"}
            minuteInterval={5}
            mode={"datetime"}
            fadeToColor={theme.BACKGROUND_COLOR}
          />
        </InputWrapper>
        <InputWrapper label={'Repeating?'} valid={validation.selectedDays}>
          <OptionSlider options={["No", "Yes"]} defaultIndex={0} onChange={handleRepeating}/>
          {repeating && 
            <View>
              <View style={systemStyles.formSpacer}/>
              <Counter formattedValue={`for ${weekCounter} weeks`} initialValue={weekCounter} min={1} increment={1} onChange={setWeekCounter}/>
              <View style={systemStyles.formSpacer}/>
              <View style={styles.daySelectorContainer}>
                {selectedDays.map((val, ind) => (
                    <TouchableWithoutFeedback key={ind} onPress={() => toggleDay(ind)}>
                      <View style={[ styles.dayBtn, val === 1 ? styles.dayBtnActive : null]}>
                        <Text style={styles.dayBtnText}>{getWeekday(ind, "d")}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          }
        </InputWrapper>
        <View style={systemStyles.formSpacer}/>
        <ActionButton onPress={handleSubmit} text={'Done'} height={'large'} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
        <View style={systemStyles.bottomSpacer}/>
      </ScrollView>
    </View>
  )
};