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
  systemPageContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    paddingTop: 200
  },
  pageSection: {
    marginBottom: 10
  },
  bottomSpacer: {
    height: 80,
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
  },
});

const loaderStyles = StyleSheet.create({
  outerLoader: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  innerLoader: {
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  logo: {
    width: 80,
    height: 80
  }
});

export { systemStyles, loaderStyles };