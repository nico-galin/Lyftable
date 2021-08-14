import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';
import theme from '../../assets/theme.style';

const styles = StyleSheet.create({
  container: {
    paddingBottom:
      Platform.OS === 'android'
        ? Dimensions.get('screen').height -
          Dimensions.get('window').height -
          StatusBar.currentHeight
        : 0,
  },
});

export { styles };
