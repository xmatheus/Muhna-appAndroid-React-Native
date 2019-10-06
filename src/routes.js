// stacknavigator changed for createBottomTabNavigator
import React from 'react';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createAppContainer} from 'react-navigation';

import Icon from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import main from './rotas/routeNews';

import visita from './rotas/routeVisita';

import games from './pages/games';

const tabs = createBottomTabNavigator(
  {
    News: {
      screen: main,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="newsletter" color={tintColor} size={24} />
        ),
      }),
    },
    visita: {
      screen: visita,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <IconAnt name="qrcode" color={tintColor} size={24} />
        ),
      }),
    },
    jogos: {
      screen: games,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="game-controller" color={tintColor} size={24} />
        ),
      }),
    },
  },
  // eslint-disable-next-line no-undef
  (navigationOptions = {
    tabBarOptions: {
      activeTintColor: 'rgb(255,255,255)',
      inactiveTintColor: 'rgb(0,0,0)', // 'rgb(15, 10, 1)', rgb(25, 13, 1)
      style: {
        backgroundColor: 'rgb(50, 25, 1)',
      },
      showLabel: false,
    },
  }),
);

const App = createAppContainer(tabs);

export default App;
