import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

export default StyleSheet.create({
    wrapper: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.FOREGROUND_COLOR,
        borderRadius: 10,
        paddingRight: 5,

    },
    textInput: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 4,
        color: theme.PRIMARY_COLOR,
        fontWeight: 'bold'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        maxHeight: 35,
        minWidth: 35
    },
    buttonText: {
        fontWeight: 'bold',
        paddingHorizontal: 20
    }
});