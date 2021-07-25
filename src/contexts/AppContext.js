import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO, addMinutes } from 'date-fns';
import { firebase as firebaseFunc } from '@react-native-firebase/functions';
import { firebase as firebaseAuth } from '@react-native-firebase/auth';
import { useContext } from 'react';
import { getTimeStamp, generateUniqueId } from '../services/utilities';
import { isWithinInterval } from 'date-fns/esm';

const AppContext = React.createContext({});

const AppProvider = ({children}) => {
  const [userData, setUserData] = useState({});
  const [modalCallback, setModalCallback] = useState(() => {});
  const [openModal, setOpenModal] = useState(() => {});
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
          name: "Nico Galin",
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
      const userObj = firebaseFunc.functions().httpsCallable('getUser')({id: firebaseAuth.auth().currentUser.uid})
        .then((res) => {
          resolve(userObj);
        }).catch(e => {
          console.log("[Error fetching user from server]", e);
          resolve(null);
        });
    });
  }

  const initializeUserData = async() => { 
    try {
      const localObject = await loadUserDataFromLocal();
      if (localObject) {
        // Local object exists
        setUserData(localObject);
        syncUserDataToCloud(localObject);
      } else {
        // No local object exists
        const cloudObject = await getUserFromServer(firebaseAuth.auth().currentUser.uid);
        if (cloudObject) {
          // No local object exists, but a cloud object exists
          setUserData(cloudObject);
        } else {
          // Neither a local or cloud object exist
          const authObject = firebaseAuth.auth().currentUser;
          const newUser = {
            id: authObject.uid,
            anonymous: false,
            name: authObject.displayName,
            email: authObject.email,
            profile_photo: authObject.photoURL ? authObject.photoURL : null,
            friends: {},
            splits: {},
            workouts: {},
          }
          setUserData(newUser);
          saveUserDataLocally(newUser);
          syncUserDataToCloud(newUser);
        }
      }
    } catch (e) {
      console.log("[Error initializing user data]", e);
    }
  }
  
  const saveUserDataLocally = async(manualUserObjectOverride) => {
    try {
      const timestamp = getTimeStamp();
      let userDataObject;
      if (manualUserObjectOverride) {
        userDataObject = manualUserObjectOverride;
      } else {
        userDataObject = userData;
      }
      await AsyncStorage.setItem(
        '@LyftableUserData',
        JSON.stringify(userDataObject)
      );
      setLastLocalSync(timestamp);
    } catch (e) {
      console.log("[Error saving user data locally]", e);
    }
  }

  const syncUserDataToCloud = (manualUserObjectOverride, force = false) => {
    return new Promise((resolve, reject) => {
      const timestamp = getTimeStamp();
      let userDataObject;
      if (manualUserObjectOverride) {
        userDataObject = manualUserObjectOverride;
      } else {
        userDataObject = Object.assign({}, userData);
      }
      const lastSync = parseISO(userDataObject.lastCloudSync);
      if (!force && userDataObject.lastCloudSync && isWithinInterval(new Date(), {start: lastSync, end: addMinutes(lastSync, 60)})) {
        resolve(userDataObject);
        return;
      }
      userDataObject.lastCloudSync = timestamp;
      firebaseFunc.functions().httpsCallable('syncUserToCloud')({user: userDataObject})
        .then(res => {
          setLastCloudSync(timestamp);
          saveUserDataLocally(userDataObject);
          resolve(res);
        })
        .catch(e => {
          console.log("[Error saving user data to cloud]", e);
        }) 
    });
  }
  
  const setLastCloudSync = (ISOString) => {
    const newUserData = Object.assign({}, userData);
    newUserData.lastCloudSync = ISOString;
    setUserData(newUserData);
  }

  const setLastLocalSync = (ISOString) => {
    const newUserData = Object.assign({}, userData);
    newUserData.lastLocalSync = ISOString;
    setUserData(newUserData);
  }

  const clearUserData = async() => {
    await AsyncStorage.removeItem('@LyftableUserData');
  }

  const addUserSplit = (split) => {
    const newUserData = Object.assign({}, userData);
    const newId = generateUniqueId();
    if (!newUserData.splits) newUserData.splits = {};
    newUserData.splits[newId] = Object.assign(split, { id: newId});
    setUserData(newUserData);
    saveUserDataLocally(newUserData);
  }

  const replaceUserSplit = (id, newSplit) => {
    const newUserData = Object.assign({}, userData);
    console.log("newUserData: ", newUserData);
    newUserData.splits[id] = newSplit;
    setUserData(newUserData);
    saveUserDataLocally(newUserData);
  }

  const removeUserSplit = (id) => {
    const newUserData = Object.assign({}, userData);
    delete newUserData.splits[id];
    setUserData(newUserData);
    saveUserDataLocally(newUserData);
  }

  const addUserWorkout = (workout) => {
    const newUserData = Object.assign({}, userData);
    const newId = generateUniqueId();
    workout.id = newId;
    if (!newUserData.workouts) newUserData.workouts = {};
    newUserData.workouts[newId] = workout;
    setUserData(newUserData);
    saveUserDataLocally(newUserData);
  }

  const replaceUserWorkout = (id, newWorkout) => {
    const newUserData = Object.assign({}, userData);
    newUserData.workouts[id] = newWorkout;
    setUserData(newUserData);
    saveUserDataLocally(newUserData);
  }

  const removeUserWorkout = (id) => {
    const newUserData = Object.assign({}, userData);
    delete newUserData.workouts[id];
    setUserData(newUserData);
    saveUserDataLocally(newUserData);
  }

  const getUserId = () => {
    return userData.id;
  }

  const getUserName = () => {
    return userData.name;
  }

  const getUserProfilePhoto = () => {
    return userData.profile_photo;
  }

  const getSplit = (id, creatorId) => {
    const personal = userData.splits[id];
    if (personal != null) {
      return personal;
    } else {
      return null;
    }
  }

  return (
    <AppContext.Provider value={{
      userData,
      verifiedSplits,
      verifiedExercises,
      openModal, setOpenModal,
      modalCallback, setModalCallback,
      saveUserDataLocally,
      clearUserData,
      syncUserDataToCloud,
      initializeUserData,
      addUserSplit,
      replaceUserSplit,
      removeUserSplit,
      addUserWorkout,
      replaceUserWorkout,
      removeUserWorkout,
      getUserId,
      getUserName,
      getUserProfilePhoto,
      getSplit,
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

export { AppContext, AppProvider, useAppContext};