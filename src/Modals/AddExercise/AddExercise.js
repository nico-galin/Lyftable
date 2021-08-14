import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './AddExercise.style';
import { systemStyles } from '../../assets/styles';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import theme from '../../assets/theme.style';
import Card from '../../components/Card/Card';
import ActionButton from '../../components/ActionButton/ActionButton';
import Counter from '../../components/Counter/Counter';
import { msToHM, msToHMS, validator } from '../../services/utilities';
import OptionSlider from '../../components/OptionSlider/OptionSlider';
import { useAppContext } from '../../contexts/AppContext';

export const AddExercise = ({ isVisible, setVisibility }) => {
  const [movementSearchText, setMovementSearchText] = useState('');
  const [selectedMovement, setSelectedMovement] = useState('');
  const [timeLimit, setTimeLimit] = useState(600000);
  const [setCount, setSetCount] = useState(3);
  const [restTime, setRestTime] = useState(60000);
  const [equalReps, setEqualReps] = useState(true);
  const [repetitions, setRepetitions] = useState([10, 10, 10]);
  const { verifiedMovements, setResetModal, modalCallback } = useAppContext();
  const [validation, setValidation] = useState({
    exercise: [true, null],
  });

  const reset = () => {
    setMovementSearchText('');
    setSelectedMovement('');
    setTimeLimit(600000);
    setSetCount(3);
    setRestTime(60000);
    setEqualReps(true);
    setRepetitions([10, 10, 10]);
    setValidation({ exercise: [true, null] });
  };

  useEffect(() => {
    setResetModal(() => reset);
  }, [setResetModal]);

  const completeForm = () => {
    const newValidation = {
      exercise: selectedMovement ? [true, null] : [false, 'Required'],
    };
    setValidation(newValidation);
    if (!validator.allValid(newValidation)) {
      return;
    }
    setVisibility(false);
    modalCallback({
      movement: verifiedMovements[selectedMovement].name,
      time_limit: timeLimit,
      set_count: setCount,
      repetitions: repetitions,
      rest_time: restTime,
    });
    reset();
  };

  const handleChangeSets = val => {
    let newRepetitions;
    if (val < setCount) {
      newRepetitions = repetitions.slice(0, val);
    } else {
      newRepetitions = [...repetitions];
      newRepetitions.push(newRepetitions[newRepetitions.length - 1]);
    }
    setRepetitions(newRepetitions);
    setSetCount(val);
  };

  const handleChangeEqualReps = val => {
    if (val === 'Equal Reps') {
      setEqualReps(true);
    } else {
      setEqualReps(false);
    }
  };

  const handleChangeAllReps = val => {
    const newRepetitions = [...repetitions];
    newRepetitions.fill(val);
    setRepetitions(newRepetitions);
  };

  const handleChangeIndividualRep = (ind, val) => {
    const newRepetitions = [...repetitions];
    newRepetitions[ind] = val;
    setRepetitions(newRepetitions);
  };
  const filteredMovements = Object.fromEntries(
    Object.entries(verifiedMovements).filter(
      ([key, value]) =>
        value.name.toLowerCase().includes(movementSearchText.toLowerCase()) ||
        (value.alt_name &&
          value.alt_name
            .toLowerCase()
            .includes(movementSearchText.toLowerCase())),
    ),
  );
  return (
    <ModalContainer
      isVisible={isVisible}
      setVisibility={setVisibility}
      header={'Add Exercise'}>
      <InputWrapper label={'Movement'} valid={validation.exercise}>
        {selectedMovement ? (
          <Card
            data={verifiedMovements[selectedMovement].name}
            bottomData={verifiedMovements[selectedMovement].alt_name}
            onDelete={() => setSelectedMovement('')}
          />
        ) : (
          <View>
            <SearchBar
              value={movementSearchText}
              placeholder={'Search Verified Movements...'}
              onChangeText={setMovementSearchText}
            />
            <View style={styles.movementContainer}>
              {Object.keys(filteredMovements).length > 0 ? (
                Object.entries(filteredMovements)
                  .slice(0, 3)
                  .map(([id, m], ind) => (
                    <View key={'Movement' + ind}>
                      <Card
                        data={m.name}
                        bottomData={m.alt_name ? m.alt_name : null}
                        onPress={() => setSelectedMovement(id)}
                      />
                    </View>
                  ))
              ) : (
                <Text style={styles.centeredText}>No Results</Text>
              )}
            </View>
          </View>
        )}
      </InputWrapper>
      <InputWrapper label={'Time Limit'}>
        <Counter
          formattedValue={timeLimit === 0 ? 'None' : msToHM(timeLimit)}
          initialValue={timeLimit}
          increment={60000}
          min={0}
          onChange={setTimeLimit}
        />
      </InputWrapper>
      <InputWrapper label={'Set Count'}>
        <Counter
          formattedValue={setCount}
          initialValue={setCount}
          increment={1}
          min={1}
          onChange={handleChangeSets}
        />
      </InputWrapper>
      <InputWrapper label={'Repetition Count'}>
        <OptionSlider
          options={['Equal Reps', 'Different Reps']}
          defaultIndex={0}
          onChange={handleChangeEqualReps}
        />
        {equalReps ? (
          <View style={styles.rep}>
            <Counter
              formattedValue={repetitions[0] + ' reps'}
              initialValue={repetitions[0]}
              increment={1}
              min={1}
              onChange={handleChangeAllReps}
            />
          </View>
        ) : (
          repetitions.map((set, ind) => (
            <View key={ind} style={styles.rep}>
              <Counter
                formattedValue={set + ' reps'}
                initialValue={set}
                increment={1}
                min={1}
                onChange={val => handleChangeIndividualRep(ind, val)}
              />
            </View>
          ))
        )}
      </InputWrapper>
      <InputWrapper label={'Rest Time'}>
        <Counter
          formattedValue={restTime === 0 ? 'None' : msToHMS(restTime)}
          initialValue={restTime}
          increment={15000}
          min={0}
          onChange={setRestTime}
        />
      </InputWrapper>
      <View style={[styles.rep, systemStyles.fullWidth]}>
        <ActionButton
          onPress={completeForm}
          text={'Done'}
          height={'large'}
          color={theme.SECONDARY_COLOR}
          textColor={theme.BACKGROUND_COLOR}
        />
      </View>
      <View style={systemStyles.bottomSpacer} />
    </ModalContainer>
  );
};
