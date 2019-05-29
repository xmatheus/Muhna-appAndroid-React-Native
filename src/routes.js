import { createStackNavigator} from 'react-navigation';
// import {Image} from 'react-native'

// import Main from './pages/main.js';
import Main from './pages/mainPlaceHolder';
import pag from './pages/Pagnews'

export default createStackNavigator({
    Home:Main,
    pag
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#fff",
            elevation:5,
            shadowColor: "#000000",
            shadowOpacity: 0.9,
            shadowRadius: 2,
            shadowOffset: {
                height: 5,
                width: 1
            }
        },
        headerTitleStyle: {
            textAlign: "left",
            color: 	'#321a01',//'#4d2800',
            flex: 1,
            paddingLeft:40
        },
        headerTintColor: "#000"
    },
});