"use strict";

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStack } from '../routes/HomeStack';
import { AccountStack } from '../routes/AccountStack';
import { FriendsStack } from '../routes/FriendsStack';
import { Charts } from '../screens/Charts/Charts';
import { Start } from '../screens/Start/Start';
import { ActiveWorkout } from '../screens/ActiveWorkout/ActiveWorkout';
import { AddFriends } from '../modals/AddFriends/AddFriends';
import { AddExercise } from '../modals/AddExercise/AddExercise';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import { View, StatusBar } from 'react-native';
import theme from '../assets/theme.style';
import { useAppContext } from '../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';
import changeNavigationBarColor, { showNavigationBar } from "react-native-navigation-bar-color";
import { useActiveWorkoutContext } from '../contexts/ActiveWorkoutContext';

export const AppStack = () => {
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const Stack = createStackNavigator();
  const { setModalCallback, setOpenModal } = useAppContext();
  const { activeWorkoutID } = useActiveWorkoutContext();
  useEffect(() => {
    changeNavigationBarColor(theme.FOREGROUND_COLOR, true);
    StatusBar.setBackgroundColor(theme.BACKGROUND_COLOR);
    const openModal = (name, callback = () => {}) => {
      switch(name) {
        case 'AddExercise':
          setAddExerciseModalVisible(true);
          break;
        case 'AddFriends':
          setAddFriendModalVisible(true);
          break;
        default:
          console.log("[ERROR] Invalid Modal Name: " + name);
          return;
      }
      setModalCallback(() => callback);
    };
    setOpenModal(() => openModal);
  }, [])
  return (
    <View style={{flex: 1}}>
      <AddExercise isVisible={addExerciseModalVisible} setVisibility={setAddExerciseModalVisible} />
      <AddFriends isVisible={addFriendModalVisible} setVisibility={setAddFriendModalVisible} />
      <Stack.Navigator initialRouteName={activeWorkoutID ? "ActiveWorkout" : "Main"} screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
        <Stack.Screen name={"Main"} component={MainNavigator}/>
        <Stack.Screen name={"ActiveWorkout"} component={ActiveWorkout}/>
      </Stack.Navigator>
    </View>
  );
};

const MainNavigator = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator tabBar={props => <CustomTabBar {...props} initialRouteName={"Home"}/>} >
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Charts" component={Charts} />
      <Tabs.Screen name="Start" component={Start} />
      <Tabs.Screen name="Friends" component={FriendsStack} />
      <Tabs.Screen name="Account" component={AccountStack} />
    </Tabs.Navigator>
  )
}