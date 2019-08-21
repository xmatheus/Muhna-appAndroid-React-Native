import { createStackNavigator } from "react-navigation";
import Main from "../pages/visitaQr";

export default createStackNavigator({
	VisitaHome: {
		screen: Main,
		navigationOptions: () => ({
			headerVisible: false,
			headerMode: "none"
		})
	}
});
