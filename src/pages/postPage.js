import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	ScrollView,
	Linking,
	PixelRatio,
	ActivityIndicator,
} from 'react-native';

import HTML from 'react-native-render-html';

import IconAnt from 'react-native-vector-icons/AntDesign';

import IconMat from 'react-native-vector-icons/MaterialIcons';

import * as Animatable from 'react-native-animatable';

import ImageViewer from 'react-native-image-zoom-viewer';

import MeuVideo from './vide';

const dm = {
	height: Dimensions.get('window').height * 0.4,
	width: Dimensions.get('window').width,
};

Dimensions.addEventListener('change', dimensions => {
	dm.width = dimensions.window.width;
	dm.height = dimensions.window.height * 0.4;
});

export default class pagina extends Component {
	constructor(props) {
		super(props);
		const {navigation} = this.props;
		const item = navigation.getParam('item', 'no-name');

		//add um borderRadius em toda as imagens
		item.imageSource = item.imageSource.map(img => {
			img.props = {
				borderRadius: 10,
			};
			// img.width = dm.width
			return img;
		});

		const HTMLStyles = {
			img: {marginBottom: 10, marginTop: 10},
		};
		const defaultRenderer = {
			renderers: {
				img: (htmlAttribs, children, convertedCSSStyles, passProps) => (
					<Image
						key={passProps.key}
						style={{
							width: dm.width,
							height: dm.height,
						}}
						source={{uri: htmlAttribs.src}}
						resizeMode="contain"
					/>
				),
			},
		};

		//maneira de evitar um delay na hora de let o qrcode e renderizar  a tela
		setTimeout(() => {
			this.setState({
				view: (
					<View style={styles.container}>
						<Animatable.View
							animation="fadeInUp"
							duration={1000}
							useNativeDriver={true}
							// onAnimationEnd={() => {this.setState({visible:true})}}
						>
							<View style={styles.BarraTitulo}>
								<Text style={styles.tituloText}>
									{item.title}
								</Text>
								<View style={styles.containerIcon}>
									<View style={styles.iconTitle}>
										<IconAnt
											name="user"
											size={20}
											color="#0008"
										/>
										<Text style={styles.iconText}>
											{item.autor}
										</Text>
									</View>
									<View style={styles.iconTitle}>
										<IconMat
											name="date-range"
											size={20}
											color="#000"
										/>
										<Text style={styles.iconText}>
											{this.formatDate(item.createAt)}
										</Text>
									</View>
								</View>
							</View>
							<ScrollView style={styles.scroll}>
								<HTML
									html={'<div>' + item.post + '</div>'}
									onLinkPress={(evt, href) => {
										Linking.openURL(href);
									}}
									imagesMaxWidth={
										Dimensions.get('window').width
									}
									textSelectable={true}
									tagsStyles={HTMLStyles}
									{...defaultRenderer}
								/>

								{item.imageSource.length > 0 ? (
									<View>
										<View style={styles.slideImageTwo}>
											<Text style={styles.slideTitle}>
												Imagens
											</Text>
										</View>
										<View style={styles.slideImageOne}>
											<ImageViewer
												imageUrls={item.imageSource}
												backgroundColor={'#ffffff'}
												pageAnimateTime={250}
												menus={() => {}}
												enableSwipeDown={false}
												enablePreload={false}
												loadingRender={() => (
													<ActivityIndicator
														style={{
															justifyContent:
																'center',
															alignSelf: 'center',
														}}
														size="large"
														color="rgba(50, 25, 1,0.9)"
													/>
												)}
												renderIndicator={() => null}
												renderFooter={currentIndex => {
													if (currentIndex === -1) {
														//corrgindo um bug chato
														currentIndex = 0;
													}
													const allSize =
														item.imageSource
															.length - 1;
													return (
														<View
															style={{
																flex: 1,
																width: dm.width,

																justifyContent:
																	'center',
																alignItems:
																	'center',
															}}>
															<Text
																style={{
																	textAlign:
																		'center',
																	color:
																		'rgb(255, 0 , 0)',
																}}>
																{`${currentIndex}/${allSize}`}
															</Text>
														</View>
													);
												}}
											/>
										</View>
									</View>
								) : null}
								{item.videoSource.length > 0 ? (
									<View
										style={{
											paddingTop: 30,
											alignItems: 'center',
										}}>
										<Text style={styles.slideTitle}>
											Vídeos
										</Text>
										<MeuVideo
											videoSource={item.videoSource}
										/>
									</View>
								) : null}
								<View style={{height: dm.height * 0.5}} />
							</ScrollView>
						</Animatable.View>
					</View>
				),
			});
			this.setState({visible: false});
		}, 1);
	}
	static navigationOptions = ({navigation}) => {
		return {
			title: navigation.getParam('name', ''),
			textAlign: 'center',
		};
	};
	state = {
		visible: true,
	};

	formatDate(frase) {
		return frase.slice(0, 10);
	}

	render() {
		return <View style={styles.container}>{this.state.view}</View>;
	}
}

const tagsStyles = {
	p: {
		textAlign: 'justify',
	},
	strong: {
		textAlign: 'justify',
	},
	l1: {
		textAlign: 'justify',
	},
	h1: {
		textAlign: 'center',
	},
	h2: {
		textAlign: 'center',
	},
	h3: {
		textAlign: 'center',
	},
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	scroll: {
		flexGrow: 10,
		flexDirection: 'column',
		paddingLeft: 5,
		paddingRight: 5,
	},

	BarraTitulo: {
		flexGrow: 1,
		width: '100%',
		justifyContent: 'flex-end',

		borderRadius: 4,
		marginBottom: 1,
		shadowColor: '#000000',
		shadowOffset: {
			height: 3,
			width: 5,
		},
		shadowRadius: 5,
		shadowOpacity: 0.9,
		elevation: 3,
	},

	tituloText: {
		fontSize: 25 / PixelRatio.getFontScale(),
		textAlign: 'center',
		color: '#000',
		paddingBottom: 25,
		// paddingBottom:10,
	},

	containerIcon: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		paddingBottom: 20,
		paddingLeft: 2,
		// borderBottomColor:'#000',
		// borderBottomWidth: 1,
		// marginBottom: 1,
	},

	iconTitle: {
		flexDirection: 'row',
		// alignItems: 'flex-end',
		justifyContent: 'flex-start',
		borderRadius: 5,
	},

	iconText: {
		color: '#000',
		textAlignVertical: 'bottom',
	},
	slideImageOne: {
		height: dm.height, //Dimensions.get('window').height * 0.4,
		width: '100%', //Dimensions.get('window').width,
		backgroundColor: '#ffff',
	},
	slideImageTwo: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffff',
		// marginBottom: 20,
	},

	slideTitle: {
		fontSize: 25,
		paddingBottom: 10,
		color: '#000',
	},
});
