import { StyleSheet } from 'react-native';
import theme from './theme.style';

const systemStyles = StyleSheet.create({
  pageMarginlessContainer: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
  },
  pageContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: theme.BACKGROUND_COLOR,
  },
  pageSection: {
    marginBottom: 10
  },
  bottomSpacer: {
    height: 100,
  },
  formSpacer: {
    height: 10,
  },
  buttonSpacer: {
    width: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  textInput: {
    margin: 0,
    padding: 0,
  }
});

export { systemStyles };