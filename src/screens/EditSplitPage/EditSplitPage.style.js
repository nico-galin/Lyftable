import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {

    },
    description: {
      flex: 1,
      minHeight: 100
    },
    estimatedTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    centeredText: {
      textAlign: 'center',
      marginTop: 3,
      fontSize: theme.FONT_SIZE_SMALL
    },
    addExerciseBtnContainer: {
      justifyContent: 'flex-end'
    },
    spacer: {
      height: 10,
    },
    bottomSpacer: {
      height: 100,
    }
});