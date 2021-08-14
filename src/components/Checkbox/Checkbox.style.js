import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderWidth: 0,
    backgroundColor: theme.SECONDARY_COLOR,
  },
  active: {
    borderWidth: 2,
    borderColor: theme.SECONDARY_COLOR,
  },
  inactive: {
    borderWidth: 2,
    borderColor: theme.SUBTITLE_COLOR,
  },
});
