import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {

    },
    sectionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10
    },
    subsectionContainer: {
      marginTop: 10
    },
    sectionDefiner: {
      width: 50,
      height: '100%',
      borderRadius: 12,
      marginRight: 10,
      backgroundColor: theme.SPECIAL_FOREGROUND_COLOR_DARK,
      alignItems: 'center',
      paddingVertical: 15
    },
    sectionHeader: {
      color: theme.SUBTITLE_COLOR,
      fontWeight: 'bold',
    },
    sectionSubheader: {
      color: theme.PRIMARY_COLOR,
      fontWeight: 'bold',
      width: '90%',
    },
    sectionInfo: {
      paddingVertical: 10,
      width: 0,
      flexGrow: 1,
      flex: 1,
    },
    description: {
      paddingHorizontal: 25,
      marginBottom: 20,
      fontSize: theme.FONT_SIZE_SMALL,
      textAlign: 'center'
    },
    creatorImage: {
      height: 50,
    },
    buttonRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    gap: {
      width: 10
    },

});