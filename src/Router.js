import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SeriesScreen from './pages/SeriesScreen';
import SerieDetailScreen from './pages/SerieDetailScreen';
import NewSerieScreen from './pages/NewSerieScreen';
import LoginScreen from './pages/LoginScreen';


console.disableYellowBox = true;

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Bem vindo',
    },
  },
  'NewSerieScreen': {
    screen: NewSerieScreen,
    navigationOptions: ({navigation}) => {
        if(navigation.state.params && navigation.state.params.serieToEdit) {
          return {
            title: navigation.state.params.serieToEdit.title
          }
        }

        return {
          title: 'Nova série'
        };
    }
  },
  'Main': {
    screen: SeriesScreen
  },
  'SerieDetail': {
    screen: SerieDetailScreen,
    navigationOptions: ({navigation}) => {
      const { serie } = navigation.state.params;
      return {
        title: serie.title
      }
    }
  },

  
}, {
  defaultNavigationOptions: {
    title: "Minhas series",
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#003994',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

