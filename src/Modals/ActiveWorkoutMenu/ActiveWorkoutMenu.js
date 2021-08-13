import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './ActiveWorkoutMenu.style'
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

export const ActiveWorkoutMenu = ({ isVisible, setVisibility }) => {
  const { setResetModal, modalCallback } = useAppContext();
  const [newName, setNewName] = useState();
  const [useExerciseTimers, setUseExerciseTimers] = useState(true);
  const reset = () => {

  }

  useEffect(() => {
    setResetModal(() => reset);
  }, []);

  const completeForm = () => {
    const newValidation = {
      exercise: selectedMovement ? [true, null] : [false, "Required"]
    }
    setVisibility(false);
    modalCallback({});
    reset();
  }

  const handleToggleExerciseTimers = (val) => {
    setUseExerciseTimers(val === "Yes" ? true : false);
    modalCallback({ action: "toggleExerciseTimers", data: val === "Yes" ? true : false });
  }

  const cancel = () => {
    setVisibility(false);
    modalCallback({ action: "cancel" });
    reset();
  }

  const rename = (name) => {
    setVisibility(false);
    modalCallback({ action: "cancel" });
    reset();
  }

  return (
    <ModalContainer isVisible={isVisible} setVisibility={setVisibility}>
      <InputWrapper label={'Time Individual Exercises?'}>
        <OptionSlider options={["No", "Yes"]} defaultIndex={useExerciseTimers ? 1 : 0} onChange={handleToggleExerciseTimers}/>
      </InputWrapper>
      <View style={systemStyles.formSpacer}/>
      <ActionButton onPress={cancel} text={"Cancel Workout"} height={"large"} color={theme.SPECIAL_FOREGROUND_COLOR_LIGHT} textColor={theme.BACKGROUND_COLOR} />
      <View style={systemStyles.bottomSpacer} />
    </ModalContainer>
  )
}