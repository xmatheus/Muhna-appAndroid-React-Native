/* eslint-disable react/prefer-stateless-function */

/* vai ser a pag de jogos, mas por enquanto eh a de informacao :) */

import React, {Component} from 'react';

import {View, StyleSheet, Text, Dimensions, Linking} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import IconFontisto from 'react-native-vector-icons/Fontisto';

import LottieView from 'lottie-react-native';

const dm = {
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width,
};

// import { Container } from './styles';

export default class pages extends Component {
	render() {
		return (
			<View style={styles.containerGeral}>
				<View style={styles.about}>
					<Text style={styles.title}>
						Projeto digital do Museu de História Natural Do Araguaia
					</Text>
					<View>
						<Text
							style={{
								textAlign: 'left',
								color: '#ffff',
								paddingBottom: 7,
							}}>
							Orientador:
						</Text>
						<View
							style={{
								width: dm.width * 0.6,
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 10,
								marginLeft: 15,
							}}>
							<Icon
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'user-astronaut'}
							/>
							<Text style={{color: '#fff'}}>
								Ivairton Monteiro Santos
							</Text>
						</View>

						<View
							style={{
								width: dm.width * 0.6,
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 20,
								marginLeft: 15,
							}}>
							<IconFontisto
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'email'}
							/>
							<Text style={{color: '#fff'}}>
								ivairton@ufmt.br
							</Text>
						</View>

						<Text
							style={{
								textAlign: 'left',
								color: '#ffff',
								paddingBottom: 7,
							}}>
							Orientando:
						</Text>
						<View
							style={{
								width: dm.width * 0.6,
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 5,
								marginLeft: 15,
							}}>
							<Icon
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'user-astronaut'}
							/>
							<Text style={{color: '#fff'}}>
								Matheus Felipe T. Correia
							</Text>
						</View>
						<View
							style={{
								width: dm.width * 0.6,
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 20,
								marginLeft: 15,
							}}>
							<IconFontisto
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'email'}
							/>
							<Text style={{color: '#fff'}}>
								matheuscorreia559@gmail.com
							</Text>
						</View>

						<View
							style={{
								width: dm.width * 0.6,
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<Icon
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'github'}
							/>
							<Text
								style={{
									color: '#f4f4f4',
									fontWeight: 'bold',
								}}
								onPress={() =>
									Linking.openURL(
										'https://github.com/xmatheus/Muhna-reactNative',
									)
								}>
								Clique aqui para abrir o repositório
							</Text>
						</View>
					</View>
				</View>
				<LottieView
					style={{height: 400, width: 200}}
					resizeMode="contain"
					source={require('../assets/urso.json')}
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
		fontSize: 15,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 15,
	},
	about: {
		padding: 5,
		paddingTop: 10,
		backgroundColor: '#4d2600',
		borderRadius: 4,
		width: dm.width * 0.8,
	},
});
