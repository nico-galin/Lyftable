import React, { useState, useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens/Home/Home';
import {Charts} from '../screens/Charts/Charts';
import {Start} from '../screens/Start/Start';
import {Friends} from '../screens/Friends/Friends';
import {Account} from '../screens/Account/Account';
import { AddFriends } from '../Modals/AddFriends/AddFriends';
import { AddExercise } from '../Modals/AddExercise/AddExercise';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import { View, StatusBar } from 'react-native';
import theme from '../assets/theme.style';
import { useAppContext } from '../contexts/AppContext';


export const AppStack = () => {
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const Tabs = createBottomTabNavigator();
  const context = useAppContext();

  useEffect(() => {
    const openModal = (name, callback = () => {}) => {
      switch(name) {
        case 'AddExercise':
          setAddExerciseModalVisible(true);
          break;
        case 'AddFriends':
          setAddFriendModalVisible(true);
          break;
        default:
          console.log("Invalid Modal Name: " + name);
          return;
      }
      context.setModalCallback(() => callback);
    };
    context.setOpenModal(() => openModal);
  }, [])

  return (
    <View style={{flex: 1}}>
        <StatusBar
          animated={false}
          barStyle={'dark-content'}
          backgroundColor={theme.BACKGROUND_COLOR}
          hidden={false} 
        />
        <AddExercise isVisible={addExerciseModalVisible} setVisibility={setAddExerciseModalVisible} />
        <AddFriends isVisible={addFriendModalVisible} setVisibility={setAddFriendModalVisible} />
        <Tabs.Navigator tabBar={props => <CustomTabBar {...props} initialRouteName={"Home"}/>}>
          <Tabs.Screen name="Home" component={Home} />
          <Tabs.Screen name="Charts" component={Charts} />
          <Tabs.Screen name="Start" component={Start} />
          <Tabs.Screen name="Friends" component={Friends} />
          <Tabs.Screen name="Account" component={Account} />
        </Tabs.Navigator>
    </View>
  );
};