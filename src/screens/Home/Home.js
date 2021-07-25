import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/Header';
import Calendar from '../../components/Calendar/Calendar';
import SectionLabel from '../../components/SectionLabel/SectionLabel';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SplitPage from '../SplitPage/SplitPage';
import EditSplitPage from '../EditSplitPage/EditSplitPage';
import AddSplitPage from '../AddSplitPage/AddSplitPage';
import styles from './Home.style';
import { systemStyles } from '../../assets/styles';
import theme from '../../assets/theme.style';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import { msToHM } from '../../services/utilities';

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
        <Stack.Screen name="AddSplit" component={AddSplitPage}/>
      </Stack.Navigator>
  );
};

const HomePage = (props) => {
  let splits = useAppContext().userData.splits;
  if (!splits) splits = {};
  const navigation = useNavigation();
  const generateSubscriberRow = (subs) => {
    let pfpSubs = subs.filter(sub => sub.profile_photo)
    if (pfpSubs.length >= 3) {
      pfpSubs = pfpSubs.slice(0, 3);
    }
    return (
      <View style={styles.subscribers}>
        {pfpSubs.map((sub, ind) => (
          <View key={'sub' + ind} style={styles.subscriberWrapper}>
            <Image style={styles.subscriber} source={{uri: sub.profile_photo}} />
          </View>
        ))}
        {subs.length - pfpSubs.length > 0 &&
          <View style={styles.subscriberWrapper}>
            <View style={styles.extraSubscribers}>
              <Text style={styles.extraSubscribersText}>+{Math.min(99, subs.length - pfpSubs.length)}</Text>
            </View>
          </View>
        }
      </View>
    )
  }
  const numSplits = Object.keys(splits).length;
  return (
    <View style={systemStyles.pageContainer}>
      <Header title={'Home'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={systemStyles.pageSection}>
          <SectionLabel label={'Calendar'}/>
          <Calendar />
        </View>
        <View style={systemStyles.pageSection}>
          <SectionLabel label={'Split Collection'} buttonLabel={'Add Split'} buttonOnPress={() => navigation.navigate('AddSplit')}/>
          <View>
            {numSplits <= 0 ?
              <Text style={styles.noSplitsText}>You don't have any splits yet!</Text>
            :
              <View>
                {Object.entries(splits).map(([id, split], ind) => (
                  <View key={ind}>
                    <TouchableOpacity style={styles.split} onPress={() => navigation.navigate('SplitPage', { data: split, inCollection: true })}>
                      <View style={styles.description}>
                        <Text style={styles.title}>{split ? split.name : ""}</Text>
                        <Text style={styles.exerciseLength}>{split.exercises.length} Exercises</Text>
                      </View>
                      <View style={styles.action}>
                        {generateSubscriberRow(split.subscribers)}
                        <Text style={styles.timeEstimate}>{msToHM(split.estimated_time)}</Text>
                        <FeatherIcon name={'chevron-right'} size={20} color={theme.SUBTITLE_COLOR}/>
                      </View>
                    </TouchableOpacity>
                    {ind != numSplits - 1 && <View style={styles.border} />}
                  </View>
                ))}
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
};