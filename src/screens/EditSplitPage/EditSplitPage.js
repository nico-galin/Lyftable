import React, { useState, useContext } from 'react';
import {ScrollView, Text, View, TextInput} from 'react-native';

import styles from './EditSplitPage.style';
import { systemStyles } from '../../assets/styles';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import OptionSlider from '../../components/OptionSlider/OptionSlider';
import Card from '../../components/Card/Card';
import Counter from '../../components/Counter/Counter';
import { formatSetsReps, msToHM } from '../../services/utilities';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../services/appContext';

export default ({ route }) => {
  let split = route.params.data;
  const [estimatedTime, setEstimatedTime] = useState(split.estimated_time);
  const [name, setName] = useState(split.name);
  const [showOnProfile, setShowOnProfile] = useState(split.public);
  const [description, setDescription] = useState(split.description);
  const [exercises, setExercises] = useState([...split.exercises]);
  const context = useContext(AppContext);
  const navigation = useNavigation();
  const handleName = (val) => {
    setName(val);
  }
  const handleDescription = (val) => {
    setDescription(val);
  }
  const handleEstTime = (val) => {
    setEstimatedTime(val);
  }
  const handleShowOnProfile = (val) => {
    setShowOnProfile(val === "Yes" ? true : false);
  }
  const handleDeleteExercise = (index) => {
    let newExercises = [...exercises];
    newExercises.splice(index, 1)
    setExercises(newExercises);
  }

  const handleAddExercise = (ex) => {
    let newExercises = [...exercises];
    newExercises.push(ex);
    setExercises(newExercises);
  }

  const openNewExerciseModal = () => {
    context.openModal("AddExercise", handleAddExercise);
  }

  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Edit Split'} backButton={true}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputWrapper label={'Name'}>
          <TextInput style={systemStyles.textInput} value={name} onChangeText={handleName} />
        </InputWrapper>
        <InputWrapper label={'Description'}>
          <TextInput value={description} blurOnSubmit={true} multiline textAlignVertical={'top'} style={[systemStyles.textInput, styles.description]} onChangeText={handleDescription} />
        </InputWrapper>
        <InputWrapper label={'Exercises'}>
          {exercises.map((ex, ind) => (
            <Card ind={ind} data={ex.movement} topData={msToHM(ex.rest_time)} bottomData={formatSetsReps(ex.set_count, ex.repetitions)} moveable={true} onDelete={() => handleDeleteExercise(ind)}/>
          ))}
          <View style={styles.addExerciseBtnContainer}>
            <ActionButton text={'Add Exercise'} color={theme.PRIMARY_COLOR} textColor={theme.BACKGROUND_COLOR} onPress={openNewExerciseModal}/>
          </View>
        </InputWrapper>
        <InputWrapper label={'Estimated Time'}>
            <Counter formattedValue={msToHM(estimatedTime)} initialValue={estimatedTime} increment={60000} onChange={handleEstTime}/>
        </InputWrapper>
        <InputWrapper label={'Show on Profile?'}>
          <OptionSlider options={["No", "Yes"]} defaultIndex={showOnProfile ? 1 : 0} onChange={handleShowOnProfile}/>
          <Text style={styles.centeredText}>Note: Your actual weights will not be visible</Text>
        </InputWrapper>
        <View style={styles.spacer}/>
        <ActionButton onPress={navigation.goBack} text={'Done'} height={'large'} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
        <View style={styles.bottomSpacer}/>
      </ScrollView>
    </View>
  )
};