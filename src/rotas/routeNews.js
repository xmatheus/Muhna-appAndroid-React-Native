import {createStackNavigator} from 'react-navigation-stack';
import Main from '../pages/homePag';
import pag from '../pages/newsPag';
import pagina from '../pages/postPage';
import MeuVideo from '../pages/vide';

export default createStackNavigator(
	{
		Home: {
			screen: Main,
			navigationOptions: () => ({
				headerVisible: true,
				headerTitleStyle: {
					color: '#321a01', // '#4d2800',
					flex: 1,
					flexDirection: 'column',
					marginLeft: 50,
					marginTop: 15,
				},
			}),
		},
		pag,
		visitaGuiada: {
			screen: pagina,
			navigationOptions: () => ({
				headerVisible: true,
			}),
		},
		videos: {
			screen: MeuVideo,
			navigationOptions: () => ({
				headerVisible: true,
			}),
		},
	},
	{
		// headerMode: 'none',
		navigationOptions: {
			headerVisible: true,
			headerStyle: {
				backgroundColor: '#fff',
				elevation: 5,
				shadowColor: '#000000',
				shadowOpacity: 0.9,
				shadowRadius: 2,
				shadowOffset: {
					height: 5,
					width: 1,
				},
			},
			headerTitleStyle: {
				textAlign: 'center',
				color: '#321a01', // '#4d2800',
				flex: 1,
				marginLeft: 40,
				justifyContent: 'center',
			},
			headerTintColor: '#000',
		},
	},
);
