import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import DeckList from './Home/components/DeckList'
import DeckDetails from './DeckDetail/components/DeckDetails'
import DecksReducer from './Home/reducers/DecksReducer'
import NewDeck from './Home/components/NewDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import NewCard from './DeckDetail/components/NewCard';
import QuizDeck from './DeckDetail/components/QuizDeck';
import QuizResults from './DeckDetail/components/QuizResults';
import { setLocalNotification } from './utils/notification'

const RootStack = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: `Deck List`,
    }),
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('title', 'Deck Details Screen'),
    }),
  },
  newDeck: {
    screen: NewDeck,
    navigationOptions: ({ navigation }) => ({
      title: 'New Deck',
    }),
  },
  newCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      title: 'New Card',
    }),
  },
  quiz: {
    screen: QuizDeck,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
    }),
  },
  quizResults: {
    screen: QuizResults,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz Results',
    }),
  }
}, {
    initialRouteName: 'DeckList',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});

let Navigation = createAppContainer(RootStack);

// Render the app container component with the provider around it
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(DecksReducer)}>
        <Navigation />
      </Provider>
    );
  }
}
