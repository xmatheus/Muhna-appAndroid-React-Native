/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';

import {
	View,
	StatusBar,
	StyleSheet,
	Dimensions,
	Text,
	ProgressBarAndroid,
	ToastAndroid,
	Image,
	TouchableHighlight,
	Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import Dialog, {
	DialogTitle,
	DialogContent,
	SlideAnimation,
} from 'react-native-popup-dialog';

import LottieView from 'lottie-react-native';

import api from '../services/api';
export default class pages extends PureComponent {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
	}

	state = {
		sucesso: false,
		onScreen: false,
		visible: true,
		onPop: false,
		data: '',
	};

	onSucesso = async e => {
		//conseguiu let o qrcode ele vai salvar os dados
		await this.setState({data: e.data});
		this.filtraDados(e.data);
	};

	// UNSAFE_componentWillMount = () => {
	// 	//ta saindo ele fecha o popup
	// 	this.setState({visible: false});
	// };

	componentDidMount = () => {
		const {navigation} = this.props;

		navigation.addListener('willFocus', () => {
			// entrando na tela
			this.setState({focusedScreen: true});
			setTimeout(() => {
				this.setState({onScreen: true});
			}, 600);
			setTimeout(() => {
				this.setState({onPop: true});
			}, 2000);
		});
		navigation.addListener('willBlur', () => {
			// saindo da tela
			this.setState({
				onScreen: false,
				visible: false,
				focusedScreen: false,
			});
		});

		// setTimeout(() => {
		// 	//depois de 5s ele fecha o popup
		// 	this.setState({visible: false});
		// }, 8250);
	};

	changeLink = link => {
		const correctLink = link.map(olink => {
			console.log('links', olink);
			if (olink.link.includes('watch?v=')) {
				//link no formato errado, precisa arrumar
				console.log('arrumar', olink);
				const a = olink.link.split('watch?v=');
				olink.link = `https://www.youtube.com/embed/${a[1]}`;
				console.log('certo', olink);
				return olink;
			} else if (olink.link.includes('embed')) {
				// link no formato correto
				console.log('embed', olink);
				return olink;
			} else {
				//link errado nao sei arrumar :|
			}
		});

		return correctLink;
	};

	loadFile = async docs => {
		//busca todos os arquivos das postagens

		let resposta = await api.get('/filePost/post?postid=' + docs._id + '');
		let data = resposta.data;

		const {image, video, link} = data;

		const imageSource = image.map(data => {
			return {
				url:
					api.defaults.baseURL +
					'/filePost/image?filename=' +
					data.filename +
					'',
			};
		});

		const videoSource = video.map(data => {
			return {
				url:
					api.defaults.baseURL +
					'/filePost/video?filename=' +
					data.filename +
					'',
				_id: data._id,
			};
		});

		docs.imageSource = imageSource;

		if (link !== undefined && link !== null) {
			const embedLink = this.changeLink(link);
			docs.videoSource = [...videoSource, ...embedLink]; //juntando os dois
		} else {
			docs.videoSource = videoSource;
		}

		this.setState({visible: false}); //fechando o popup antes que fique bugado

		this.props.navigation.navigate('visitaGuiada', {item: docs});
		// this.proximaPagina(docs);
	};

	buscaDados = async id => {
		//busca a postagem
		try {
			const response = await api.get(`post?postid=${id}`);

			const {docs} = response.data;
			this.loadFile(docs);
		} catch (error) {
			ToastAndroid.show(
				'not connected to the internet',
				ToastAndroid.SHORT,
			);
		}
	};

	filtraDados = dados => {
		//se tiver id no qrcode, ele vai abrir a postagem. Se for #url, ele abre o navegador
		if (dados.startsWith('#id=')) {
			const id = dados.split('#id=')[1]; //quebra a string e pega apenas o ID do item
			ToastAndroid.show('Sucesso :)', ToastAndroid.SHORT);
			this.buscaDados(id);
		} else if (dados.startsWith('#url=')) {
			const url = dados.split('#url=')[1]; //quebra a string e pega apenas oa url
			Linking.openURL(url);
			this.scanner.reactivate();
		} else {
			ToastAndroid.show(
				'QR CODE invalido. Você está no MuHNA?',
				ToastAndroid.SHORT,
			);
			this.scanner.reactivate();
		}
	};

	allrender = () => {
		//toda essa funcao para o qrcode funcionar direito, ele precisa ser 'reiniciado' toda vez que a tela eh focada
		const isFocused = this.props.navigation.isFocused();

		if (!isFocused) {
			this.setState({visible: false});
			return null;
		} else if (isFocused) {
			//code renderizado
			return (
				<View style={styles.container}>
					<QRCodeScanner
						onRead={this.onSucesso}
						showMarker={false}
						checkAndroid6Permissions={true}
						cameraStyle={styles.cameraContainer}
						ref={elem => {
							this.scanner = elem;
						}}
					/>

					<Dialog
						visible={this.state.visible}
						onTouchOutside={() => {
							this.setState({visible: false});
						}}
						dialogAnimation={
							new SlideAnimation({
								slideFrom: 'bottom',
							})
						}
						dialogTitle={<DialogTitle title="Como usar?" />}>
						<DialogContent>
							<View
								style={{
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Text>
									Aponte a câmera para o QR code de algum item
									do acervo
								</Text>
								{/* <Image
									style={{height: 400, width: 200}}
									source={
										(uri = require('../image/exemplo.png'))
									}
								/> */}
								<LottieView
									style={{height: 400, width: 200}}
									resizeMode="contain"
									source={require('../assets/animation.json')}
									autoPlay
									loop
								/>
								<TouchableHighlight
									style={styles.popButton}
									onPress={() => {
										this.setState({visible: false});
									}}>
									<Text style={styles.text}>Fechar</Text>
								</TouchableHighlight>
							</View>
						</DialogContent>
					</Dialog>
				</View>
			);
		}
	};

	renderCamera = () => {
		//funcao para corrigir bug da camera de nao renderizar
		const {hasCameraPermission, focusedScreen} = this.state;
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
			// parte do codigo para evitar um delay na troca de tela, ele vem pra visita guiada e mostra uma progress bar antes de mostrar o qrcode scanner
			<View style={styles.containerGeral}>
				<StatusBar backgroundColor="white" barStyle="dark-content" />
				{!this.state.onScreen ? (
					<ProgressBarAndroid
						styleAttr="Horizontal"
						color="#2196F3"
					/>
				) : (
					<>{this.renderCamera()}</>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerGeral: {
		flex: 1,
	},

	PopContainer: {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},

	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},

	touchable: {
		padding: 16,
	},

	text: {
		fontSize: 21,
		color: 'rgb(255,255,255)',
	},

	productButton: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#000000',
		backgroundColor: 'rgb(45, 20, 7)',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},

	cameraContainer: {
		height: Dimensions.get('window').height,
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
		marginTop: 20,
	},
});
