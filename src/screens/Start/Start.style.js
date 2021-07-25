import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    buttonRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    gap: {
      width: 10
    },
    noSplitsText: {
      textAlign: 'center',
      paddingVertical: 15,
      paddingHorizontal: 5,
      fontSize: theme.FONT_SIZE_SMALL,
      color: theme.SUBTITLE_COLOR
    },
});