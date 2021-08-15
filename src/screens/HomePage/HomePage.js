import React, { useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  Image,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import Header from '../../components/Header/Header';
import Calendar from '../../components/Calendar/Calendar';
import SectionLabel from '../../components/SectionLabel/SectionLabel';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './HomePage.style';
import { systemStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import { msToHM } from '../../services/utilities';
import changeNavigationBarColor, {
  showNavigationBar,
} from 'react-native-navigation-bar-color';

const dummySplitData = {
  0: { name: 'dummy split name', estimated_time: 1000000, exercises: [] },
  1: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
  2: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
  3: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
  4: { name: 'dummy split', estimated_time: 1000000, exercises: [] },
};

const SubscriberRow = ({ subscribers }) => {
  let pfpSubs = subscribers.filter(sub => sub.profile_photo);
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
      {subscribers.length - pfpSubs.length > 0 && (
        <View style={styles.subscriberWrapper}>
          <View style={styles.extraSubscribers}>
            <Text style={styles.extraSubscribersText}>
              +{Math.min(99, subscribers.length - pfpSubs.length)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const Split = ({
  split,
  index,
  navigation,
  lastSplit,
  dummySplits = false,
}) => (
  <>
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
                ? [styles.exerciseLength, systemStyles.dummyText]
                : styles.exerciseLength
            }>
            {split.exercises.length} Exercises
          </Text>
        </View>
        <View style={styles.action}>
          {!dummySplits && <SubscriberRow subscribers={split.subscribers} />}
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
    {lastSplit && <View style={styles.border} />}
  </>
);

export const HomePage = ({}) => {
  let { userSplits, userDataLoading } = useAppContext();
  const navigation = useNavigation();
  useEffect(() => {
    showNavigationBar();
    changeNavigationBarColor(theme.FOREGROUND_COLOR, true);
    StatusBar.setBarStyle('dark-content');
  }, []);
  let splits;
  if (!userDataLoading) {
    splits = userSplits;
  } else {
    splits = dummySplitData;
  }

  const renderSplit = ({ split, index, lastSplit }) => (
    <Split
      split={split}
      index={index}
      navigation={navigation}
      lastSplit={lastSplit}
      dummySplits={userDataLoading}
    />
  );
  const numSplits = Object.keys(splits).length;
  return (
    <View style={styles.container}>
      <Header title={'Home'} />
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        renderItem={() => null}
        ListFooterComponent={
          <>
            <View
              style={[systemStyles.pageSection, systemStyles.pageContainer]}>
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
                  <FlatList
                    data={Object.entries(splits)}
                    renderItem={({ item, index }) =>
                      renderSplit({
                        split: item[1],
                        index,
                        lastSplit: index === numSplits - 1,
                      })
                    }
                    keyExtractor={([id, _]) => id}
                  />
                )}
              </View>
            </View>
          </>
        }
      />
    </View>
  );
};
