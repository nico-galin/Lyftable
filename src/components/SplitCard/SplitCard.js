import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SplitCard.style';
import { msToHM, formatSetsReps } from '../../services/utilities';
import theme from '../../assets/theme.style';

export default ({ split, scheduled, onPress, onDelete, onInfo }) => {
  return (
    <TouchableOpacity activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY} style={styles.container} onPress={onPress}>
        <View style={styles.dataContainer}>
          <View style={styles.heading}>
            <Text style={styles.name}>{split.name}</Text>
            <Text style={styles.timeEstimate}>{msToHM(split.estimated_time)}</Text>
            {scheduled && <Text style={styles.scheduledTime}>{format(parseISO(scheduled), 'h:mm aaa')}</Text>}
          </View>
          <View style={styles.summary}>
            {split.exercises.map((exercise, ind) => (
              <View key={ind} style={styles.summaryRow}>
                <Text style={styles.exercise}>{exercise.movement}</Text>
                <Text style={styles.reps}>{formatSetsReps(exercise.set_count, exercise.repetitions)}</Text>
              </View>
            ))}
          </View>
        </View>
        { onInfo &&
          <TouchableOpacity activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY} style={styles.infoBtn} onPress={onInfo}>
            <FoundationIcon name={'info'} size={25} color={theme.PLACEHOLDER_COLOR}/>
          </TouchableOpacity>
        }
        { onDelete && !onInfo &&
          <TouchableOpacity activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY} style={styles.infoBtn} onPress={onDelete}>
            <MatComIcon name={'delete'} size={25} color={theme.PLACEHOLDER_COLOR}/>
          </TouchableOpacity>
        }
    </TouchableOpacity>
  );
};