// stacknavigator changed for createBottomTabNavigator
import React, { Component } from "react";

import { createBottomTabNavigator } from "react-navigation";

import main from "./rotas/routeNews";

import visita from "./rotas/routeVisita";

// import games from './pages/games'

import pages from "./pages/vide";

import Icon from "react-native-vector-icons/Entypo";

import IconAnt from "react-native-vector-icons/AntDesign";

export default createBottomTabNavigator(
	{
		News: {
			screen: main,
			navigationOptions: () => ({
				tabBarIcon: ({ tintColor }) => (
					<Icon name="newsletter" color={tintColor} size={24} />
				)
			})
		},
		visita: {
			screen: visita,
			navigationOptions: () => ({
				tabBarIcon: ({ tintColor }) => (
					<IconAnt name="qrcode" color={tintColor} size={24} />
				)
			})
		},
		jogos: {
			screen: pages,
			navigationOptions: () => ({
				tabBarIcon: ({ tintColor }) => (
					<Icon name="game-controller" color={tintColor} size={24} />
				)
			})
		}
	},
	(navigationOptions = {
		tabBarOptions: {
			activeTintColor: "rgb(255,255,255)",
			inactiveTintColor: "rgb(0,0,0)", //'rgb(15, 10, 1)', rgb(25, 13, 1)
			style: {
				backgroundColor: "rgb(50, 25, 1)"
			},
			showLabel: false
		}
	})
);
