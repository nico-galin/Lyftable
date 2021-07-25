import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    userCardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    profilePhoto: {
      width: 35,
      height:35,
      borderRadius: 17.5,
      marginRight: 10,
    },
    userName: {
      color: theme.PRIMARY_COLOR
    },
    addFriendButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10 ,
      backgroundColor: theme.SECONDARY_COLOR,
    },
    border: {
      height: 1,
      backgroundColor: theme.CALENDAR_HIGHLIGHT_COLOR
    }
});