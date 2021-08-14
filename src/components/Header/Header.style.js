import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: theme.FONT_SIZE_HEADER,
    fontWeight: 'bold',
    color: theme.PRIMARY_COLOR,
  },
  subtitle: {
    textAlign: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  rightBtn: {
    position: 'absolute',
    borderRadius: 8,
    right: 0,
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  leftBtn: {
    position: 'absolute',
    borderRadius: 8,
    top: 0,
    bottom: 0,
    left: 0,
    marginBottom: 8,
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  otherBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.FONT_SIZE_TINY,
    marginHorizontal: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
