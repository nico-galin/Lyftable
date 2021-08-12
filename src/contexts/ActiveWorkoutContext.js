"use strict";
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useAppContext } from './AppContext';

const ActiveWorkoutContext = React.createContext({});

const ActiveWorkoutProvider = ({children}) => {
  const [activeWorkoutID, setActiveWorkoutID] = useState(null);
  const [activeWorkoutLoading, setActiveWorkoutLoading] = useState(true);

  useEffect(() => {
    initializeActiveWorkout();
  }, []);

  const initializeActiveWorkout = async() => {
    try {
      const awID = JSON.parse(await AsyncStorage.getItem("@LyftableActiveWorkout"));
      setActiveWorkoutID(awID);
    } catch (e) {
    } finally {
      setActiveWorkoutLoading(false);
    }
  }

  const saveActiveWorkoutLocally = async(overrideData = null) => {
    try {
      if (activeWorkoutID || overrideData) {
        await AsyncStorage.setItem(
          '@LyftableActiveWorkout',
          JSON.stringify(overrideData != null ? overrideData : activeWorkoutID)
        );
      } else {
        await AsyncStorage.removeItem('@LyftableActiveWorkout');
      }
    } catch (e) {
      console.log("[Error saving active workout locally]", e);
    }
  }

  const activateWorkout = async(id) => {
    setActiveWorkoutID(id);
    await saveActiveWorkoutLocally(id);
    return null;
  }

  const deactivateWorkout = async() => {
    setActiveWorkoutID(null);
    await AsyncStorage.removeItem('@LyftableActiveWorkout');
    return null;
  }

  return (
    <ActiveWorkoutContext.Provider value={{activeWorkoutID, activeWorkoutLoading, activateWorkout, deactivateWorkout }}>
      {children}
    </ActiveWorkoutContext.Provider>
  )
}

const useActiveWorkoutContext = () => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error('useActiveWorkoutContext must be used within an AppProvider');
  }
  return context;
}

export { ActiveWorkoutContext, ActiveWorkoutProvider, useActiveWorkoutContext };