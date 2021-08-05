import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.SPECIAL_FOREGROUND_COLOR_LIGHT,
        marginHorizontal: -15,
        padding: 15
    },
    label: {
      color: theme.BACKGROUND_COLOR
    },
    codeContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    code: {
      color: theme.BACKGROUND_COLOR,
      fontSize: theme.FONT_SIZE_MEDIUM,
      fontWeight: 'bold',
      marginRight: 5,
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