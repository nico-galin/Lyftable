"use strict";
import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, StatusBar } from 'react-native';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { styles, swipeListStyles } from './ActiveWorkout.style';
import Header from '../../components/Header/Header';
import IonIcon from 'react-native-vector-icons/Ionicons';
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
import { useActiveWorkoutContext } from '../../contexts/ActiveWorkoutContext';
import { Loading } from '../Loading/Loading';
import changeNavigationBarColor from "react-native-navigation-bar-color";

const ActiveWorkoutPage = ({ route }) => {
  const { userWorkouts, addUserWorkout, replaceUserWorkout, openModal } = useAppContext();
  const { activeWorkoutID, activateWorkout, deactivateWorkout } = useActiveWorkoutContext();
  const navigation = useNavigation();
  const [workoutMetadata, setWorkoutMetadata] = useState({});
  const [splitMetadata, setSplitMetadata] = useState({});
  const [exercises, setExercises] = useState([]);
  const [mainTimer, setMainTimer] = useState(0);
  const [exerciseTimers, setExerciseTimers] = useState(exercises.map(ex => {
    if (ex.elapsed_time) return ex.elapsed_time;
    return 0;
  }));
  const [exerciseIntervals, setExerciseIntervals] = useState(new Array(exercises.length));
  const [breaks, setBreaks] = useState([]);
  const stateRef = useRef({
    workoutMetadata,
    splitMetadata,
    exercises,
    exerciseTimers,
    mainTimer,
    breaks
  });

  useEffect(() => {
    // Runs any time the given dependencies change
    stateRef.current = {
      workoutMetadata,
      splitMetadata,
      exercises,
      exerciseTimers,
      mainTimer,
      breaks
    }
  }, [workoutMetadata, splitMetadata, exercises, exerciseTimers, mainTimer, breaks]);

  useEffect(() => {
    // Runs only when the component mounts
    changeNavigationBarColor(theme.BACKGROUND_COLOR, true);
    StatusBar.setBackgroundColor(theme.BACKGROUND_COLOR);
    initializeActiveWorkout();
    const mainInterval = setInterval(() => {
      setMainTimer(mainTimer => mainTimer + 1000);
    }, 1000);
    const syncInterval = setInterval(() => {
      replaceUserWorkout(generateWorkoutObject(stateRef.current.workoutMetadata,
        stateRef.current.splitMetadata,
        stateRef.current.exercises,
        stateRef.current.exerciseTimers,
        stateRef.current.mainTimer,
        stateRef.current.breaks));
    }, 1000*10);
    return () => {
      clearInterval(mainInterval);
      clearInterval(syncInterval);
      exerciseIntervals.forEach(interval => clearInterval(interval));
    }
  }, []);

  const generateWorkoutObject = (wMetadata, sMetadata, ex, exTimers, mTimer, br) => {
    return {
      ...wMetadata,
      split: {
        ...sMetadata,
        exercises: ex.map((ex, ind) => {
          return {
            ...ex,
            elapsed_time: exTimers[ind]
          }
        })
      },
      elapsed_time: mTimer,
      breaks: br,
    }
  }

  const initializeActiveWorkout = async() => {
    try {
      if (activeWorkoutID) {
        const activeWorkout = userWorkouts[activeWorkoutID];
        const timeDifference = differenceInMilliseconds(new Date(), parseISO(activeWorkout.start_time));
        // There is an active workout currently
        setWorkoutMetadata({
          id: activeWorkout.id,
          start_time: activeWorkout.start_time != null ? activeWorkout.start_time : new Date().toISOString(),
          scheduled: activeWorkout.scheduled,
          completed: activeWorkout.completed
        });
        setSplitMetadata({
          creator: activeWorkout.split.creator,
          name: activeWorkout.split.name,
          description: activeWorkout.split.description,
          estimated_time: activeWorkout.split.estimated_time,
        });
        setExercises(activeWorkout.split.exercises);
        setExerciseTimers(activeWorkout.split.exercises.map((ex) => ex.elapsed_time != null ? ex.elapsed_time : 0));
        activeWorkout.split.exercises.forEach((ex, ind) => {
          if (ex.active) {
            activateExercise(ind);
          }
        })
        setMainTimer(timeDifference ? timeDifference : 0);
      } else {
        const newWorkoutMetadata = {
          id: route.params && route.params.data && route.params.data.id != null ? route.params.data.id : generateUniqueId(),
          start_time: route.params && route.params.data && route.params.data.start_time != null ? route.params.data.start_time : new Date().toISOString(),
          scheduled: route.params && route.params.data && route.params.data.scheduled ? route.params.data.scheduled : null,
          completed: route.params && route.params.data && route.params.data.completed != null ? route.params.data.completed : false,
        };
        setWorkoutMetadata(newWorkoutMetadata);
        let newSplitMetadata;
        if (route.params && route.params.data && route.params.data.split) {
          newSplitMetadata = {
            creator: route.params.data.split.creator,
            name: route.params.data.split.name,
            description: route.params.data.split.description,
            estimated_time: route.params.data.split.estimated_time,
          };
        } else {
          newSplitMetadata = {
            creator: {
              // [INCOMPLETE] FILL IN USER DATA HERE
              name: "",
              id: "",
              profile_photo: "",
            },
            name: "New Workout",
            description: "This is a new workout.",
            estimated_time: 0,
          };
        }
        setSplitMetadata(newSplitMetadata)
        let newExercises = exercises;
        let newExerciseTimers = exerciseTimers;
        if (route.params && route.params.data && route.params.data.split) {
          newExercises = route.params.data.split.exercises.map((ex, ind) => {
            return {
              ...ex,
              weights: ex.weights != null ? ex.weights : new Array(ex.repetitions.length),
              previous_weights: ex.previous_weights != null ? ex.previous_weights : new Array(ex.repetitions.length) /* [INCOMPLETE] Need to set prev weights*/,
              previous_repetitions: ex.previous_repetitions != null ? ex.previous_repetitions : new Array(ex.repetitions.length) /* [INCOMPLETE] Need to set prev reps*/,
              completion_times: ex.completion_times != null ? ex.completion_times : new Array(ex.repetitions.length),
              completed: ex.completed != null ? ex.completed : false,
            }
          });
          newExerciseTimers = route.params.data.split.exercises.map((ex) => ex.elapsed_time ? ex.elapsed_time : 0);
          setExercises(newExercises);
          setExerciseTimers(newExerciseTimers);
          route.params.data.split.exercises.forEach((ex, ind) => {
            if (ex.active) {
              activateExercise(ind);
            }
          });
        }

        await activateWorkout(newWorkoutMetadata.id);
        if (!userWorkouts[newWorkoutMetadata.id]) {
          addUserWorkout(generateWorkoutObject(newWorkoutMetadata, newSplitMetadata, newExercises, newExerciseTimers, mainTimer, breaks));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

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
    clearInterval(exerciseIntervals[ind]);
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

  const handleAddExercise = () => {
    openModal("AddExercise", (ex) => {
      setExercises(prevExercises => {
        const newExercises = JSON.parse(JSON.stringify(prevExercises));
        newExercises.push({
          ...ex,
          weights: ex.weights != null ? ex.weights : new Array(ex.repetitions.length),
          previous_weights: ex.previous_weights != null ? ex.previous_weights : new Array(ex.repetitions.length) /* [INCOMPLETE] Need to set prev weights*/,
          previous_repetitions: ex.previous_repetitions != null ? ex.previous_repetitions : new Array(ex.repetitions.length) /* [INCOMPLETE] Need to set prev reps*/,
          completion_times: ex.completion_times != null ? ex.completion_times : new Array(ex.repetitions.length),
          completed: ex.completed != null ? ex.completed : false,
        });
        return newExercises;
      });
      setExerciseTimers(prevExerciseTimers => {
        prevExerciseTimers.push(0);
        return prevExerciseTimers;
      });
    });
  }

  const toggleExerciseTimers = (timersOn) => {
    if (!timersOn) {
      exerciseIntervals.forEach(int => clearInterval(int));
      setExerciseIntervals(exerciseIntervals => new Array(exerciseIntervals.length));
      setExercises(exercises => {
        return exercises.map(ex => ({
          ...JSON.parse(JSON.stringify(ex)),
          timed: false,
          active: false,
        }));
      });
    }
  }

  const handleOpenMenu = () => {
    openModal("ActiveWorkoutMenu", (res) => {
      // Callback
      switch(res.action) {
        case "cancel":
          handleFinish(true);
        case "toggleExerciseTimers":
          toggleExerciseTimers(res.data);
      }
    });
  }

  const handleFinish = (cancelled = false) => {
    replaceUserWorkout({
      ...generateWorkoutObject(workoutMetadata,splitMetadata,exercises,exerciseTimers,mainTimer,breaks),
      completed: true,
      cancelled,
    }), true;
    deactivateWorkout();
    navigation.reset({
      index: 0,
      routes: [{name: "Main"}]
    });
    return null;
  }

  const exerciseTiles = exercises.map((ex, ind) => {
    if (ex.open) {
      return (
        <View key={ind} style={styles.inputWrapperWrapper}>
          <InputWrapper style={styles.inputWrapper} label={ex.movement} secondaryLabel={msToDigital(exerciseTimers[ind])} onPress={ex.active ? null : () => toggleExercise(ind)}>
            <View style={styles.exRow}>
              <Text style={[styles.exSetColumn, styles.exTableHeading]}>Set</Text>
              <Text style={[styles.exPrevColumn, styles.exTableHeading]}>Previous</Text>
              <Text style={[styles.exLbsColumn, styles.exTableHeading]}>lbs</Text>
              <Text style={[styles.exRepsColumn, styles.exTableHeading]}>Reps</Text>
              <View style={styles.exProgressColumn}></View>
            </View>
            <SwipeListView 
              nestedScrollEnabled={true}
              useFlatList={true}
              data={ex.repetitions.map((_, i) => ({key: i}))}
              renderItem={(data, rowMap) => (
                <View key={data.index} style={[
                  styles.setContainer, styles.exRow,
                  ex.completion_times[data.index] != null ? styles.setContainerDone : null,
                ]}>
                  <Text style={[styles.exSetColumn, styles.exTableValue]}>{data.index + 1}</Text>
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
                  <TouchableOpacity activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY} disabled={!ex.active} style={styles.exProgressColumn} onPress={() => handleToggleSplit(ind, data.index)}>
                    <Checkbox checked={ex.completion_times[data.index] != null}/>
                  </TouchableOpacity>
                </View>
              )}
              renderHiddenItem={ (data, rowMap) => ex.completion_times[data.index] != null ? null : (
                <View style={swipeListStyles.rowBack}>
                  <View style={swipeListStyles.delete}>
                    <Text style={swipeListStyles.delText}>Delete</Text>
                  </View>
                </View>
              )}
              useAnimatedList
              disableRightSwipe
              tension = {0}
              rightActivationValue = {-75}
              stopRightSwipe = {-80}
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
        </View>
      )
    } else {
      const completedSets = ex.weights != null ? ex.completion_times.filter(w => w != null).length : 0;
      return (
        <TouchableHighlight activeOpacity={0} underlayColor={ex.completed ? theme.SECONDARY_COLOR_FADED_SELECTED : theme.CALENDAR_HIGHLIGHT_COLOR}  key={ind} onPress={() => toggleExercise(ind)} style={[styles.exerciseClosedContainer, ex.completed ? styles.exerciseFinished : styles.exerciseUnfinished]}>
          <>
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
                <TouchableOpacity activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY} style={styles.exercisePlayBtn} onPress={() => activateExercise(ind)}>
                  <IonIcon name={'md-play'} size={23} color={theme.SECONDARY_COLOR}/>
                </TouchableOpacity>
              }
            </View>
          </>
        </TouchableHighlight>
      )
    }
  });

  return (
    <View style={systemStyles.pageMarginlessContainer}>
      <View style={systemStyles.pageContainer}>
        <Header title={splitMetadata.name}
          subtitle = {msToDigital(mainTimer)}
          maxTitleLength= {15}
          leftButtonName={"dots-horizontal"} leftButtonOnPress={handleOpenMenu} leftButtonColor={theme.SUBTITLE_COLOR}
          rightButtonText={"Done"} rightButtonOnPress={handleFinish} rightButtonColor={theme.SECONDARY_COLOR}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={systemStyles.formSpacer} />
          <View style={systemStyles.formSpacer} />
            { exerciseTiles }
            <ActionButton text={"Add Exercise"} onPress={handleAddExercise} />
          <View style={systemStyles.bottomSpacer}/>
        </ScrollView>
      </View>
    </View>
  );
};

export const ActiveWorkout = (props) => {
  const { userDataLoading } = useAppContext();
  if (userDataLoading) {
    return <Loading />
  } else {
    return <ActiveWorkoutPage {...props} />
  }
}
