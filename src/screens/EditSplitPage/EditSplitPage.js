import React, { useState } from 'react';
import {ScrollView, Text, View, TextInput} from 'react-native';
import styles from './EditSplitPage.style';
import { systemStyles } from '../../assets/styles';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import OptionSlider from '../../components/OptionSlider/OptionSlider';
import Card from '../../components/Card/Card';
import Counter from '../../components/Counter/Counter';
import { formatSetsReps, getSplitTemplate, msToHM, validator } from '../../services/utilities';
import theme from '../../assets/theme.style';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
let _ = require("lodash");

export const EditSplitPage = ({ route }) => {
  const context = useAppContext();
  const navigation = useNavigation();
  const existingSplit = route && route.params && route.params.data;
  const split = existingSplit ? route.params.data : getSplitTemplate();
  const inCollection = context.splitInCollection(split.id);
  const [estimatedTime, setEstimatedTime] = useState(split.estimated_time);
  const [name, setName] = useState(split.name ? split.name : "");
  const [showOnProfile, setShowOnProfile] = useState(split.public);
  const [description, setDescription] = useState(split.description ? split.description : "");
  const [exercises, setExercises] = useState([...split.exercises]);
  const [validation, setValidation] = useState({
    name: [true, null],
    description: [true, null],
    exercises: [true, null],
  });

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

  const handleSubmit = () => {
    const newValidation = {
      name: validator.validateSplitName(name),
      description: validator.validateSplitDescription(description),
      exercises: validator.validateSplitExercises(exercises),
    };
    setValidation(newValidation);
    if (!validator.allValid(newValidation)) return;

    const newSplit = Object.assign({}, split);
    newSplit.public = showOnProfile;
    newSplit.creator = {
      id: context.userMetadata.id,
      name: context.userMetadata.name,
      profile_photo: context.userMetadata.profile_photo
    }
    newSplit.name = name.trim();
    newSplit.description = description.trim();
    newSplit.exercises = exercises;
    newSplit.estimatedTime = estimatedTime;
    if (inCollection) {
      context.replaceUserSplit(newSplit);
    } else if (existingSplit && _.isEqual(newSplit, split)) {
      context.addUserSplit(split);
    } else {
      context.addUserSplit(newSplit);
      navigation.dispatch(StackActions.popToTop());
    }
    navigation.navigate("SplitPage", { data: newSplit});
  }

  return (
    <View style={systemStyles.pageContainer}>
      <Header title={existingSplit ? "Edit Split" : "Create a Split"} backButton={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputWrapper label={'Name'} valid={validation.name}>
          <TextInput style={systemStyles.textInput} value={name} onChangeText={handleName} />
        </InputWrapper>
        <InputWrapper label={'Description'} valid={validation.description}>
          <TextInput value={description} blurOnSubmit={true} multiline textAlignVertical={'top'} style={[systemStyles.textInput, styles.description]} onChangeText={handleDescription} />
        </InputWrapper>
        <InputWrapper label={'Exercises'} valid={validation.exercises}>
          {exercises.map((ex, ind) => (
            <View key={'Exercise' + ind}><Card data={ex.movement} topData={msToHM(ex.rest_time)} bottomData={formatSetsReps(ex.set_count, ex.repetitions)} moveable={true} onDelete={() => handleDeleteExercise(ind)}/></View>
          ))}
          <View style={styles.addExerciseBtnContainer}>
            <ActionButton text={'Add Exercise'} color={theme.SPECIAL_FOREGROUND_COLOR_LIGHT} textColor={theme.BACKGROUND_COLOR} onPress={openNewExerciseModal}/>
          </View>
        </InputWrapper>
        <InputWrapper label={'Estimated Time'} valid={validation.estimated_time}>
            <Counter formattedValue={estimatedTime === 0 ? "None" : msToHM(estimatedTime)} initialValue={estimatedTime} min={0} increment={60000 * 5} onChange={handleEstTime}/>
        </InputWrapper>
        <InputWrapper label={'Show on Profile?'} valid={validation.show_on_profile}>
          <OptionSlider options={["No", "Yes"]} defaultIndex={showOnProfile ? 1 : 0} onChange={handleShowOnProfile}/>
          <Text style={styles.centeredText}>Note: Your actual weights will not be visible</Text>
        </InputWrapper>
        <View style={systemStyles.formSpacer}/>
        <ActionButton onPress={handleSubmit} text={'Done'} height={'large'} color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
        <View style={systemStyles.bottomSpacer}/>
      </ScrollView>
    </View>
  )
};