import React, { useState } from 'react';
import {
  startOfWeek,
  startOfMonth,
  addDays,
  format,
  isSameDay,
  isAfter,
  addMonths,
  isSameYear,
} from 'date-fns';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import styles from './Calendar.style';
import theme from '../../assets/theme.style';
import ActionButton from '../ActionButton/ActionButton';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();
  let dateList = [];
  const [monthDiff, setMonthDiff] = useState(0);
  const today = new Date();
  const referenceDate = addMonths(today, monthDiff);
  const curMonth = referenceDate.getMonth();
  const startingSunday = startOfWeek(startOfMonth(referenceDate));
  for (let i = 0, l = 42; i < l; i++) {
    const curDate = addDays(startingSunday, i);
    dateList.push({
      date: curDate.getDate(),
      sameMonth: curDate.getMonth() === curMonth,
      // Can only be scheduled or completed, "missed" is auto determined here if not completed and in the past
      type: ['plain', 'missed', 'scheduled', 'completed'][
        Math.floor(Math.random() * 4)
      ],
      today: isSameDay(curDate, today),
      future: isAfter(curDate, today),
    });
  }

  const createDayTile = ind => {
    const curDate = dateList[ind];
    return (
      <TouchableOpacity
        activeOpacity={theme.TOUCHABLE_ACTIVE_OPACITY}
        key={ind}
        disabled={curDate.type === 'plain'}
        style={[
          styles[`${curDate.type}Day`],
          curDate.today ? styles.today : null,
          (curDate.future || curDate.today) && curDate.type !== 'plain'
            ? styles.future
            : null,
        ]}>
        <Text style={curDate.sameMonth ? styles.monthDay : styles.day}>
          {curDate.date}
        </Text>
        {curDate.type !== 'plain' && (
          <View style={styles[`${curDate.type}Circle`]} />
        )}
      </TouchableOpacity>
    );
  };

  const dateMappingArray = [0, 7, 14, 21, 28, 35];
  return (
    <LinearGradient
      colors={[
        theme.SPECIAL_FOREGROUND_COLOR_LIGHT,
        theme.SPECIAL_FOREGROUND_COLOR_DARK,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.monthCarousel}>
        <TouchableWithoutFeedback onPress={() => setMonthDiff(monthDiff - 1)}>
          <View style={styles.monthCarouselLeftBtn}>
            <Icon
              name={'chevron-left'}
              size={20}
              color={theme.SUBTITLE_COLOR}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setMonthDiff(0)}>
          <Text style={styles.monthText}>
            {isSameYear(referenceDate, today)
              ? format(referenceDate, 'MMMM')
              : format(referenceDate, 'MMMM yyyy')}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setMonthDiff(monthDiff + 1)}>
          <View style={styles.monthCarouselRightBtn}>
            <Icon
              name={'chevron-right'}
              size={20}
              color={theme.SUBTITLE_COLOR}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.calendar}>
        <View style={styles.column}>
          <Text style={styles.heading}>S</Text>
          {dateMappingArray.map(ind => createDayTile(ind))}
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>M</Text>
          {dateMappingArray.map(ind => createDayTile(ind + 1))}
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>T</Text>
          {dateMappingArray.map(ind => createDayTile(ind + 2))}
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>W</Text>
          {dateMappingArray.map(ind => createDayTile(ind + 3))}
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>T</Text>
          {dateMappingArray.map(ind => createDayTile(ind + 4))}
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>F</Text>
          {dateMappingArray.map(ind => createDayTile(ind + 5))}
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>S</Text>
          {dateMappingArray.map(ind => createDayTile(ind + 6))}
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.key}>
          <View style={styles.keyElement}>
            <View style={styles.missedCircle} />
            <Text style={styles.keyText}>Missed</Text>
          </View>
          <View style={styles.keyElement}>
            <View style={styles.scheduledCircle} />
            <Text style={styles.keyText}>Scheduled</Text>
          </View>
          <View style={styles.keyElement}>
            <View style={styles.completedCircle} />
            <Text style={styles.keyText}>Completed</Text>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <ActionButton
            text={'Add Workouts'}
            color={theme.BACKGROUND_COLOR}
            textColor={theme.SPECIAL_FOREGROUND_COLOR_DARK}
            onPress={() => navigation.navigate('ScheduleWorkouts')}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
