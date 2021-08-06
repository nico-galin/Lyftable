import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { styles, swipeListStyles } from './ActiveWorkout.style';
import Header from '../../components/Header/Header';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import { systemStyles } from '../../assets/styles';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import theme from '../../assets/theme.style';
import { formatSetsReps, generateUniqueId, msToDigital } from '../../services/utilities';
import ActionButton from '../../components/ActionButton/ActionButton';
import Checkbox from '../../components/Checkbox/Checkbox';
import { SwipeListView } from 'react-native-swipe-list-view';

export const ActiveWorkout = ({ route }) => {
  const context = useAppContext();
  const navigation = useNavigation();
  const workoutMetadata = {
    id: route.params.data.id != null ? route.params.data.id : generateUniqueId(),
    start_time: route.params.data.start_time != null ? route.params.data.start_time : new Date().toISOString(),
    scheduled: route.params.data.scheduled,
    completed: route.params.data.completed != null ? route.params.data.completed : false,
  };
  const [splitMetaData, setSplitMetadata] = useState(route.params.data.split ? {
    creator: route.params.data.split.creator,
    name: route.params.data.split.name,
    description: route.params.data.split.description,
    estimated_time: route.params.data.split.estimated_time,
  } : {
    creator: {
      // [INCOMPLETE] FILL IN USER DATA HERE
      name: "",
      id: "",
      profile_photo: "",
    },
    name: "New Workout",
    description: "This is a new workout.",
    estimated_time: 0,
  });
  const [exercises, setExercises] = useState(route.params.data && route.params.data.split ? route.params.data.split.exercises.map((ex, ind) => ({
    ...ex,
    weights: ex.weights != null ? ex.weights : new Array(ex.repetitions.length),
    previous_weights: ex.previous_weights != null ? ex.previous_weights : new Array(ex.repetitions.length) /* [INCOMPLETE] Need to set prev weights*/,
    previous_repetitions: ex.previous_repetitions != null ? ex.previous_repetitions : new Array(ex.repetitions.length) /* [INCOMPLETE] Need to set prev reps*/,
    completion_times: ex.completion_times != null ? ex.completion_times : new Array(ex.repetitions.length),
    completed: ex.completed != null ? ex.completed : false,
  })) : []);
  const [mainTimer, setMainTimer] = useState(0);
  const [mainInterval, setMainInterval] = useState();
  const [exerciseTimers, setExerciseTimers] = useState(exercises.map(ex => {
    if (ex.elapsed_time) return ex.elapsed_time;
    return 0;
  }));
  const [exerciseIntervals, setExerciseIntervals] = useState(new Array(exercises.length));
  const [breaks, setBreaks] = useState([]);

  useEffect(() => {
    setMainInterval(setInterval(() => {
      setMainTimer(mainTimer => mainTimer + 1000);
    }, 1000));
    let newExercises = exercises.map(ex => JSON.parse(JSON.stringify(ex)));
    if (exercises[0] != null) newExercises[0].open = true;
    setExercises(newExercises)
    return () => {
      clearInterval(mainInterval);
      exerciseIntervals.forEach(interval => clearInterval(interval));
    }
  }, []);

  const activateExercise = (ind) => {
    setExerciseIntervals(exerciseIntervals => {
      let newExerciseIntervals = exerciseIntervals.map(exInterval => JSON.parse(JSON.stringify(exInterval)));
      newExerciseIntervals[ind] = setInterval(() => {
        setExerciseTimers(exerciseTimers => {
          let newExerciseTimers = [...exerciseTimers];
          newExerciseTimers[ind] += 1000;
          return newExerciseTimers;
        });
      }, 1000);
      return newExerciseIntervals;
    });
    setExercises(exercises => {
      let newExercises = exercises.map(ex => JSON.parse(JSON.stringify(ex)));
      newExercises[ind].open = true;
      newExercises[ind].active = true;
      newExercises[ind].completed = false;
      return newExercises;
    });
  }

  const deactivateExercise = (ind, finished = false, close = true) => {
    clearInterval(exerciseIntervals[ind])
    setExercises(exercises => {
      let newExercises = exercises.map(ex => JSON.parse(JSON.stringify(ex)));
      if (finished) newExercises[ind].completed = true;
      newExercises[ind].active = false;
      if (close) newExercises[ind].open = false;
      return newExercises;
    });
  }

  const toggleExercise = (ind) => {
    setExercises(exercises => {
      let newExercises = exercises.map(ex => JSON.parse(JSON.stringify(ex)));2
      newExercises[ind].open = !newExercises[ind].open;
      return newExercises;
    });
  }

  const handleToggleSplit = (exInd, splitInd) => {
    let newExercises = exercises.map(ex => JSON.parse(JSON.stringify(ex)));
    if (newExercises[exInd].completion_times[splitInd]) {
      newExercises[exInd].completion_times[splitInd] = null;
    } else {
      newExercises[exInd].completion_times[splitInd] = new Date().toISOString();
    }
    setExercises(newExercises);
  }

  const handleChangeWeight = (exInd, splitInd, val) => {
    let newExercises = exercises.map(ex => JSON.parse(JSON.stringify(ex)));
    newExercises[exInd].weights[splitInd] = val;
    setExercises(newExercises);
  }

  const handleChangeReps = (exInd, splitInd, val) => {
    let newExercises = exercises.map(ex => JSON.parse(JSON.stringify(ex)));
    newExercises[exInd].repetitions[splitInd] = val;
    setExercises(newExercises);
  }

  const handleAddSet = (exInd) => {
    setExercises(prevExercises => (
      prevExercises.map((ex, ind) => {
        if (ind != exInd) return ex;
        return {
          ...ex,
          set_count: ex.set_count + 1,
          repetitions: ex.repetitions.concat([ex.repetitions[ex.repetitions.length - 1]]),
          weights: ex.weights.concat([ex.weights[ex.weights.length - 1]]),
        }
      })
    ));
  }

  const handleRemoveSet = (exInd, splitInd) => {
    setExercises(prevExercises => (
      prevExercises.map((ex, ind) => {
        if (ind != exInd) return ex;
        return {
          ...ex,
          set_count: ex.set_count - 1,
          repetitions: ex.repetitions.slice(0, splitInd).concat(ex.repetitions.slice(splitInd + 1)),
          weights: ex.weights.slice(0, splitInd).concat(ex.weights.slice(splitInd + 1))
        }
      })
    ));
  }

  const handleFinishExercise = (ind) => {
    deactivateExercise(ind, true);
  }

  const handleInfo = () => {
    return null;
  }

  const handleFinish = () => {
    return null;
  }
  const exerciseTiles = exercises.map((ex, ind) => {
    if (ex.open) {
      return (
        <TouchableOpacity style={styles.inputWrapperWrapper} key={ind} disabled={ex.active} onPress={() => toggleExercise(ind)}>
            <InputWrapper label={ex.movement} secondaryLabel={msToDigital(exerciseTimers[ind])}>
              <View style={styles.exRow}>
                <Text style={[styles.exSetColumn, styles.exTableHeading]}>Set</Text>
                <Text style={[styles.exPrevColumn, styles.exTableHeading]}>Previous</Text>
                <Text style={[styles.exLbsColumn, styles.exTableHeading]}>lbs</Text>
                <Text style={[styles.exRepsColumn, styles.exTableHeading]}>Reps</Text>
                <View style={styles.exProgressColumn}></View>
              </View>
              <SwipeListView 
                useFlatList={true}
                data={ex.repetitions.map((_, i) => ({key: i}))}
                renderItem={(data, rowMap) => (
                  <View key={data.index} style={[
                    styles.setContainer, styles.exRow,
                    ex.completion_times[data.index] != null ? styles.setContainerDone : "",
                  ]}>
                    <Text style={[styles.exSetColumn, styles.exTableValue]}>{data.index}</Text>
                    <Text style={[styles.exPrevColumn, styles.exTableValue]}>{ex.previous_weights[data.index] != null ? ex.previous_weights[data.index] : "None"}</Text>
                    {ex.completion_times[data.index] != null || !ex.active ?
                      <Text style={[styles.exLbsColumn, styles.exTableValue]}>{ex.weights[data.index]}</Text>
                    :
                      <View style={[styles.exRepsColumn, styles.exTableInput]}>
                        <TextInput blurOnSubmit selectTextOnFocus keyboardType={"decimal-pad"} style={styles.input} value={String(ex.weights[data.index] != null ? ex.weights[data.index] : "")} onChangeText={(val) => handleChangeWeight(ind, data.index, val)} />
                      </View>
                    }
                    {ex.completion_times[data.index] != null || !ex.active ?
                      <Text style={[styles.exRepsColumn, styles.exTableValue]}>{ex.repetitions[data.index]}</Text>
                    : 
                      <View style={[styles.exRepsColumn, styles.exTableInput]}>
                        <TextInput blurOnSubmit selectTextOnFocus keyboardType={"number-pad"} style={styles.input} value={String(ex.repetitions[data.index] != null ? ex.repetitions[data.index] : "")} onChangeText={(val) => handleChangeReps(ind, data.index, val)} />
                      </View>
                    }
                    <TouchableOpacity disabled={!ex.active} style={styles.exProgressColumn} onPress={() => handleToggleSplit(ind, data.index)}>
                      <Checkbox checked={ex.completion_times[data.index] != null}/>
                    </TouchableOpacity>
                  </View>
                )}
                renderHiddenItem={ (data, rowMap) => (
                  <View style={swipeListStyles.rowBack}>
                    <View style={swipeListStyles.delete}>
                      <Text style={swipeListStyles.delText}>Delete</Text>
                    </View>
                  </View>
                )}
                useAnimatedList
                disableRightSwipe
                tension = {0}
                rightActivationValue = {-100}
                onRightAction = {(key) => handleRemoveSet(ind, key)}
              />
              {ex.active ?
                <View style={systemStyles.row}>
                  <ActionButton text={"Add Set"} color={theme.SUBTITLE_COLOR} textColor={theme.BACKGROUND_COLOR} onPress={() => handleAddSet(ind)}/>
                  <View style={systemStyles.buttonSpacer}/>
                  <ActionButton color={theme.SPECIAL_FOREGROUND_COLOR_LIGHT} onPress={() => deactivateExercise(ind, false, false)} icon={
                    <MatComIcon name={'pause'} size={18} color={theme.BACKGROUND_COLOR}/>
                  }/>
                  <View style={systemStyles.buttonSpacer}/>
                  <ActionButton text={"Finish Exercise"} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} onPress={() => handleFinishExercise(ind)}/>
                </View>
              :
              <View style={systemStyles.row}>
                <ActionButton text={"Add Set"} color={theme.SUBTITLE_COLOR} textColor={theme.BACKGROUND_COLOR} onPress={() => handleAddSet(ind)}/>
                <View style={systemStyles.buttonSpacer}/>
                <ActionButton text={exerciseTimers[ind] > 0 ? "Keep Going" : "Start"} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} onPress={() => activateExercise(ind)}/>
              </View>
              }
            </InputWrapper>
        </TouchableOpacity>
      )
    } else {
      const completedSets = ex.weights != null ? ex.completion_times.filter(w => w != null).length : 0;
      return (
        <TouchableOpacity key={ind} onPress={() => toggleExercise(ind)} style={[styles.exerciseClosedContainer, ex.completed ? styles.exerciseFinished : styles.exerciseUnfinished]}>
            <View style={styles.exerciseLeftContent}>
              <Text style={[ex.completed ? styles.exerciseFinishedText : styles.exerciseUnfinishedText, styles.exerciseName]}>{ex.movement}</Text>
              <Text style={[ex.completed ? styles.exerciseFinishedText : styles.exerciseUnfinishedText, styles.exerciseProgress]}>{completedSets > 0 ? completedSets + " / " : ""}{formatSetsReps(ex.set_count, ex.repetitions)}</Text>
            </View>
            <View style={styles.exerciseRightContent}>
              <Text style={[styles.exerciseTime, ex.completed ? styles.exerciseFinishedText : styles.exerciseUnfinishedText]}>{msToDigital(exerciseTimers[ind])} / {msToDigital(ex.time_limit)}</Text>
              {ex.completed ?
                <View style={styles.exercisePlayBtn}>
                  <Checkbox checked={true}/>
                </View>
              :  
                <TouchableOpacity style={styles.exercisePlayBtn} onPress={() => activateExercise(ind)}>
                  <IonIcon name={'md-play'} size={23} color={theme.SECONDARY_COLOR}/>
                </TouchableOpacity>
              }
            </View>
        </TouchableOpacity>
      )
    }
  });
  return (
    <View style={systemStyles.pageMarginlessContainer}>
      <View style={systemStyles.pageContainer}>
        <Header title={splitMetaData.name}
          subtitle = {msToDigital(mainTimer)}
          leftButtonName={"dots-horizontal"} leftButtonOnPress={handleInfo} leftButtonColor={theme.SUBTITLE_COLOR}
          rightButtonText={"Finish"} rightButtonOnPress={handleFinish} rightButtonColor={theme.SECONDARY_COLOR}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={systemStyles.formSpacer} />
          <View style={systemStyles.formSpacer} />
          { exerciseTiles }
          <View style={systemStyles.bottomSpacer}/>
        </ScrollView>
      </View>
    </View>
  );
};