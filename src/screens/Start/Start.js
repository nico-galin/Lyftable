import React, { useState } from 'react';
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

const sampleWorkouts = [
  {
    id: "112111111111111212121",
    split: {
      creator: {
        name: "Nico Galin",
        id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
        profile_photo: "https://picsum.photos/200/200"
      },
      name: "Push",
      description: "Gnarly workout for those days you really just want to feel the pain.",
      exercises: [
        {
          movement: "Chest Press",
          time_limit: 12312312,
          set_count: 4,
          repetitions: [10, 10, 10, 10],
          rest_time: 60000,
          actual_data: {
            repetitions: [11, 12, 11, 11],
            weights: [120, 120, 120, 130],
            previous_weights: [110, 110, 110, 130],
            previous_repetitions: [11, 11, 11, 11],
            completion_times: [12333, 13333, 13333, 1333],
            overall_time: 12312312
          }
        },
        {
          movement: "Chest Flye",
          time_limit: 12312312,
          set_count: 4,
          repetitions: [10, 11, 10, 10],
          rest_time: 60000
        },
      ],
      estimated_time: 100000200,
    },
    scheduled: "2021-07-19T08:03:48.530Z",
    completed: false,
    start_time: "stringifieddateobject",
    end_time: "stringifieddateobject",
    elapsed_time: 0,
    pauses: 0,
  }
]

const workoutFilterFunction = (filter, workout) => {
  const lcFilter = filter.toLowerCase();
  if (workout.split.name.toLowerCase().includes(lcFilter)) {
    return true;
  } else if (workout.split.description.toLowerCase().includes(lcFilter)) {
    return true;
  } else if (workout.split.creator.name.toLowerCase().includes(lcFilter)) {
    return true;
  }
  for (let i = 0, l = workout.split.exercises.length; i < l; i++) {
    if (workout.split.exercises[i].movement.toLowerCase().includes(lcFilter)) {
      return true;
    }
  }
  return false;
}

export const Start = () => {
  const [splitSearch, onSplitSearch] = useState("");
  const workoutsToday = sampleWorkouts.filter(workout => isSameDay(new Date(), parseISO(workout.scheduled)))
  const workoutsFiltered = sampleWorkouts.filter(w => workoutFilterFunction(splitSearch, w));

  const handleAddSplit = () => {

  }
  
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Start a Workout'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.buttonRow, systemStyles.pageSection]}>
          <ActionButton text={'Schedule Workouts'} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
          <View style={styles.gap} />
          <ActionButton text={'Custom Workout'} color={theme.PRIMARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
        </View>
        { workoutsToday.length > 0 &&
          <InputWrapper label={'Scheduled'}>
            {workoutsToday.map(workout => (
              <SplitCard split={workout.split} scheduled={workout.scheduled} />
            ))}
          </InputWrapper>
        }
        <InputWrapper label={'All Splits'}>
            <SearchBar value={splitSearch} onChangeText={onSplitSearch} onBlur={() => onSplitSearch("")} onButtonPress={handleAddSplit} iconName={'plus'}/>
          {workoutsFiltered.length > 0 ? workoutsFiltered.map((workout, ind) => (
            <View key={ind}><SplitCard key={ind} split={workout.split} /></View>
          ))
          :
          <Text style={styles.noSplitsText}>No Results</Text>
          }
        </InputWrapper>
      </ScrollView>
    </View>
  );
};