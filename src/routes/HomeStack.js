import React from 'react';
import { HomePage } from '../screens/HomePage/HomePage';
import { SplitPage } from '../screens/SplitPage/SplitPage';
import { EditSplitPage } from '../screens/EditSplitPage/EditSplitPage';
import { AddSplitPage } from '../screens/AddSplitPage/AddSplitPage';
import { createStackNavigator } from '@react-navigation/stack';

export const HomeStack = ({ route }) => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator initialRouteName={"HomePage"} screenOptions={{
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
        <Stack.Screen name="HomePage" component={HomePage}/>
        <Stack.Screen name="SplitPage" component={SplitPage}/>
        <Stack.Screen name="EditSplit" component={EditSplitPage}/>
        <Stack.Screen name="AddSplit" component={AddSplitPage}/>
      </Stack.Navigator>
  );
};