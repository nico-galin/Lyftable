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

const formatSetsReps = (sets, repArray) => {
  let reps = ""
  if (repArray.every(e => e===repArray[0])) {
    reps = repArray[0];
  } else {
    reps = repArray.toString();
  }
  return `${sets} sets x ${reps} reps`
}
export { msToDigital, msToHM, msToHMS, msToM_RAW, formatSetsReps }