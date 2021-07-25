import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.FOREGROUND_COLOR,
      height:65,
      paddingHorizontal: 20,
      justifyContent:"center",
      alignItems:"center"
    },
    startButton: {
      height: 42,
      width: 42,
      borderRadius: 21,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    startButtonActive: {
      backgroundColor: theme.SECONDARY_COLOR
    },
    startButtonInactive: {
      backgroundColor: theme.PRIMARY_COLOR
    },
    buttonStyle: {
      flex: 1,
      alignItems:"center",
      paddingVertical: 15
    }
});