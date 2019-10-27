import React, {Component} from 'react';
import api from '../services/api';
import {
	View,
	Text,
	StatusBar,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Image,
	ToastAndroid,
	Dimensions,
	PixelRatio,
	ScrollView,
} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Slideshow from './components/Slideshow';
import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-community/async-storage';

const widthPercentageToDP = widthPercent => {
	const screenWidth = Dimensions.get('window').width;
	return PixelRatio.roundToNearestPixel(
		(screenWidth * parseFloat(widthPercent)) / 100,
	);
};

const heightPercentageToDP = heightPercent => {
	const screenHeight = Dimensions.get('window').height;
	return PixelRatio.roundToNearestPixel(
		(screenHeight * parseFloat(heightPercent)) / 100,
	);
};

const ActionBarImage = () => {
	//logo do museu na action bar
	return (
		<View>
			<Image
				style={styles.Image}
				// eslint-disable-next-line no-undef
				source={(uri = require('../assets/logo.png'))}
			/>
		</View>
	);
};
export default class Main extends Component {
	static navigationOptions = {
		title: 'Muhna notícias',
		headerLeft: <ActionBarImage />,
	};
	constructor(props) {
		super(props);
		this.loadNews();
	}

	state = {
		docs: [],
		lenghResume: 225,
		visible: false,
		page: 1,
		pageInfo: {},
		refreshing: false,
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
		//busca todos os arquivos de noticias
		const doc = await Promise.all(
			docs.map(async file => {
				let resposta = await api.get(
					'/fileNews/news?newsid=' + file._id + '',
				);
				let data = resposta.data;

				const {image, video, link} = data;

				const imageSource = image.map(data => {
					return {
						url:
							api.defaults.baseURL +
							'/fileNews/image?filename=' +
							data.filename +
							'',
					};
				});

				const videoSource = video.map(data => {
					return {
						url:
							api.defaults.baseURL +
							'/fileNews/video?filename=' +
							data.filename +
							'',
						_id: data._id,
					};
				});

				file.imageSource = imageSource;

				// console.log('\n\nLINK->', link);
				// console.log('\n\nVideo->', videoSource);
				if (link !== undefined && link !== null) {
					const embedLink = this.changeLink(link);
					file.videoSource = [...videoSource, ...embedLink]; //juntando os dois
				} else {
					file.videoSource = videoSource;
				}

				return file;
			}),
		);
		if (this.state.page <= 2) {
			await AsyncStorage.setItem('docs', await JSON.stringify(doc)); //caso fique sem net, ele salva o ultimo estado
		}

		this.setState({docs: doc}, () => {
			this.setState({visible: true});
		});
	};

	loadOnePageProduct = async () => {
		//quando puxa a pag para baixo ele busca uma pag para ver se teve alteracao
		try {
			const response = await api.get(`/news/show?page=${1}`);
			const {docs, ...pageInfo} = response.data;
			this.setState({pageInfo});
			this.loadFile(docs);
		} catch (error) {
			//se deu erro, pega do async storage e tira o skeleton
			const otherDocs = await JSON.parse(
				await AsyncStorage.getItem('docs'),
			);
			if (otherDocs !== null) {
				this.setState({visible: true});
				this.setState({docs: otherDocs});
				ToastAndroid.show(
					'not connected to the internet',
					ToastAndroid.SHORT,
				);
			} else {
				ToastAndroid.show(
					'not connected to the internet',
					ToastAndroid.SHORT,
				);
			}
		}
	};

	loadNews = async (page = 1) => {
		//req das noticias utilizando a API
		try {
			const response = await api.get(`/news/show?page=${page}`);
			const {docs, ...pageInfo} = response.data;
			this.setState({pageInfo});
			const alldocs = [...this.state.docs, ...docs];
			this.loadFile(alldocs);
		} catch (error) {
			//se deu erro, pega do async storage e tira o skeleton
			const otherDocs = await JSON.parse(
				await AsyncStorage.getItem('docs'),
			);
			if (otherDocs !== null) {
				this.setState({visible: true});
				this.setState({docs: otherDocs});
				ToastAndroid.show(
					'not connected to the internet',
					ToastAndroid.SHORT,
				);
			} else {
				ToastAndroid.show(
					'not connected to the internet',
					ToastAndroid.SHORT,
				);
			}
		}
	};

	loadMore = () => {
		//quando chega no final ele busca mais noticia
		const {page, pageInfo} = this.state;
		this.setState({refreshing: true});
		if (page === pageInfo.pages) {
			this.setState({refreshing: false});
			return;
		} else if (page < pageInfo.pages) {
			const pageNumber = page + 1;

			this.setState({page: pageNumber});
			this.loadNews(pageNumber);
		}

		setTimeout(() => {
			this.setState({refreshing: false});
		}, 3000);
	};

