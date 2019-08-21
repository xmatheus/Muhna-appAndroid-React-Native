import React, { PureComponent } from 'react';

import {
	View,
	StatusBar,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
	ToastAndroid,
	Image,
	TouchableHighlight
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog';

import api from '../services/api';
// import console = require('console');

export default class pages extends PureComponent {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
	}

	state = {
		sucesso: false,
		visible: true,
		onPop: false,
		data: ''
	};
	onSucesso = async (e) => {
		await this.setState({ data: e.data });
		this.acessar();
	};

	componentDidMount = () => {
		const { navigation } = this.props;

		navigation.addListener('willFocus', () => this.setState({ focusedScreen: true }));
		navigation.addListener('willBlur', () => this.setState({ focusedScreen: false }));
		setTimeout(() => {
			this.setState({ onPop: true });
		}, 400);

		setTimeout(() => {
			this.setState({ visible: false });
		}, 5000);
	};

	componentWillUnmount() {
		this.focusListener.remove();
	}

	//   loadImage = async docs => {
	//     // console.error("AQUI", docs)

	//     let resposta = await api.get("/file/news?newsid=" + docs._id + "");
	//     let data = resposta.data;

	//     const { image } = data;

	//     const dataSource = image.map(data => {
	//       return {
	//         url: api.defaults.baseURL + "/file/image?filename=" + data.filename + ""
	//       };
	//     });

	//     docs.imageSource = dataSource;

	//     this.proximaPagina(docs);
	//   };

	buscaDados = async (id) => {
		try {
			const response = await api.get(`post?postid=${id}`);

			const { docs, ...pageInfo } = response.data;
			// ToastAndroid.show(docs,ToastAndroid.SHORT)
			this.props.navigation.navigate('visitaGuiada', { item: docs });
		} catch (error) {
			//se deu erro, pega do async storage e tira o skeleton
			// const otherDocs = await JSON.parse(await AsyncStorage.getItem('docs'))
			ToastAndroid.show('not connected to the internet', ToastAndroid.SHORT);
		}
		// this.scanner.reactivate();
	};

	filtraDados = (dados) => {
		if (dados.startsWith('#id=')) {
			const id = dados.split('#id=')[1]; //quebra a string e pega apenas o ID do item
			ToastAndroid.show('Sucesso :)', ToastAndroid.SHORT);
			this.buscaDados(id);
		} else {
			ToastAndroid.show('QR CODE invalido. Você está no MuHNA?', ToastAndroid.SHORT);
		}
	};

	acessar = () => {
		// this.setState({ sucesso: false });
		// ToastAndroid.show(this.state.data,ToastAndroid.SHORT)
		this.filtraDados(this.state.data);
	};

	allrender = () => {
		const isFocused = this.props.navigation.isFocused();
		// console.warn("De novo")
		if (!isFocused) {
			return null;
		} else if (isFocused) {
			return (
				<View style={styles.container}>
					<QRCodeScanner
						onRead={this.onSucesso}
						showMarker={false}
						checkAndroid6Permissions={true}
						cameraStyle={styles.cameraContainer}
						ref={(elem) => {
							this.scanner = elem;
						}}
					/>

					{this.state.onPop && (
						<View style={styles.PopContainer}>
							<Dialog
								visible={this.state.visible}
								onTouchOutside={() => {
									this.setState({ visible: false });
								}}
								dialogAnimation={
									new SlideAnimation({
										slideFrom: 'bottom'
									})
								}
								dialogTitle={<DialogTitle title="Como usar?" />}
							>
								<DialogContent>
									<View
										style={{
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<Text>Aponte a câmera para o QR code de algum item do acervo</Text>
										<Image
											style={{ height: 400, width: 200 }}
											source={(uri = require('../image/exemplo.png'))}
										/>
										<TouchableHighlight
											style={styles.popButton}
											onPress={() => {
												this.setState({ visible: false });
											}}
										>
											<Text style={styles.text}>Fechar</Text>
										</TouchableHighlight>
									</View>
								</DialogContent>
							</Dialog>
						</View>
					)}

					{this.state.sucesso && (
						<View style={styles.teste}>
							<TouchableOpacity style={styles.productButton} onPress={this.acessar}>
								<Text style={styles.text}>Acessar</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			);
		}
	};

	renderCamera = () => {
		const { hasCameraPermission, focusedScreen } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>Não foi possivel acessar a câmera</Text>;
		} else if (focusedScreen) {
			return this.allrender();
		} else {
			return <View />;
		}
	};

	render() {
		return (
			<View style={styles.containerGeral}>
				<StatusBar backgroundColor="white" barStyle="dark-content" />
				{this.renderCamera()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerGeral: {
		flex: 1
	},

	PopContainer: {
		height: Dimensions.get('window').height * 0.8,
		width: Dimensions.get('window').width * 0.9
	},

	teste: {
		flex: 1,
		height: Dimensions.get('window').height * 0.1,
		width: Dimensions.get('window').width * 0.3,
		justifyContent: 'center',
		alignItems: 'center'
	},

	modal: {
		height: Dimensions.get('window').height * 0.4,
		width: Dimensions.get('window').width * 0.7
	},

	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},

	touchable: {
		padding: 16
	},

	text: {
		fontSize: 21,
		color: 'rgb(255,255,255)'
	},

	cameraContainer: {
		flex: 1
	},

	productButton: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#000000',
		backgroundColor: 'rgb(45, 20, 7)',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5
	},

	cameraContainer: {
		height: Dimensions.get('window').height
	},

	popButton: {
		// height:35,
		// width:75,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: 'rgb(255, 255, 255)',
		backgroundColor: '#4d2600',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 3,
		marginTop: 20
	}
});
