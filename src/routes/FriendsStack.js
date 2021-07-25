import React from 'react';
import { FriendsList } from '../screens/FriendsList/FriendsList';
import { FriendsActivity } from '../screens/FriendsActivity/FriendsActivity';
import { createStackNavigator } from '@react-navigation/stack';

export const FriendsStack = ({ route }) => {
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
        <Stack.Screen name="FriendsActivity" component={FriendsActivity}/>
        <Stack.Screen name="FriendsList" component={FriendsList}/>
      </Stack.Navigator>
  );
};