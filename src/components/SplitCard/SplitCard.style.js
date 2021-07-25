import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.FOREGROUND_COLOR,
      paddingVertical: 8,
      paddingLeft: 15,
      borderRadius: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    heading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    name: {
      fontSize: theme.FONT_SIZE_LARGE,
      fontWeight: 'bold',
      marginRight: 5,
    },
    timeEstimate: {
      fontSize: theme.FONT_SIZE_SMALL,
      marginRight: 5,
    },
    scheduledTime: {
      fontSize: theme.FONT_SIZE_SMALL,
      fontWeight: 'bold',
      color: theme.SUBTITLE_COLOR
    },
    summaryRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    exercise: {
      marginRight: 5,
      fontWeight: 'bold',
      fontSize: theme.FONT_SIZE_TINY
    },
    reps: {
      fontSize: theme.FONT_SIZE_TINY
    },
    infoBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 15,
      paddingLeft: 20
    }
});