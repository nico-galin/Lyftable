import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { systemStyles } from '../../assets/styles';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import theme from '../../assets/theme.style';
import ActionButton from '../../components/ActionButton/ActionButton';
import OptionSlider from '../../components/OptionSlider/OptionSlider';
import { useAppContext } from '../../contexts/AppContext';

export const ActiveWorkoutMenu = ({ isVisible, setVisibility }) => {
  const { setResetModal, modalCallback } = useAppContext();
  const [newName, setNewName] = useState();
  const [useExerciseTimers, setUseExerciseTimers] = useState(true);
  const reset = () => {};
  useEffect(() => {
    setResetModal(() => reset);
  }, [setResetModal]);

  const handleToggleExerciseTimers = val => {
    setUseExerciseTimers(val === 'Yes' ? true : false);
    modalCallback({
      action: 'toggleExerciseTimers',
      data: val === 'Yes' ? true : false,
    });
  };

  const cancel = () => {
    setVisibility(false);
    modalCallback({ action: 'cancel' });
    reset();
  };

  const rename = name => {
    setVisibility(false);
    modalCallback({ action: 'cancel' });
    reset();
  };

  return (
    <ModalContainer isVisible={isVisible} setVisibility={setVisibility}>
      <InputWrapper label={'Time Individual Exercises?'}>
        <OptionSlider
          options={['No', 'Yes']}
          defaultIndex={useExerciseTimers ? 1 : 0}
          onChange={handleToggleExerciseTimers}
        />
      </InputWrapper>
      <View style={systemStyles.formSpacer} />
      <ActionButton
        onPress={cancel}
        text={'Cancel Workout'}
        height={'large'}
        color={theme.SPECIAL_FOREGROUND_COLOR_LIGHT}
        textColor={theme.BACKGROUND_COLOR}
      />
      <View style={systemStyles.bottomSpacer} />
    </ModalContainer>
  );
};
