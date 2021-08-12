"use strict";
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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

  const activateWorkout = async(id) => {
    try {
      setActiveWorkoutID(id);
      await AsyncStorage.setItem(
        '@LyftableActiveWorkout',
        JSON.stringify(id)
      );
    } catch (e) {
      console.log("[Error activating workout]", e);
    }
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