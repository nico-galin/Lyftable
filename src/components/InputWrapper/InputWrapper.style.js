import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
      marginBottom: 6,
      width: '100%'
    },
    outline: {
      position: 'relative',
      marginTop: 15,
      borderWidth: 1,
      borderColor: theme.SUBTITLE_COLOR,
      borderRadius: 15,
      padding: 14
    },
    label: {
      position: 'absolute',
      backgroundColor: theme.BACKGROUND_COLOR,
      color: theme.SUBTITLE_COLOR,
      paddingHorizontal: 10,
      top: -12,
      left: 20,
    }
});