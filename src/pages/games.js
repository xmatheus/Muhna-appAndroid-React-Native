/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';

import {View, StyleSheet, Image, Text} from 'react-native';

// import { Container } from './styles';

export default class pages extends Component {
	render() {
		return (
			<View style={styles.containerGeral}>
				<Text style={styles.title}>Em desenvolvimento</Text>
				<Image
					style={styles.image}
					source={require('../image/logoDefault.png')}
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
