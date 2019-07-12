import { createStackNavigator} from 'react-navigation';
import Main from '../pages/visitaQr';
import pag from '../pages/newsPag'

export default createStackNavigator({
    Home:{
        screen: Main,
        navigationOptions: () => ({
            headerVisible: false,
            headerMode:'none',
        })
    },
    visita:{
        screen: pag,
        navigationOptions: () => ({
            headerVisible:true,
        })
    }
});