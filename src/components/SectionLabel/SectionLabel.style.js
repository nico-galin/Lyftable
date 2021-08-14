import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  label: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontWeight: 'bold',
    color: theme.SUBTITLE_COLOR,
  },
  button: {
    backgroundColor: theme.SECONDARY_COLOR,
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 4,
  },
  buttonText: {
    color: theme.BACKGROUND_COLOR,
    fontWeight: 'bold',
    fontSize: theme.FONT_SIZE_SMALL,
    textAlign: 'center',
  },
});
