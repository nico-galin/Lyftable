import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './CustomTabBar.style';
import theme from '../../assets/theme.style';

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
          >
            <View style={styles.buttonStyle}>
              {route.name === "Home" && 
                <FoundationIcon name={'home'} size={25} color={isFocused ? theme.SECONDARY_COLOR : theme.SUBTITLE_COLOR}/>
              }
              {route.name === "Charts" &&
                <MaterialIcon name={'bar-chart'} size={27} color={isFocused ? theme.SECONDARY_COLOR : theme.SUBTITLE_COLOR}/>
              }
              {route.name === "Start" &&
                <View style={[styles.startButton, isFocused ? styles.startButtonActive : styles.startButtonInactive]}>
                  <FeatherIcon name={'plus'} size={22} color={theme.BACKGROUND_COLOR}/>
                </View>
              }
              {route.name === "Friends" &&
                <MaterialIcon name={'people'} size={27} color={isFocused ? theme.SECONDARY_COLOR : theme.SUBTITLE_COLOR}/>
              }
              {route.name === "Account" &&
                <MaterialIcon name={'person'} size={27} color={isFocused ? theme.SECONDARY_COLOR : theme.SUBTITLE_COLOR}/>
              }
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}