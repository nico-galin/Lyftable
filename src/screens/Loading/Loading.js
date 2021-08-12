import React, { useEffect } from 'react';
import { StatusBar, Text, View, Image } from 'react-native';
import { styles } from './Loading.style';
import { useAuth } from '../../contexts/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../assets/theme.style';
import { systemStyles, loaderStyles } from '../../assets/styles';

export const Loading = () => {
  const auth = useAuth();

  return (
    <LinearGradient colors={[theme.SECONDARY_COLOR_LIGHT, theme.SECONDARY_COLOR]} style={systemStyles.systemPageContainer}>
        <View style={loaderStyles.outerLoader}>
          <View style={loaderStyles.innerLoader}>
            <Image source={require("../../assets/logo.png")} style={loaderStyles.logo}/>
          </View>
        </View>
        <Text style={styles.label}>Lyftable</Text>
    </LinearGradient>
  )
};