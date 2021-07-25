import React from 'react';
import { AccountPage } from '../screens/AccountPage/AccountPage';
import { createStackNavigator } from '@react-navigation/stack';

export const AccountStack = ({ route }) => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator initialRouteName={"FriendsActivity"} screenOptions={{
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
        <Stack.Screen name="AccountPage" component={AccountPage}/>
      </Stack.Navigator>
  );
};