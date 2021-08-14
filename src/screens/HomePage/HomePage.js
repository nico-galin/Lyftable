import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import Header from '../../components/Header/Header';
import Calendar from '../../components/Calendar/Calendar';
import SectionLabel from '../../components/SectionLabel/SectionLabel';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './HomePage.style';
import { systemStyles, dummyStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import { msToHM } from '../../services/utilities';

export const HomePage = ({}) => {
  let { userSplits, userDataLoading } = useAppContext();
  const navigation = useNavigation();
  const generateSubscriberRow = subs => {
    let pfpSubs = subs.filter(sub => sub.profile_photo);
    if (pfpSubs.length >= 3) {
      pfpSubs = pfpSubs.slice(0, 3);
    }
    return (
      <View style={styles.subscribers}>
        {pfpSubs.map((sub, ind) => (
          <View key={'sub' + ind} style={styles.subscriberWrapper}>
            <Image
              style={styles.subscriber}
              source={{ uri: sub.profile_photo }}
            />
          </View>
        ))}
        {subs.length - pfpSubs.length > 0 && (
          <View style={styles.subscriberWrapper}>
            <View style={styles.extraSubscribers}>
              <Text style={styles.extraSubscribersText}>
                +{Math.min(99, subs.length - pfpSubs.length)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };
  let splits;
  let dummySplits = false;
  if (!userDataLoading) {
    splits = userSplits;
  } else {
    dummySplits = true;
    splits = {
      0: { name: 'dummy split name', estimated_time: 1000000, exercises: [] },
      1: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
      2: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
      3: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
      4: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
    };
  }
  const numSplits = Object.keys(splits).length;
  return (
    <View style={styles.container}>
      <Header title={'Home'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[systemStyles.pageSection, systemStyles.pageContainer]}>
          <SectionLabel label={'Calendar'} />
          <Calendar />
        </View>
        <View style={systemStyles.pageSection}>
          <View style={styles.pageContainerFake}>
            <SectionLabel
              label={'Split Collection'}
              buttonLabel={'Add Split'}
              buttonOnPress={() => navigation.navigate('AddSplit')}
            />
          </View>
          <View>
            {numSplits <= 0 ? (
              <Text style={styles.noSplitsText}>
                You don't have any splits yet!
              </Text>
            ) : (
              <View>
                {Object.entries(splits).map(([id, split], ind) => (
                  <View key={ind}>
                    <TouchableHighlight
                      underlayColor={theme.CALENDAR_HIGHLIGHT_COLOR}
                      activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
                      style={styles.split}
                      disabled={dummySplits}
                      onPress={() =>
                        navigation.navigate('SplitPage', {
                          data: split,
                          inCollection: true,
                        })
                      }>
                      <>
                        <View style={styles.description}>
                          <Text
                            style={
                              dummySplits
                                ? [styles.title, systemStyles.dummyText]
                                : styles.title
                            }>
                            {split.name}
                          </Text>
                          <Text
                            style={
                              dummySplits
                                ? [
                                    styles.exerciseLength,
                                    systemStyles.dummyText,
                                  ]
                                : styles.exerciseLength
                            }>
                            {split.exercises.length} Exercises
                          </Text>
                        </View>
                        <View style={styles.action}>
                          {!dummySplits &&
                            generateSubscriberRow(split.subscribers)}
                          <Text
                            style={
                              dummySplits
                                ? [styles.timeEstimate, systemStyles.dummyText]
                                : styles.timeEstimate
                            }>
                            {msToHM(split.estimated_time)}
                          </Text>
                          <FeatherIcon
                            name={'chevron-right'}
                            size={20}
                            color={theme.SUBTITLE_COLOR}
                          />
                        </View>
                      </>
                    </TouchableHighlight>
                    {ind !== numSplits - 1 && <View style={styles.border} />}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
