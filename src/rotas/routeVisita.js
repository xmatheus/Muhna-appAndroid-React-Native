import {createStackNavigator} from 'react-navigation-stack';
import Main from '../pages/visitaQr';

export default createStackNavigator({
  VisitaHome: {
    screen: Main,
    navigationOptions: () => ({
      headerVisible: false,
      headerMode: 'none',
    }),
  },
});
