import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.FOREGROUND_COLOR,
      borderRadius: 10,
      paddingVertical: 10,
      paddingLeft: 10,
      marginBottom: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 1,
    },
    rightContent: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    handle: {
      paddingVertical: 3,
      paddingRight: 18,
      paddingLeft: 8
    },
    delete: {
      paddingLeft: 5,
    },
    dataContainer: {
      paddingRight: 10,
    },
    data: {
      textAlign: 'right',
      fontSize: theme.FONT_SIZE_SMALL,
      color: theme.PRIMARY_COLOR
    },
    subData: {
      textAlign: 'right',
      fontSize: theme.FONT_SIZE_SMALL,
      color: theme.SUBTITLE_COLOR,
    }
});