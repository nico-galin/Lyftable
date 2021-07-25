import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
        paddingHorizontal: 30
    },
    title: {
        fontSize: theme.FONT_SIZE_HEADER,
        fontWeight: "bold",
        color: theme.PRIMARY_COLOR
    },
    backBtn: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        marginBottom: 8,
        justifyContent: 'center',
        marginVertical: "auto",
    },
    rightBtn: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        marginBottom: 8,
        justifyContent: 'center',
        marginVertical: "auto",
    }
});