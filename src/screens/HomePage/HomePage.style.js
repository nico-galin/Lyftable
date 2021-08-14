import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
  },
  pageContainerFake: {
    marginHorizontal: 10,
  },
  noSplitsText: {
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 5,
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.PRIMARY_COLOR,
  },
  split: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 20,
    paddingRight: 10,
  },
  title: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
  },
  exerciseLength: {
    color: theme.SUBTITLE_COLOR,
    fontSize: theme.FONT_SIZE_TINY,
    fontWeight: 'bold',
  },
  subscribers: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
  },
  subscriber: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  extraSubscribers: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.PLACEHOLDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraSubscribersText: {
    fontSize: theme.FONT_SIZE_TINY,
    fontWeight: 'bold',
    color: theme.BACKGROUND_COLOR,
  },
  subscriberWrapper: {
    width: 28,
    height: 28,
    margin: -6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: theme.BACKGROUND_COLOR,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeEstimate: {
    color: theme.SUBTITLE_COLOR,
    fontSize: theme.FONT_SIZE_TINY,
    marginRight: 5,
  },
  border: {
    height: 1,
    marginLeft: 20,
    backgroundColor: theme.CALENDAR_HIGHLIGHT_COLOR,
  },
});
