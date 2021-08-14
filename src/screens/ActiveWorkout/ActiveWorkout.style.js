import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 30,
  },
  infoBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    marginBottom: 8,
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  inputWrapperWrapper: {
    marginBottom: 6,
  },
  exerciseClosedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 14,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  exerciseUnfinished: {
    borderColor: theme.SUBTITLE_COLOR,
  },
  exerciseFinished: {
    backgroundColor: theme.SECONDARY_COLOR_FADED,
    borderColor: 'transparent',
  },
  exerciseRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exercisePlayBtn: {
    height: '100%',
    paddingLeft: 14,
    justifyContent: 'center',
  },
  exerciseFinishedText: {
    color: theme.PRIMARY_COLOR,
  },
  exerciseUnfinishedText: {
    color: theme.SUBTITLE_COLOR,
  },
  exerciseTime: {
    fontSize: theme.FONT_SIZE_SMALL,
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: theme.FONT_SIZE_SMALL,
  },
  exerciseProgress: {
    fontSize: theme.FONT_SIZE_SMALL,
  },
  exTableHeading: {
    color: theme.SUBTITLE_COLOR,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  exTableValue: {
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    alignSelf: 'stretch',
    paddingVertical: 10,
  },
  exTableInput: {
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  exRow: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  exSetColumn: {
    flex: 0.8,
    paddingLeft: 3,
  },
  exPrevColumn: {
    flex: 2,
  },
  exLbsColumn: {
    flex: 2,
  },
  exRepsColumn: {
    flex: 2,
  },
  exProgressColumn: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  setContainer: {
    backgroundColor: theme.FOREGROUND_COLOR,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  setContainerDone: {
    backgroundColor: theme.SECONDARY_COLOR_FADED,
  },
  setContainerActive: {
    borderColor: theme.SECONDARY_COLOR,
  },
  input: {
    backgroundColor: theme.CALENDAR_HIGHLIGHT_COLOR,
    padding: 0,
    marginHorizontal: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
});

const swipeListStyles = StyleSheet.create({
  rowBack: {
    flex: 1,
    display: 'flex',
    marginBottom: 11,
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  delete: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: theme.RED,
  },
  delText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export { styles, swipeListStyles };
