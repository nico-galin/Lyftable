import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {

    },
    daySelectorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    dayBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.PLACEHOLDER_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayBtnActive: {
      backgroundColor: theme.SPECIAL_FOREGROUND_COLOR_LIGHT,
    },
    dayBtnText: {
      fontWeight: "bold",
      fontSize: theme.FONT_SIZE_MEDIUM,
      textAlign: 'center',
      color: theme.BACKGROUND_COLOR
    }
});