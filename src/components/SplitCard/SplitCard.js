import React from 'react';
import {Button, Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/Foundation';

import styles from './SplitCard.style';
import { systemStyles } from '../../assets/styles';
import { msToHM, formatSetsReps } from '../../services/utilities';
import theme from '../../assets/theme.style';

export default ({split, scheduled, key}) => {
  return (
    <TouchableOpacity style={styles.container} key={key}>
        <View style={styles.dataContainer}>
          <View style={styles.heading}>
            <Text style={styles.name}>{split.name}</Text>
            <Text style={styles.timeEstimate}>{msToHM(split.estimated_time)}</Text>
            {scheduled && <Text style={styles.scheduledTime}>{format(parseISO(scheduled), 'h:mm aaa')}</Text>}
          </View>
          <View style={styles.summary}>
            {split.exercises.map(exercise => (
              <View style={styles.summaryRow}>
                <Text style={styles.exercise}>{exercise.movement}</Text>
                <Text style={styles.reps}>{formatSetsReps(exercise.set_count, exercise.repetitions)}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.infoBtn}>
          <Icon name={'info'} size={25} color={theme.PLACEHOLDER_COLOR}/>
        </TouchableOpacity>
    </TouchableOpacity>
  );
};