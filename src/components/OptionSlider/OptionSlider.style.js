import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.FOREGROUND_COLOR,
        borderRadius: 12
    },
    selected: {
      flex: 1,
      padding: 8,
      backgroundColor: theme.SPECIAL_FOREGROUND_COLOR_DARK,
      borderRadius: 12
    },
    unselected: {
      flex: 1,
      padding: 8
    },
    textSelected: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.BACKGROUND_COLOR
    },
    textUnselected: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.SUBTITLE_COLOR
    }
});