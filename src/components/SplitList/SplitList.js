import React from 'react';
import {Button, Text, TouchableOpacity, View, Image} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { msToHM } from '../../services/utilities';
import theme from '../../assets/theme.style';

import styles from './SplitList.style';
import { systemStyles } from '../../assets/styles';
import { useNavigation } from '@react-navigation/native';

export default ({data = []}) => {
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
          <View style={styles.subscriberWrapper}>
            <View style={styles.extraSubscribers}>
              <Text style={styles.extraSubscribersText}>+{Math.min(99, subs.length - pfpSubs.length)}</Text>
            </View>
          </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {data.length <= 0 ?
        <Text style={styles.noSplitsText}>You don't have any splits yet!</Text>
      :
        <View>
          {data.map((split, ind) => (
            <View key={ind}>
              <TouchableOpacity style={styles.split} onPress={() => navigation.navigate('SplitPage', { data: split })}>
                <View style={styles.description}>
                  <Text style={styles.title}>{split.name}</Text>
                  <Text style={styles.exerciseLength}>{split.exercises.length} Exercises</Text>
                </View>
                <View style={styles.action}>
                  {generateSubscriberRow(split.subscribers)}
                  <Text style={styles.timeEstimate}>{msToHM(split.estimated_time)}</Text>
                  <FeatherIcon name={'chevron-right'} size={20} color={theme.SUBTITLE_COLOR}/>
                </View>
              </TouchableOpacity>
              <View style={styles.border}></View>
            </View>
          ))}
        </View>
      }
    </View>
  );
};