	verifylenght = (frase = ' ') => {
		//corta a frase do resumo a uma quantidade de caracteres definidos

		if (frase.length > this.state.lenghResume) {
			return frase.slice(0, this.state.lenghResume) + '...';
		}
		return frase;
	};

	verifyListImage = lista => {
		//verifica se tem image. Caso nao, ele adiciona um logo padrao para todas a noticia(toque de beleza)
		if (lista.length === 0) {
			const a = [1];
			a[0] = {url: require('../assets/muhna-ref.jpg')};
			return a;
		}
		return lista;
	};

	renderItem = (
		{item}, //rendereiza os items baixados da API
	) => (
		<Animatable.View
			animation="fadeIn"
			duration={2500}
			useNativeDriver={true}>
			<View style={styles.productContainer}>
				<Text style={styles.productTitle}>{item.title || ' '}</Text>
				<View style={styles.container2}>
					<Slideshow
						dataSource={this.verifyListImage(item.imageSource)}
						qtdImage={item.imageSource.length}
					/>
				</View>
				<Text style={styles.productDescription}>
					{this.verifylenght(item.resume) || ' '}
				</Text>
				<TouchableOpacity
					style={styles.productButton}
					onPress={() => {
						this.props.navigation.navigate('pag', {item: item});
					}}>
					<Text style={styles.productButtonText}>Acessar</Text>
				</TouchableOpacity>
			</View>
		</Animatable.View>
	);

	fakeLoad(qtd) {
		//skeleton para aliviar o stress do usuario com a demora do download

		if (this.state.visible === false) {
			const vetor = [];
			for (let i = 0; i < qtd; i++) {
				vetor.push(
					<View style={styles.productContainer} key={i.toString()}>
						<ShimmerPlaceHolder
							style={styles.productTitleFake}
							autoRun={true}
							visible={this.state.visible}>
							<Text style={styles.productTitle}>{}</Text>
						</ShimmerPlaceHolder>
						<ShimmerPlaceHolder
							style={styles.container2Fake}
							autoRun={true}
							visible={this.state.visible}>
							<View style={styles.container2} />
						</ShimmerPlaceHolder>
						<ShimmerPlaceHolder
							style={styles.productDescriptionFake}
							autoRun={true}
							visible={this.state.visible}>
							<Text style={styles.productDescription}>{} </Text>
						</ShimmerPlaceHolder>

						<TouchableOpacity
							style={styles.productButton}
							onPress={() => {}}>
							<Text style={styles.productButtonText}>
								Acessar
							</Text>
						</TouchableOpacity>
					</View>,
				);
			}

			return <ScrollView>{vetor}</ScrollView>;
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="white" barStyle="dark-content" />
				{this.fakeLoad(3)}
				<FlatList
					contentContainerStyle={styles.list}
					data={this.state.docs}
					keyExtractor={item => item._id}
					renderItem={this.renderItem}
					refreshing={this.state.refreshing}
					onRefresh={() => {
						// quando a pagina eh puxada para baixo ele carrega 10 noticias
						this.loadOnePageProduct();
					}}
					onEndReached={this.loadMore} // quando chega em 50% do fim ele chama a funcao loadMore
					onEndReachedThreshold={0.5}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d9d9d9',
	},
	container2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container2Fake: {
		justifyContent: 'center',

		borderRadius: 5,
		paddingTop: 5,
		width: widthPercentageToDP('95%'),
		height: heightPercentageToDP('35%'),
	},
	list: {
		// padding:20
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 2,
		paddingLeft: 2,
	},

	productContainer: {
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 5,
		padding: 5,
		marginBottom: 20,
		//shadow configs
		elevation: 4,
		shadowColor: '#000000',
		shadowOpacity: 0.8,
		shadowRadius: 3,
		shadowOffset: {
			height: 1,
			width: 1,
		},
	},
	animationBlock: {
		flex: 1,
	},
	productTitle: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#000', //'#333'
	},
	productTitleFake: {
		width: widthPercentageToDP('95%'),
		height: heightPercentageToDP('5%'),
	},
	productDescription: {
		fontSize: 16,
		textAlign: 'center',
		color: '#767474', //'#999',
		marginTop: 5,
		lineHeight: 24,
	},
	productDescriptionFake: {
		paddingTop: 5,
		width: widthPercentageToDP('95%'),
		height: heightPercentageToDP('13%'),
	},

	productButton: {
		height: 42,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#000000',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	productButtonFake: {
		paddingTop: 5,
		width: widthPercentageToDP('95%'),
		height: heightPercentageToDP('5%'),
		borderRadius: 5,
		borderColor: '#000000',
		backgroundColor: 'transparent',
	},
	productButtonText: {
		fontSize: 18,
		textAlign: 'center',
		color: '#000',
	},
	Image: {
		width: 95,
		height: 35,
	},
});
