import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
  header: {
    width: "100%",
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
    marginVertical: "auto",
},
exerciseClosedContainer: {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 1,
  padding: 14,
  borderColor: theme.SUBTITLE_COLOR,
  borderWidth: 1,
  borderRadius: 12,
},
exerciseRightContent: {
  flexDirection: "row",
  alignItems: "center"
},
exercisePlayBtn: {
  marginLeft: 14,
},
exerciseTime: {
  color: theme.SUBTITLE_COLOR,
  fontSize: theme.FONT_SIZE_SMALL
},
exerciseName: {
  color: theme.SUBTITLE_COLOR,
  fontWeight: "bold",
  fontSize: theme.FONT_SIZE_SMALL
},
exerciseProgress: {
  color: theme.SUBTITLE_COLOR,
  fontSize: theme.FONT_SIZE_SMALL
}
});