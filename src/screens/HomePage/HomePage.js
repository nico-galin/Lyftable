import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
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

export const HomePage = ({ }) => {
  let { userSplits } = useAppContext();
  if (!userSplits) userSplits = {};
  const navigation = useNavigation();
  const generateSubscriberRow = (subs) => {
    let pfpSubs = subs.filter(sub => sub.profile_photo)
    if (pfpSubs.length >= 3) {
      pfpSubs = pfpSubs.slice(0, 3);
    }
    return (
      <View style={styles.subscribers}>
        {pfpSubs.map((sub, ind) => (
          <View key={'sub' + ind} style={styles.subscriberWrapper}>
            <Image style={styles.subscriber} source={{uri: sub.profile_photo}} />
          </View>
        ))}
        {subs.length - pfpSubs.length > 0 &&
          <View style={styles.subscriberWrapper}>
            <View style={styles.extraSubscribers}>
              <Text style={styles.extraSubscribersText}>+{Math.min(99, subs.length - pfpSubs.length)}</Text>
            </View>
          </View>
        }
      </View>
    )
  }
  const numSplits = Object.keys(userSplits).length;
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Home'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={systemStyles.pageSection}>
          <SectionLabel label={'Calendar'}/>
          <Calendar />
        </View>
        <View style={systemStyles.pageSection}>
          <SectionLabel label={'Split Collection'} buttonLabel={'Add Split'} buttonOnPress={() => navigation.navigate('AddSplit')}/>
          <View>
            {numSplits <= 0 ?
              <Text style={styles.noSplitsText}>You don't have any splits yet!</Text>
            :
              <View>
                {Object.entries(userSplits).map(([id, split], ind) => (
                  <View key={ind}>
                    <TouchableOpacity activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY} style={styles.split} onPress={() => navigation.navigate('SplitPage', { data: split, inCollection: true })}>
                      <View style={styles.description}>
                        <Text style={styles.title}>{split ? split.name : ""}</Text>
                        <Text style={styles.exerciseLength}>{split.exercises.length} Exercises</Text>
                      </View>
                      <View style={styles.action}>
                        {generateSubscriberRow(split.subscribers)}
                        <Text style={styles.timeEstimate}>{msToHM(split.estimated_time)}</Text>
                        <FeatherIcon name={'chevron-right'} size={20} color={theme.SUBTITLE_COLOR}/>
                      </View>
                    </TouchableOpacity>
                    {ind != numSplits - 1 && <View style={styles.border} />}
                  </View>
                ))}
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
};