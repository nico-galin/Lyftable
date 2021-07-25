import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffe2ff'
      },
      title: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 20,
        fontWeight: '500',
        color: '#7f78d2'
      },
      button: {
        flexDirection: 'row',
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        width: 160,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#481380'
      },
      buttonText: {
        color: '#ffe2ff',
        fontSize: 24,
        marginRight: 5
      }
});