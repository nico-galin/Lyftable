'use strict';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO, startOfWeek, addWeeks, addDays, isAfter } from 'date-fns';
import { firebase as firebaseFunc } from '@react-native-firebase/functions';
import { firebase as firebaseAuth } from '@react-native-firebase/auth';
import {
  getTimeStamp,
  generateUniqueId,
  getVerifiedSplits,
  getVerifiedMovements,
  clearLocalUserData,
} from '../services/utilities';

const AppContext = React.createContext({});

const loadUserDataFromLocal = async () => {
  try {
    const userObject = await AsyncStorage.getItem('@LyftableUserData');
    return JSON.parse(userObject);
  } catch (e) {
    console.log('[Error retrieving user data]', e);
  }
};

const getUserFromServer = id => {
  return new Promise((resolve, reject) => {
    firebaseFunc
      .functions()
      .httpsCallable('getUser')({ id: id })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        console.log('[Error fetching user from server]', e);
        resolve(null);
      });
  });
};

const AppProvider = ({ children }) => {
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userSplits, setUserSplits] = useState({});
  const [userWorkouts, setUserWorkouts] = useState({});
  const [userFriends, setUserFriends] = useState({});
  const [userMetadata, setUserMetadata] = useState({});
  const [modalCallback, setModalCallback] = useState(() => {});
  const [openModal, setOpenModal] = useState(() => {});
  const [resetModal, setResetModal] = useState(() => {});
  const [verifiedSplits, setVerifiedSplits] = useState({});
  const [verifiedMovements, setVerifiedMovements] = useState({});

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    firebaseFunc.functions().useFunctionsEmulator('http://localhost:5001');
    //clearLocalUserData();
    initializeUserData();
    initializeVerifiedSplits();
    initializeVerifiedMovements();
  }, []);

  const initializeVerifiedSplits = async () => {
    try {
      let vSplits = await getVerifiedSplits();
      if (vSplits) {
        // Cloud data accessible
        await AsyncStorage.setItem(
          '@LyftableVerifiedSplits',
          JSON.stringify(vSplits),
        );
      } else {
        // Cloud data inaccessible
        vSplits = await AsyncStorage.getItem('@LyftableVerifiedSplits');
        if (!vSplits) {
          vSplits = [];
        }
      }
      setVerifiedSplits(vSplits);
    } catch (e) {
      console.log('[Error initializing Verified Splits]', e);
    }
  };

  const initializeVerifiedMovements = async () => {
    try {
      let vMovements = await getVerifiedMovements();
      if (vMovements) {
        // Cloud data accessible
        await AsyncStorage.setItem(
          '@LyftableVerifiedMovements',
          JSON.stringify(vMovements),
        );
      } else {
        // Cloud data inaccessible
        vMovements = await AsyncStorage.getItem('@LyftableVerifiedMovements');
        if (!vMovements) {
          vMovements = [];
        }
      }
      setVerifiedMovements(vMovements);
    } catch (e) {
      console.log('[Error initializing Verified Movments]', e);
    }
  };

  const initializeUserData = async () => {
    try {
      let userObject = await loadUserDataFromLocal();
      if (userObject) {
        // Local data exists
        userObject = userObject;
        console.log('[Init] Found Local Data');
        syncUserDataToCloud(userObject);
      } else {
        // No local data exists
        userObject = await getUserFromServer(
          firebaseAuth.auth().currentUser.uid,
        );
        if (userObject) {
          // No local data exists, but cloud data exists
          console.log('[Init] Grabbing Data From Cloud');
          saveUserDataLocally(userObject);
        } else {
          // Neither local nor cloud data exist
          console.log('[Init] Generating New Local Data');
          const authObject = firebaseAuth.auth().currentUser;
          userObject = {
            id: authObject.uid,
            anonymous: false,
            name: authObject.displayName,
            email: authObject.email,
            profile_photo: authObject.photoURL ? authObject.photoURL : null,
            friends: {},
            splits: {},
            workouts: {},
          };
          saveUserDataLocally(userObject);
          syncUserDataToCloud(userObject);
        }
      }
      setUserSplits(userObject.splits);
      setUserWorkouts(userObject.workouts);
      setUserFriends(userObject.friends);
      setUserMetadata({
        id: userObject.id,
        anonymous: userObject.anonymous,
        name: userObject.name,
        email: userObject.email,
        profile_photo: userObject.profile_photo,
        lastCloudSync: userObject.lastCloudSync,
        lastLocalSync: userObject.lastLocalSync,
      });
      setUserDataLoading(false);
    } catch (e) {
      console.log('[Error initializing user data]', e);
    }
  };

  const saveUserDataLocally = async overrideData => {
    try {
      const userData = Object.assign(
        {
          ...userMetadata,
          splits: userSplits,
          workouts: userWorkouts,
          friends: userFriends,
        },
        overrideData,
      );
      const timestamp = getTimeStamp();
      userData.lastLocalSync = timestamp;
      setUserMetadata(oldUserMetadata => ({
        ...oldUserMetadata,
        lastLocalSync: timestamp,
      }));
      await AsyncStorage.setItem('@LyftableUserData', JSON.stringify(userData));
    } catch (e) {
      console.log('[Error saving user data locally]', e);
    }
  };

  const syncUserDataToCloud = async overrideData => {
    try {
      const userData = Object.assign(
        {
          ...userMetadata,
          splits: userSplits,
          workouts: userWorkouts,
          friends: userFriends,
        },
        overrideData,
      );
      const timestamp = getTimeStamp();
      userData.lastCloudSync = timestamp;
      await firebaseFunc.functions().httpsCallable('syncUserToCloud')({
        user: userData,
      });
      saveUserDataLocally(userData);
      setUserMetadata(oldUserMetadata => ({
        ...oldUserMetadata,
        lastLocalSync: timestamp,
      }));
    } catch (e) {
      console.log('[Error saving user data to cloud]', e);
    }
  };

  const addUserSplit = split => {
    let newUserSplits = JSON.parse(JSON.stringify(userSplits));
    if (!newUserSplits) {
      newUserSplits = {};
    }
    if (!split.id) {
      split.id = generateUniqueId();
    }
    newUserSplits[split.id] = split;
    setUserSplits(newUserSplits);
    saveUserDataLocally({ splits: newUserSplits });
    syncUserDataToCloud({ splits: newUserSplits });
  };

  const replaceUserSplit = newSplit => {
    let newUserSplits = JSON.parse(JSON.stringify(userSplits));
    if (!newUserSplits) {
      newUserSplits = {};
    }
    if (!newSplit.id) {
      console.log('Trying to replace a split with no id');
      return;
    }
    newUserSplits[newSplit.id] = newSplit;
    setUserSplits(newUserSplits);
    saveUserDataLocally({ splits: newUserSplits });
    syncUserDataToCloud({ splits: newUserSplits });
  };

  const removeUserSplit = id => {
    const newUserSplits = JSON.parse(JSON.stringify(userSplits));
    delete newUserSplits[id];
    setUserSplits(newUserSplits);
    saveUserDataLocally({ splits: newUserSplits });
    syncUserDataToCloud({ splits: newUserSplits });
  };

  const addUserWorkout = workout => {
    let newUserWorkouts = JSON.parse(JSON.stringify(userWorkouts));
    if (!workout.id) {
      workout.id = generateUniqueId();
    }
    workout.completed = false;
    workout.elapsed_time = 0;
    workout.breaks = 0;
    workout.start_time = null;
    workout.end_time = null;
    if (!newUserWorkouts) {
      newUserWorkouts = {};
    }
    newUserWorkouts[workout.id] = workout;
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally({ workouts: newUserWorkouts });
    syncUserDataToCloud({ workouts: newUserWorkouts });
  };
  /**
   *
   * @param {Object} templateWorkout
   * @param {Number} repetitions
   * @param {Array} selectedDays [0, 0, 0, 0, 0, 0, 0] Array of length 7 with 1 for selected or 0 for unselected
   */
  const addUserWorkoutsBATCH = (templateWorkout, repetitions, selectedDays) => {
    const newUserWorkouts = JSON.parse(JSON.stringify(userWorkouts));
    for (let i = 0; i < repetitions; i++) {
      let templateDay = parseISO(templateWorkout.scheduled);
      const currentSunday = startOfWeek(addWeeks(templateDay, i));
      const thisWeek = selectedDays.map((el, ind) => {
        const curDay = addDays(currentSunday, ind);
        if (el === 1 && isAfter(curDay, addDays(templateDay, -1))) {
          return curDay;
        }
        return 0;
      });
      thisWeek
        .filter(date => date !== 0)
        .forEach(date => {
          let newWorkout = Object.assign({}, templateWorkout);
          newWorkout.id = generateUniqueId();
          newWorkout.scheduled = date.toISOString();
          newWorkout.completed = false;
          newWorkout.elapsed_time = 0;
          newWorkout.breaks = 0;
          newWorkout.start_time = null;
          newWorkout.end_time = null;
          newUserWorkouts[newWorkout.id] = newWorkout;
        });
    }
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally({ workouts: newUserWorkouts });
    syncUserDataToCloud({ workouts: newUserWorkouts });
  };

  const replaceUserWorkout = (workout, syncToCloud = false) => {
    let newUserWorkouts = JSON.parse(JSON.stringify(userWorkouts));
    if (!newUserWorkouts) {
      newUserWorkouts = {};
    }
    if (!workout.id) {
      console.log('Trying to replace a split with no id');
      return;
    }
    newUserWorkouts[workout.id] = workout;
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally({ workouts: newUserWorkouts });
    if (syncToCloud) {
      syncUserDataToCloud({ workouts: newUserWorkouts });
    }
  };

  const removeUserWorkout = id => {
    const newUserWorkouts = JSON.parse(JSON.stringify(userWorkouts));
    delete newUserWorkouts[id];
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally({ workouts: newUserWorkouts });
    syncUserDataToCloud({ workouts: newUserWorkouts });
  };

  const splitInCollection = id => {
    if (!userSplits) {
      return false;
    }
    return userSplits[id] != null;
  };

  return (
    <AppContext.Provider
      value={{
        userSplits,
        userWorkouts,
        userFriends,
        userMetadata,
        verifiedSplits,
        verifiedMovements,
        openModal,
        setOpenModal,
        modalCallback,
        setModalCallback,
        resetModal,
        setResetModal,
        addUserSplit,
        replaceUserSplit,
        removeUserSplit,
        addUserWorkout,
        addUserWorkoutsBATCH,
        replaceUserWorkout,
        removeUserWorkout,
        splitInCollection,
        userDataLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider, useAppContext };
