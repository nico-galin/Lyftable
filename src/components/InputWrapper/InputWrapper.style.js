import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  container: {
    marginBottom: 6,
    width: '100%',
  },
  outline: {
    position: 'relative',
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.SUBTITLE_COLOR,
    borderRadius: 12,
    padding: 12,
  },
  invalidOutline: {
    borderColor: theme.RED,
    borderWidth: 1,
  },
  invalidLabel: {
    color: theme.RED,
    fontWeight: 'bold',
  },
  invalidSecondaryLabel: {
    color: theme.RED,
  },
  invalidReason: {
    color: theme.RED,
    fontWeight: 'normal',
  },
  label: {
    position: 'absolute',
    backgroundColor: theme.BACKGROUND_COLOR,
    color: theme.SUBTITLE_COLOR,
    paddingHorizontal: 10,
    borderRadius: 5,
    top: -12,
    left: 20,
  },
  secondaryLabel: {
    position: 'absolute',
    backgroundColor: theme.BACKGROUND_COLOR,
    color: theme.SUBTITLE_COLOR,
    paddingHorizontal: 10,
    borderRadius: 5,
    top: -12,
    right: 20,
  },
});
