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
    fontWeight: "bold",
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
  moreBR: {
    borderRadius: 13
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  }
});