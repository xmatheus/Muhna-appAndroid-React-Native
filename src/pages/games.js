/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';

import {View, StyleSheet, Text} from 'react-native';

import LottieView from 'lottie-react-native';
import {useScreens} from 'react-native-screens';

// import { Container } from './styles';

export default class pages extends Component {
	render() {
		return (
			<View style={styles.containerGeral}>
				<Text style={styles.title}>Em desenvolvimento</Text>
				<LottieView
					style={{height: 400, width: 200}}
					resizeMode="contain"
					source={require('../assets/maintenance.json')}
					autoPlay
					loop
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerGeral: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#000',
	},
});
