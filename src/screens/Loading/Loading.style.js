import { StyleSheet } from 'react-native';
import theme from '../../assets/theme.style';

const styles = StyleSheet.create({
    label: {
      fontSize: theme.FONT_SIZE_LARGE,
      color: theme.BACKGROUND_COLOR,
      fontWeight: "bold",
      textAlign: "center",
      letterSpacing: 0.8
    },
});

export { styles };