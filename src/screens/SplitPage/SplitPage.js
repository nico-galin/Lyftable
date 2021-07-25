import React, { useEffect, useState } from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

import styles from './SplitPage.style';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import { systemStyles } from '../../assets/styles';
import { msToHM, formatSetsReps } from '../../services/utilities';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';
import CodeBanner from '../../components/CodeBanner/CodeBanner';
import { useAppContext } from '../../contexts/AppContext';

export default ({ route }) => {
  let [split, setSplit] = useState(route.params.data);
  const context = useAppContext();
  const navigation = useNavigation();
  useEffect(() => {
    setSplit(context.getSplit(split.id));
    const willFocusSubscription = navigation.addListener('focus', () => {
      setSplit(context.getSplit(split.id));
    });
    return willFocusSubscription;
  }, []);
  let subscriberList = "";
  const publicSubscribers = split.subscribers.filter(sub => sub.id != null);
  publicSubscribers.slice(0, 5).forEach((sub, ind) => {
    subscriberList += (ind === Math.min(publicSubscribers.length - 1, 4) ? sub.name : `${sub.name}, `)
  });
  if (publicSubscribers.length === 0) {
    subscriberList += `${split.subscribers.length} People`;
  } else if (publicSubscribers.length != split.subscribers.length) {
    subscriberList += `, and ${Math.max(publicSubscribers.length - 5, 0) + split.subscribers.length - publicSubscribers.length} others`;
  }

  const handleDelete = () => {
    context.removeUserSplit(split.id);
    navigation.goBack();
  }

  return (
    <View style={systemStyles.pageContainer}>
      <Header title={split.name} backButton={true} rightButtonName={"delete"} rightButtonOnPress={handleDelete}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>{split.description}</Text>
        <View style={styles.sectionContainer}>
          <Image style={[styles.sectionDefiner, styles.creatorImage]} source={{uri: split.creator.profile_photo}} />
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionHeader}>Creator</Text>
            <Text style={styles.sectionSubheader}>{split.creator.name}</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionDefiner}>
            <MatComIcon name={'dumbbell'} size={25} color={theme.BACKGROUND_COLOR}/>
          </View>
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionHeader}>Split</Text>
            {split.exercises.map((exercise, ind) => (
              <View style={styles.subsectionContainer}>
                <Text style={styles.sectionSubheader}>{exercise.movement}</Text>
                <Text>{msToHM(exercise.time_limit)} {formatSetsReps(exercise.set_count, exercise.repetitions)}</Text>
                <Text>{msToHM(exercise.rest_time)} rest between sets</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionDefiner}>
            <MatIcon name={'people-alt'} size={25} color={theme.BACKGROUND_COLOR}/>
          </View>
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionHeader}>Subscribers</Text>
            <Text style={styles.sectionSubheader}>{subscriberList}</Text>
          </View>
        </View>
        <View style={[styles.sectionContainer, styles.buttonRow]}>
          <ActionButton onPress={() => navigation.navigate('EditSplit', { data: split })} text={'Edit'} height={'large'} width={'small'} color={theme.PRIMARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
          <View style={styles.gap} />
          <ActionButton text={'Start Workout'} height={'large'}color={theme.SECONDARY_COLOR} textColor={theme.BACKGROUND_COLOR} />
        </View>
        <Text style={styles.description}>Note: If you make changes to a split made by someone else, you will be unsubscribed from their split</Text>
      </ScrollView>
      <CodeBanner label={'Split Share Code'} code={'ABCDEFGHIJK'} data={{}} />
    </View>
  )
};