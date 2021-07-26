import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  button: {
    flexGrow: 1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_SMALL,
  },
  largeButton: {
    paddingVertical: 10,
  },
  skinnyButton: {
    paddingHorizontal: 0,
  },
  wideButton: {
    paddingHorizontal: 20,
  },
});