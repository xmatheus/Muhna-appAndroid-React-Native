import { createStackNavigator } from "react-navigation";
import Main from "../pages/homePag";
import pag from "../pages/newsPag";
import pagina from "../pages/postPage";

export default createStackNavigator(
	{
		Home: Main,
		pag,
		visitaGuiada: {
			screen: pagina,
			navigationOptions: () => ({
				headerVisible: true
			})
		}
	},
	{
		// headerMode: 'none',
		navigationOptions: {
			headerVisible: true,
			headerStyle: {
				backgroundColor: "#fff",
				elevation: 5,
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
				color: "#321a01", //'#4d2800',
				flex: 1,
				paddingLeft: 40,
				justifyContent: "flex-end"
			},
			headerTintColor: "#000"
		}
	}
);
