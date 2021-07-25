let hashlib = require('hashlib');
import 'react-native-get-random-values';
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

const msToHM = (ms) => {
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms  / 1000 / 3600 ) % 24);
  return `${hours > 0 ? hours + 'hr ' : ''}${minutes > 0 ? minutes + 'm ' : ''}`;
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

export { msToDigital, msToHM, msToHMS, mToMS, msToM_RAW, formatSetsReps, getTimeStamp, getSplitTemplate, generateUniqueId }