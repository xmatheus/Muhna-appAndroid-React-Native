/* eslint-disable react/prefer-stateless-function */

/* vai ser a pag de jogos, mas por enquanto eh a de informacao :) */

import React, {Component} from 'react';

import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	Linking,
	TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import IconFontisto from 'react-native-vector-icons/Fontisto';

import LottieView from 'lottie-react-native';

const dm = {
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width,
};

// import { Container } from './styles';

export default class pages extends Component {
	componentDidMount = () => {
		this.play();
	};

	play = () => {
		this.animation.play();
	};

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
								fontWeight: 'bold',
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
							{/* <Icon
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'user-astronaut'}
							/> */}
							<LottieView
								style={{
									height: 25,
									width: 30,
									// marginRight: 10,
									// marginBottom: 5,
								}}
								resizeMode="contain"
								source={require('../assets/ninja.json')}
								// ref={animation => {
								// 	this.animation = animation;
								// }}
								autoPlay
								loop={true}
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
							{/* <IconFontisto
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'email'}
							/> */}
							<LottieView
								style={{
									height: 35,
									width: 28,
									// marginRight: 10,
									// marginBottom: 5,
								}}
								resizeMode="contain"
								source={require('../assets/mail.json')}
								// ref={animation => {
								// 	this.animation = animation;
								// }}
								autoPlay
								loop={true}
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
								fontWeight: 'bold',
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
							{/* <Icon
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'user-astronaut'}
							/> */}
							<LottieView
								style={{
									height: 25,
									width: 30,
									// marginRight: 10,
									// marginBottom: 5,
								}}
								resizeMode="contain"
								source={require('../assets/ninja.json')}
								// ref={animation => {
								// 	this.animation = animation;
								// }}
								autoPlay
								loop={true}
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
							<LottieView
								style={{
									height: 35,
									width: 28,
									// marginRight: 10,
									// marginBottom: 5,
								}}
								resizeMode="contain"
								source={require('../assets/mail.json')}
								// ref={animation => {
								// 	this.animation = animation;
								// }}
								autoPlay
								loop={true}
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
							{/* <Icon
								style={[{color: '#fafafa', marginRight: 10}]}
								size={19}
								name={'github'}
							/> */}
							<LottieView
								style={{
									height: 30,
									width: 28,
									marginRight: 5,
									// marginBottom: 5,
								}}
								resizeMode="contain"
								source={require('../assets/git.json')}
								// ref={animation => {
								// 	this.animation = animation;
								// }}
								autoPlay
								loop={true}
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
				<TouchableOpacity
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onPress={() => {
						this.play();
					}}>
					<LottieView
						style={{flex: 1, width: 200}}
						resizeMode="contain"
						source={require('../assets/urso.json')}
						ref={animation => {
							this.animation = animation;
						}}
						loop={true}
					/>
				</TouchableOpacity>
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
		marginTop: 50,
	},
});
