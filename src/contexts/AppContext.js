import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO, addMinutes, startOfWeek, addWeeks, addDays, isAfter } from 'date-fns';
import { firebase as firebaseFunc } from '@react-native-firebase/functions';
import { firebase as firebaseAuth } from '@react-native-firebase/auth';
import { getTimeStamp, generateUniqueId, mToMS } from '../services/utilities';
import { isWithinInterval } from 'date-fns/esm';
import { Buffer } from "buffer";

const AppContext = React.createContext({});

const clearLocalUserData = async() => {
  await AsyncStorage.removeItem('@LyftableUserData');
}

const AppProvider = ({children}) => {
  const [userSplits, setUserSplits] = useState({});
  const [userWorkouts, setUserWorkouts] = useState({});
  const [userFriends, setUserFriends] = useState({});
  const [userMetadata, setUserMetadata] = useState({});
  const [modalCallback, setModalCallback] = useState(() => {});
  const [openModal, setOpenModal] = useState(() => {});
  const [resetModal, setResetModal] = useState(() => {});
  const [verifiedSplits, setVerifiedSplits] = useState({});
  const [verifiedExercises, setVerifiedExercises] = useState({});
  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    firebaseFunc.functions().useFunctionsEmulator('http://localhost:5001');
    initializeUserData();
    setVerifiedSplits([
      {
        public: false,
        id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
        creator: {
          name: "Lyftable",
          id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
          profile_photo: "https://picsum.photos/200/200"
        },
        uses: 0,
        name: "Push Day",
        description: "Gnarly workout for those days you really just want to feel the pain.",
        exercises: [
          {
            movement: "Chest Press",
            time_limit: 12312312,
            set_count: 4,
            repetitions: [10, 10, 10, 10],
            rest_time: 60000
          },
          {
            movement: "Pectoral Flye",
            time_limit: 12312312,
            set_count: 4,
            repetitions: [10, 10, 10, 10],
            rest_time: 60000
          },
        ],
        estimated_time: 100000200,
        subscribers: [
          {
            id: "12131231231232131231",
            name: "John Doe",
            profile_photo: "https://picsum.photos/200/200"
          },
          {
            name: "Jane Doe",
            id: "12131231231232131231",
            profile_photo: "https://picsum.photos/200/200"
          },
          {
          },
          {
          },
          {
            name: "Don Moyington",
            id: "12131231231232131231",
            profile_photo: "https://picsum.photos/200/200"
          },
          {
            name: "Graham Moyington",
            id: "12131231231232131231",
            profile_photo: "https://picsum.photos/200/200"
          }
        ]
      }
    ])
  }, []);

  async function loadUserDataFromLocal() {
    try {
      const userObject = await AsyncStorage.getItem("@LyftableUserData");
      return JSON.parse(userObject);
    } catch (e) {
      console.log("[Error retrieving user data]", e);
    }
  }

  const getUserFromServer = (id) => {
    return new Promise((resolve, reject) => {
      firebaseFunc.functions().httpsCallable('getUser')({id: id})
        .then((res) => {
          resolve(res.data);
        }).catch(e => {
          console.log("[Error fetching user from server]", e);
          resolve(null);
        });
    });
  }

  const initializeUserData = async() => { 
    try {
      let userObject = await loadUserDataFromLocal();
      if (userObject) {
        // Local data exists
        console.log("[Init] Found Local Data");
        syncUserDataToCloud(userObject);
      } else {
        // No local data exists
        userObject = await getUserFromServer(firebaseAuth.auth().currentUser.uid);
        if (userObject) {
          // No local data exists, but cloud data exists
          console.log("[Init] Grabbing Data From Cloud");
          saveUserDataLocally(userObject);
        } else {
          // Neither local nor cloud data exist
          console.log("[Init] Generating New Local Data");
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
          }
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
      })
    } catch (e) {
      console.log("[Error initializing user data]", e);
    }
  }
  
  const saveUserDataLocally = async (overrideData) => {
    try {
      const userData = Object.assign({
        ...userMetadata,
        splits: userSplits,
        workouts: userWorkouts,
        friends: userFriends,
      }, overrideData)
      const timestamp = getTimeStamp();
      userData.lastLocalSync = timestamp;
      setUserMetadata((userMetadata) => ({...userMetadata, lastLocalSync: timestamp}));
      await AsyncStorage.setItem(
        '@LyftableUserData',
        JSON.stringify(userData)
      );
    } catch (e) {
      console.log("[Error saving user data locally]", e);
    }
  }


  const syncUserDataToCloud = async (overrideData) => {
    try {
      const userData = Object.assign({
        ...userMetadata,
        splits: userSplits,
        workouts: userWorkouts,
        friends: userFriends,
      }, overrideData)
      const timestamp = getTimeStamp();
      userData.lastCloudSync = timestamp;
      const res = await firebaseFunc.functions().httpsCallable('syncUserToCloud')({user: userData})
        saveUserDataLocally(userData);
        setUserMetadata((userMetadata) => ({...userMetadata, lastLocalSync: timestamp}));
      } catch (e) {
        console.log("[Error saving user data to cloud]", e);
      }
  }

  const addUserSplit = (split) => {
    const newUserSplits = JSON.parse(JSON.stringify(userSplits));
    if (!newUserSplits) newUserSplits = {};
    if (!split.id) {
      split.id = generateUniqueId();
    }
    newUserSplits[split.id] = split;
    setUserSplits(newUserSplits);
    saveUserDataLocally({ splits: newUserSplits});
    syncUserDataToCloud({ splits: newUserSplits});
  }

  const replaceUserSplit = (newSplit) => {
    const newUserSplits = JSON.parse(JSON.stringify(userSplits));
    if (!newUserSplits) newUserSplits = {};
    if (!newSplit.id) {
      console.log("Trying to replace a split with no id");
      return;
    }
    newUserSplits[newSplit.id] = newSplit;
    setUserSplits(newUserSplits);
    saveUserDataLocally({ splits: newUserSplits});
    syncUserDataToCloud({ splits: newUserSplits});
  }

  const removeUserSplit = (id) => {
    const newUserSplits = JSON.parse(JSON.stringify(userSplits));
    delete newUserSplits[id];
    setUserSplits(newUserSplits);
    saveUserDataLocally({ splits: newUserSplits});
    syncUserDataToCloud({ splits: newUserSplits});
  }

  const addUserWorkout = (workout) => {
    const newUserWorkouts = JSON.parse(JSON.stringify(userWorkouts));
    workout.id = generateUniqueId();
    workout.completed = false;
    workout.elapsed_time = 0;
    workout.pauses = 0;
    workout.start_time = null;
    workout.end_time = null;
    if (!newUserWorkouts) newUserWorkouts = {};
    newUserWorkouts[workout.id] = workout;
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally(newUserData);
    syncUserDataToCloud({ splits: newUserSplits});
  }
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
      thisWeek.filter(date => date != 0).forEach(date => {
        let newWorkout = Object.assign({}, templateWorkout);
        newWorkout.id = generateUniqueId();
        newWorkout.scheduled = date.toISOString();
        newWorkout.completed = false;
        newWorkout.elapsed_time = 0;
        newWorkout.pauses = 0;
        newWorkout.start_time = null;
        newWorkout.end_time = null;
        newUserWorkouts[newWorkout.id] = workout;
      });
    }
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally(newUserData);
    syncUserDataToCloud({ splits: newUserSplits});
  }

  const replaceUserWorkout = (workout) => {
    const newUserWorkouts = JSON.parse(JSON.stringify(userWorkouts));
    if (!newUserWorkouts) newUserSplits = {};
    if (!workout.id) {
      console.log("Trying to replace a split with no id");
      return;
    }
    newUserWorkouts[workout.id] = workout;
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally({ splits: newUserSplits});
    syncUserDataToCloud({ splits: newUserSplits});
  }

  const removeUserWorkout = (id) => {
    const newUserWorkouts = JSON.parse(JSON.stringify(userWorkouts));
    delete newUserWorkouts[id];
    setUserWorkouts(newUserWorkouts);
    saveUserDataLocally({ splits: newUserSplits});
    syncUserDataToCloud({ splits: newUserSplits});
  }

  const splitInCollection = (id) => {
    if (!userSplits) return false;
    return userSplits[id] != null;
  }

  const generateSplitShareCode = (id, userId) => {
    return Buffer.from(JSON.stringify({ id: id, userId: userId }), "utf-8").toString("base64");
  }

  const getSplitFromShareCode = async (shareCode) => {
    const res = await firebaseFunc.functions().httpsCallable("getVerifiedSplits")();
    console.log(res);

   /* return new Promise((resolve, reject) => {
      const decoded = JSON.parse(Buffer.from(shareCode, 'base64').toString('utf-8'));
      firebaseFunc.functions().httpsCallable("getSplitFromUser")(decoded)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          console.log("[Error getting split from sharecode]", e);
        })
    });
*/
  }

  return (
    <AppContext.Provider value={{
      userSplits,
      userWorkouts,
      userFriends,
      userMetadata,
      verifiedSplits,
      verifiedExercises,
      openModal, setOpenModal,
      modalCallback, setModalCallback,
      resetModal, setResetModal,
      saveUserDataLocally,
      syncUserDataToCloud,
      initializeUserData,
      addUserSplit,
      replaceUserSplit,
      removeUserSplit,
      addUserWorkout,
      addUserWorkoutsBATCH,
      replaceUserWorkout,
      removeUserWorkout,
      splitInCollection,
      generateSplitShareCode,
      getSplitFromShareCode
    }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export { AppContext, AppProvider, useAppContext };