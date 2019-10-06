// stacknavigator changed for createBottomTabNavigator
import React from 'react';

import {View} from 'react-native';

// import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {createAppContainer} from 'react-navigation';

import Icon from 'react-native-vector-icons/Entypo';

import IconAnt from 'react-native-vector-icons/AntDesign';

import main from './rotas/routeNews';

import visita from './rotas/routeVisita';

import games from './pages/games';

const tabs = createMaterialBottomTabNavigator(
	{
		News: {
			screen: main,

			navigationOptions: {
				tabBarLabel: ' ',
				tabBarIcon: ({tintColor}) => (
					<View>
						<Icon
							style={[{color: tintColor}]}
							size={25}
							name={'newsletter'}
						/>
					</View>
				),
				activeColor: '#ffff',
				inactiveColor: 'rgba(255,255,255,0.4)',
				barStyle: {backgroundColor: 'rgba(50, 25, 1,0.9)'},
			},
		},
		visita: {
			screen: visita,
			navigationOptions: {
				tabBarLabel: ' ',
				tabBarIcon: ({tintColor}) => (
					<View>
						<IconAnt
							style={[{color: tintColor}]}
							size={25}
							name={'qrcode'}
						/>
					</View>
				),
				activeColor: '#000',
				inactiveColor: 'rgba(0,0,0,0.3)',
				barStyle: {backgroundColor: 'rgba(555, 555, 555,0.9)'},
			},
		},
		jogos: {
			screen: games,
			navigationOptions: {
				tabBarLabel: ' ',
				tabBarIcon: ({tintColor}) => (
					<View>
						<Icon
							style={[{color: tintColor}]}
							size={25}
							name={'game-controller'}
						/>
					</View>
				),
				activeColor: '#ffff',
				inactiveColor: 'rgba(255,255,255,0.3)',
				barStyle: {backgroundColor: 'rgb(0, 128, 0)'},
			},
		},
	},
	{
		initialRouteName: 'News',
		shifting: true,
	},
);

const App = createAppContainer(tabs);

export default App;
