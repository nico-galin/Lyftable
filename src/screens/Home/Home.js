import React from 'react';
import {ScrollView, View } from 'react-native';
import Header from '../../components/Header/Header';
import Calendar from '../../components/Calendar/Calendar';
import SectionLabel from '../../components/SectionLabel/SectionLabel';
import SplitList from '../../components/SplitList/SplitList';
import SplitPage from '../SplitPage/SplitPage';
import EditSplitPage from '../EditSplitPage/EditSplitPage';
import styles from './Home.style';
import { systemStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

const sampleSplitData = [
  {
    public: false,
    id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
    creator: {
      id: "12131231231232131231",
      name: "Nico Galin",
      profile_photo: "https://picsum.photos/300"
    },
    name: "Push",
    description: "Gnarly workout for those days you really just want to feel the pain.",
    exercises: [
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
    ],
    estimated_time: 100000200,
    subscribers: [
      {
        id: "12131231231232131231",
        name: "John Doe",
        profile_photo: "https://picsum.photos/300"
      },
      {
        name: "Jane Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
      },
      {
      },
      {
        name: "Don Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Graham Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      }
    ]
  },
  {
    public: false,
    id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
    creator: {
      name: "Nico Galin",
      profile_photo: "https://picsum.photos/200/200"
    },
    name: "Pull",
    description: "Gnarly workout for those days you really just want to feel the pain.",
    exercises: [
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
    ],
    estimated_time: 100000200,
    subscribers: [
      {
        id: "12131231231232131231",
        name: "John Doe",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Jane Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Adam Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
      },
      {
      },
      {
        name: "Don Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Ajay Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Graham Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      }
    ]
  },
  {
    public: false,
    id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
    creator: {
      name: "Nico Galin",
      profile_photo: "https://picsum.photos/200/200"
    },
    name: "Push Day",
    description: "Gnarly workout for those days you really just want to feel the pain.",
    exercises: [
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
    ],
    estimated_time: 100000200,
    subscribers: [
      {
        id: "12131231231232131231",
        name: "John Doe",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Jane Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
      },
      {
      },
      {
        name: "Don Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Graham Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      }
    ]
  },
  {
    public: false,
    id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
    creator: {
      name: "Nico Galin",
      profile_photo: "https://picsum.photos/200/200"
    },
    name: "Push Day",
    description: "Gnarly workout for those days you really just want to feel the pain.",
    exercises: [
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
    ],
    estimated_time: 100000200,
    subscribers: [
      {
        id: "12131231231232131231",
        name: "John Doe",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Jane Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
      },
      {
      },
      {
        name: "Don Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Graham Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      }
    ]
  },
  {
    public: false,
    id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
    creator: {
      name: "Nico Galin",
      profile_photo: "https://picsum.photos/200/200"
    },
    name: "Push Day",
    description: "Gnarly workout for those days you really just want to feel the pain.",
    exercises: [
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
    ],
    estimated_time: 100000200,
    subscribers: [
      {
        id: "12131231231232131231",
        name: "John Doe",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Jane Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
      },
      {
      },
      {
        name: "Don Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Graham Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      }
    ]
  },
  {
    public: false,
    id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
    creator: {
      name: "Nico Galin",
      profile_photo: "https://picsum.photos/200/200"
    },
    name: "Push Day",
    description: "Gnarly workout for those days you really just want to feel the pain.",
    exercises: [
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
    ],
    estimated_time: 100000200,
    subscribers: [
      {
        id: "12131231231232131231",
        name: "John Doe",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Jane Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
      },
      {
      },
      {
        name: "Don Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Graham Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      }
    ]
  },
  {
    public: false,
    id: "11212asdaskd09askd90asjd90asjddasdk0-asd",
    creator: {
      name: "Nico Galin",
      profile_photo: "https://picsum.photos/200/200"
    },
    name: "Push Day",
    description: "Gnarly workout for those days you really just want to feel the pain.",
    exercises: [
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
      {
        movement: "Chest Press",
        time_limit: 12312312,
        set_count: 4,
        repetitions: [10, 10, 10, 10],
        rest_time: 60000
      },
    ],
    estimated_time: 100000200,
    subscribers: [
      {
        id: "12131231231232131231",
        name: "John Doe",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Jane Doe",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
      },
      {
      },
      {
        name: "Don Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      },
      {
        name: "Graham Moyington",
        id: "12131231231232131231",
        profile_photo: "https://picsum.photos/200/200"
      }
    ]
  }
]

export const Home = ({ route }) => {
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
      </Stack.Navigator>
  );
};

const HomePage = (props) => {
  const navigation = useNavigation();
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Home'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={systemStyles.pageSection}>
          <SectionLabel label={'Calendar'}/>
          <Calendar />
        </View>
        <View style={systemStyles.pageSection}>
          <SectionLabel label={'Your Splits'} buttonLabel={'Add Split'} buttonOnPress={() => {}}/>
          <SplitList data={sampleSplitData} />
        </View>
      </ScrollView>
    </View>
  )
};