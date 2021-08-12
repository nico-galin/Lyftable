import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { isSameDay, parseISO } from 'date-fns';
import styles from './Start.style';
import { systemStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';
import Header from '../../components/Header/Header'
import ActionButton from '../../components/ActionButton/ActionButton';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import SplitCard from '../../components/SplitCard/SplitCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import { filterSplitsByString } from '../../services/utilities';

export const Start = () => {
  const navigation = useNavigation();
  const { userWorkouts, userSplits } = useAppContext();
  const [splitSearch, onSplitSearch] = useState("");
  const workoutsToday = Object.entries(userWorkouts).filter(([id, workout]) => isSameDay(new Date(), parseISO(workout.scheduled)))
  const splitsFiltered = filterSplitsByString(userSplits, splitSearch);

  const handleAddSplit = () => {

  }
  
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Start a Workout'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.buttonRow, systemStyles.pageSection]}>
          <ActionButton text={'Schedule Workouts'} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} onPress={() => navigation.navigate('ScheduleWorkouts')}/>
          <View style={styles.gap} />
          <ActionButton text={'Custom Workout'} color={theme.PRIMARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
        </View>
        { workoutsToday.length > 0 &&
          <InputWrapper label={'Scheduled'}>
            {workoutsToday.map(([id, workout], ind) => (
              <View key={ind}>
                <SplitCard split={workout.split} scheduled={workout.scheduled} />
                {ind != workoutsToday.length - 1 && <View style={systemStyles.formSpacer}/>}
              </View>
            ))}
          </InputWrapper>
        }
        <InputWrapper label={'All Splits'}>
          <SearchBar value={splitSearch} onChangeText={onSplitSearch} onBlur={() => onSplitSearch("")} onButtonPress={handleAddSplit} iconName={'plus'}/>
          {splitsFiltered.length > 0 ? splitsFiltered.map(([id, split], ind) => (
            <View key={ind}>
              <SplitCard split={split} />
              {ind != splitsFiltered.length - 1 && <View style={systemStyles.formSpacer}/>}
            </View>
          )):
            <Text style={styles.noSplitsText}>No Results</Text>
          }
        </InputWrapper>
      </ScrollView>
    </View>
  );
};