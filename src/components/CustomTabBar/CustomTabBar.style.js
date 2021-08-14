import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: theme.FOREGROUND_COLOR,
    height: 65,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    height: 40,
    width: 40,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  startButtonActive: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
  startButtonInactive: {
    backgroundColor: theme.SPECIAL_FOREGROUND_COLOR_LIGHT,
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
});
