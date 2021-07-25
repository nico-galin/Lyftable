import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.SPECIAL_FOREGROUND_COLOR_DARK,
        marginHorizontal: -15,
        padding: 18
    },
    label: {
      color: theme.BACKGROUND_COLOR
    },
    code: {
      color: theme.BACKGROUND_COLOR,
      fontSize: theme.FONT_SIZE_LARGE,
      fontWeight: 'bold'
    },
    prompt: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    promptText: {
      maxWidth: 50,
      textAlign: 'right',
      fontWeight: 'bold',
      color: theme.BACKGROUND_COLOR,
    }
});