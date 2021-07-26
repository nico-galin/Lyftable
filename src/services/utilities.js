import 'react-native-get-random-values';
import { firebase as firebaseFunc } from '@react-native-firebase/functions';
import { Buffer } from "buffer";
import { v4 as uuid } from 'uuid';

const msToDigital = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms  / 1000 / 3600 ) % 24);
  const digital = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');
  return digital;
}

const msToHMS = (ms) => {
  const hours = Math.floor((ms  / 1000 / 3600 ) % 24);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const seconds = Math.floor((ms  / 1000) % 60);
  return `${hours > 0 ? hours + 'hr ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds > 0 ? seconds + 's' : ''}`;
}

const msToHM = (ms, format = "hm") => {
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms  / 1000 / 3600 ) % 24);
  let hourSuffix;
  let minuteSuffix;
  switch(format) {
    case "hm":
      hourSuffix = "hr";
      minuteSuffix = "m";
      break;
    case "HM":
      hourSuffix = hours === 1 ? " hour" : " hours";
      minuteSuffix = minutes === 1 ? " minutes" : " minute";
      break;
    case "Hm":
      hourSuffix = hours === 1 ? " hour" : " hours";
      minuteSuffix = "m";
      break;
    case "hM":
      hourSuffix = "hr";
      minuteSuffix = minutes === 1 ? " minutes" : " minute";
      break;
  }
  return `${hours > 0 ? hours + hourSuffix + ' ' : ''}${minutes > 0 ? minutes + minuteSuffix + ' ' : ''}`;
}

const msToM_RAW = (ms) => {
  return ms/1000/60;
}

const mToMS = (m) => {
  return m * 60 * 1000;
}

const formatSetsReps = (sets, repArray) => {
  let reps = ""
  if (repArray.every(e => e===repArray[0])) {
    reps = repArray[0];
  } else {
    reps = repArray.toString();
  }
  return `${sets} sets x ${reps} reps`
}

const getTimeStamp = () => {
  return new Date().toISOString();
}

const getWeekday = (ind, format = "dd") => {
  if (format === "d") {
    return ["S", "M", "T", "W", "T", "F", "S"][ind];
  } else {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Ssaturdays"][ind];
  }
}

const getSplitTemplate = () => {
  return {
    public: true,
    creator: {
      name: null,
      id: null,
      profile_photo: null
    },
    name: null,
    description: null,
    exercises: [],
    estimated_time: 1000 * 60 * 60,
    subscribers: []
  }
}

const generateUniqueId = () => {
  return uuid();
}

const filterSplitsByString = (splitList, str) => {
  const filterSplit = (filter, split) => {
    if (split.name.toLowerCase().includes(filter)) {
      return true;
    }
    for (let i=0, l=split.exercises.length; i < l; i++) {
      if (split.exercises[i].movement.toLowerCase().includes(filter)) {
        return true;
      }
    }
    return false
  }
  return Object.entries(splitList).filter(([id, split]) => filterSplit(str.toLowerCase(), split));
}
/**
 * Accessible object to validate many form fields across the application
 */
const validator = {
  /**
   * Checks each entry in an object to ensure they are all true
   * @param {Object}} validationObject 
   * @returns {Boolean} Whether or not all the values in the object are set to true
   */
  allValid: (validationObject) => {
    const values = Object.values(validationObject);
    for (let i=0, l = values.length; i < l; i++) {
      if (!values[i][0]) return false;
    }
    return true;
  },
  validateSelectedDays: (repeating, selectedDays) => {
    if (!repeating) {
      return [true, null];
    } else if (selectedDays.filter(el => el != 0).length <= 0) {
      return [false, "Select at least 1 day"]
    }
    return [true, null];
  },
  validateSplit: (split) => {
    if (Object.keys(split).length <= 0) return [false, "Selection required"];
    return [true, null];
  },
  /**
   * Validates the name given for a new/modified split
   * @param {Object} name 
   * @returns {[Boolean, String]} {[Validity, Reason]}
   */
  validateSplitName: (name) => {
    name = name.trim();
    if (name.length < 2)  return [false, "Too short"];
    if (name.length > 25) return [false, "Too long"];
    return [true, null];
  },
    /**
   * Validates the description given for a new/modified split
   * @param {Object} name 
   * @returns {[Boolean, String]} {[Validity, Reason]}
   */
  validateSplitDescription: (description) => {
    description = description.trim();
    return [true, null];
  },
    /**
   * Validates the exercises given for a new/modified split
   * @param {Object} name 
   * @returns {[Boolean, String]} {[Validity, Reason]}
   */
  validateSplitExercises: (exercises) => {
    if (exercises.length <= 0) return [false, "Minimum of 1"];
    return [true, null];
  },
}

const getSplitFromShareCode = async (shareCode) => {
  const decoded = JSON.parse(Buffer.from(shareCode, 'base64').toString('utf-8'));
  const split = await firebaseFunc.functions().httpsCallable("getSplitFromUser")(decoded);
  return split;
}

const getVerifiedSplits = async() => {
  const res = await firebaseFunc.functions().httpsCallable("getVerifiedSplits")();
  return res.data;
}

const getVerifiedMovements = async() => {
  const res = await firebaseFunc.functions().httpsCallable("getVerifiedMovements")();
  return res.data;
}


const generateSplitShareCode = (id, userId) => {
  return Buffer.from(JSON.stringify({ id: id, userId: userId }), "utf-8").toString("base64");
}

export {
  msToDigital,
  msToHM,
  msToHMS,
  mToMS,
  msToM_RAW,
  getWeekday,
  formatSetsReps,
  getTimeStamp,
  getSplitTemplate,
  generateUniqueId,
  filterSplitsByString,
  getSplitFromShareCode,
  getVerifiedSplits,
  getVerifiedMovements,
  generateSplitShareCode,
  validator,
}