import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './Loading.style';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../assets/theme.style';
import { systemStyles, loaderStyles } from '../../assets/styles';
import changeNavigationBarColor, {
  hideNavigationBar,
} from 'react-native-navigation-bar-color';

export const Loading = () => {
  hideNavigationBar();
  return (
    <LinearGradient
      colors={[theme.SECONDARY_COLOR_LIGHT, theme.SECONDARY_COLOR]}
      style={[systemStyles.systemPageContainer, styles.container]}>
      <View style={loaderStyles.outerLoader}>
        <View style={loaderStyles.innerLoader}>
          <Image
            source={require('../../assets/logo.png')}
            style={loaderStyles.logo}
          />
        </View>
      </View>
      <Text style={loaderStyles.brandLabel}>Lyftable</Text>
    </LinearGradient>
  );
};
