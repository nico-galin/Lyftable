import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
        position: 'relative',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: theme.SPECIAL_FOREGROUND_COLOR_DARK
    },
    monthCarousel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    monthCarouselLeftBtn: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'flex-start',
    },
    monthCarouselRightBtn: {
        flex: 1,
        paddingRight: 10,
        alignItems: 'flex-end',
    },
    monthText: {
        color: theme.BACKGROUND_COLOR,
        fontSize: theme.FONT_SIZE_SMALL,
        fontWeight: 'bold'
    },
    calendar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    column: {
        alignItems: 'center',
    },
    heading: {
        color: theme.BACKGROUND_COLOR,
        fontSize: theme.FONT_SIZE_TINY,
        fontWeight: 'bold',
    },
    day: {
        color: theme.SUBTITLE_COLOR,
        fontSize: theme.FONT_SIZE_TINY,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    monthDay: {
        color: theme.BACKGROUND_COLOR,
        fontSize: theme.FONT_SIZE_TINY,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    today: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: theme.SECONDARY_COLOR
    },
    future: {
        borderRadius: 6,
        backgroundColor: theme.CALENDAR_HIGHLIGHT_COLOR
    },
    plainDay: {
        width: '100%',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingTop: 4,
        paddingBottom: 13,
        marginTop: 5,
    },
    missedDay: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 4,
        paddingBottom: 5,
        marginTop: 5,
    },
    scheduledDay: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 4,
        paddingBottom: 5,
        marginTop: 5,
    },
    completedDay: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 4,
        paddingBottom: 5,
        marginTop: 5,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    key: {
        display: 'flex',
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },
    keyElement: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    keyText: {
        color: theme.BACKGROUND_COLOR,
        fontWeight: 'bold',
        fontSize: theme.FONT_SIZE_TINY,
        marginLeft: 3,
        marginRight: 20
    },
    missedCircle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        borderColor: theme.SUBTITLE_COLOR,
        borderWidth: 2,
    },
    scheduledCircle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.SUBTITLE_COLOR
    },
    completedCircle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.SECONDARY_COLOR
    },
    buttonSection: {
        flex: 3,
    },
    button: {
        backgroundColor: theme.BACKGROUND_COLOR,
        borderRadius: 6,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    buttonText: {
        color: theme.SPECIAL_FOREGROUND_COLOR_DARK,
        fontWeight: 'bold',
        fontSize: theme.FONT_SIZE_SMALL,
        textAlign: 'center'
    }
});