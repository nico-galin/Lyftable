import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 0,
    },
    contentContainer: {
      backgroundColor: theme.BACKGROUND_COLOR,
      paddingHorizontal: 15,
      paddingTop: 12,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: '90%'
    },
    dragBar: {
      width: 30,
      height: 3,
      backgroundColor: theme.SUBTITLE_COLOR,
      opacity: 0.3,
      borderRadius: 10,
      marginBottom: 12
    },
    bottomSpacer: {
      height: 100,
    },
});