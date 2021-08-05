import React, { useEffect, useState } from 'react';
import { ScrollView, View, Button, Text, TouchableOpacity } from 'react-native';
import styles from './ActiveWorkout.style';
import Header from '../../components/Header/Header';
import IonIcon from 'react-native-vector-icons/Ionicons';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import { systemStyles } from '../../assets/styles';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import theme from '../../assets/theme.style';
import { formatSetsReps, generateUniqueId, msToDigital } from '../../services/utilities';

export const ActiveWorkout = ({ route }) => {
  const context = useAppContext();
  const navigation = useNavigation();
  let [workout, setWorkout] = useState(route.params.data);
  let [mainTimer, setMainTimer] = useState(0);
  let [setTimers, setSetTimers] = useState(new Array(workout.split.exercises.length));
  let [pauses, setPauses] = useState(0);
  useEffect(() => {
    const newWorkout = JSON.parse(JSON.stringify(workout));
    if (!newWorkout.id) newWorkout.id = generateUniqueId();
    if (!newWorkout.start_time) newWorkout.start_time = new Date().toISOString();
    newWorkout.split.exercises.forEach((ex, ind) => {
        if (!ex.weights) newWorkout.split.exercises[ind].weights = new Array(ex.repetitions.length);
        if (!ex.previous_weights)newWorkout.split.exercises[ind].previous_weights = [/* NEED TO FILL LATER*/];
        if (!ex.previous_repetitions) newWorkout.split.exercises[ind].previous_repetitions = [/* NEED TO FILL LATER*/];
        if (!ex.completion_times) newWorkout.split.exercises[ind].completion_times = new Array(ex.repetitions.length);
        if (!ex.elapsed_time) newWorkout.split.exercises[ind].elapsed_time = 0;
    })
    newWorkout.completed = false;
    setWorkout(newWorkout);
    const mainInterval = setInterval(() => {
      setMainTimer(mainTimer => mainTimer + 1000);
    }, 1000);

    return () => {
      clearInterval(mainInterval);
      setTimers.forEach(timer => clearInterval(timer));
    }
  }, []);

  const handleInfo = () => {
    return null;
  }

  const handleFinish = () => {
    return null;
  }
  const exerciseTiles = workout.split.exercises.map((ex, ind) => {
    if (ex.active) {
      return (
        <InputWrapper label={ex.movement} secondaryLabel={ex.elapsed_time > 0 ? msToDigital(ex.elapsed_time) + " / " : "" + msToDigital(ex.time_limit)}>
          <Text>Needs to be implemented</Text>
        </InputWrapper>
      )
    } else {
      const completedSets = ex.weights ? ex.weights.filter(w => w != null).length : 0;
      return (
        <View key={ind} style={styles.exerciseClosedContainer}>
          <View style={styles.exerciseLeftContent}>
            <Text style={styles.exerciseName}>{ex.movement}</Text>
            <Text style={styles.exerciseProgress}>{completedSets > 0 ? completedSets + " / " : ""}{formatSetsReps(ex.set_count, ex.repetitions)}</Text>
          </View>
          <View style={styles.exerciseRightContent}>
            <Text style={styles.exerciseTime}>{ex.elapsed_time > 0 ? msToDigital(ex.elapsed_time) + " / " : ""}{msToDigital(ex.time_limit)}</Text>
            <TouchableOpacity style={styles.exercisePlayBtn}>
              <IonIcon name={'md-play'} size={23} color={theme.SECONDARY_COLOR}/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  });
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={workout.split.name}
        leftButtonName={"dots-horizontal"} leftButtonOnPress={handleInfo} leftButtonColor={theme.SUBTITLE_COLOR}
        rightButtonText={"Finish"} rightButtonOnPress={handleFinish} rightButtonColor={theme.SECONDARY_COLOR}
      />
      <Text style={styles.mainTimer}>{msToDigital(mainTimer)}{workout.split.estimated_time ? ` / ${msToDigital(workout.split.estimated_time)}` : ""}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        { exerciseTiles }
      </ScrollView>
    </View>
  );
};