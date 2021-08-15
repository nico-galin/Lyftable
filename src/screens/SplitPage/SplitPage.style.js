import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  container: {},
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subsectionContainer: {
    marginTop: 10,
  },
  sectionDefiner: {
    width: 50,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: theme.BACKGROUND_COLOR,
    borderWidth: 2.5,
    borderColor: theme.CALENDAR_HIGHLIGHT_COLOR,
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionHeader: {
    color: theme.SUBTITLE_COLOR,
    fontWeight: 'bold',
  },
  sectionSubheader: {
    color: theme.PRIMARY_COLOR,
    fontWeight: 'bold',
    width: '90%',
  },
  sectionInfo: {
    paddingVertical: 10,
    paddingLeft: 10,
    width: 0,
    flexGrow: 1,
    flex: 1,
    height: '100%',
    backgroundColor: theme.CALENDAR_HIGHLIGHT_COLOR,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  creatorInfo: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  description: {
    paddingHorizontal: 25,
    marginBottom: 20,
    fontSize: theme.FONT_SIZE_SMALL,
    textAlign: 'center',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gap: {
    width: 10,
  },
});
