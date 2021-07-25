import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    wrapper: {
      width: 180,
      position: 'relative',
      borderRadius: 10,
      borderColor: theme.SUBTITLE_COLOR,
      borderWidth: 1,
      flexDirection: 'row'
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5
    },
    separator: {
      width: 1.5,
      backgroundColor: theme.SUBTITLE_COLOR
    },
    formattedData: {
    }
});