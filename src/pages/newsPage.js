/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	ScrollView,
	Linking,
	Image,
	PixelRatio,
	ActivityIndicator,
} from 'react-native';

import HTML from 'react-native-render-html';

import IconAnt from 'react-native-vector-icons/AntDesign';

import IconMat from 'react-native-vector-icons/MaterialIcons';

import ImageViewer from 'react-native-image-zoom-viewer';

import MeuVideo from './vide';

// import console = require('console');

const dm = {
	fullHeight: Dimensions.get('window').height,
	height: Dimensions.get('window').height * 0.4,
	width: Dimensions.get('window').width,
};

export default class extends React.Component {
	constructor(props) {
		super(props);
		const {navigation} = this.props;
		const item = navigation.getParam('item', 'no-name');

		//add um borderRadius em toda as imagens
		item.imageSource = item.imageSource.map(img => {
			img.props = {
				borderRadius: 10,
			};
			return img;
		});

		Dimensions.addEventListener('change', e => {
			console.warn(dm);
			dm.height = Dimensions.get('window').height * 0.4;
			dm.width = Dimensions.get('window').width;
			console.warn(dm);
		});

		/*  essa parte resolve um problema de resize nas imagens renderizadas no html */
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
						<View style={styles.BarraTitulo}>
							<Text style={styles.tituloText}>
								{item.title || ' '}
							</Text>
							<View style={styles.containerIcon}>
								<View style={styles.iconTitle}>
									<IconAnt
										name="user"
										size={20}
										color="#0008"
									/>
									<Text style={styles.iconText}>
										{item.autor || 'Muhna-user'}
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
								// html={'<div>' + item.news + '</div>'}
								html={item.news}
								tagsStyles={tagsStyles}
								onLinkPress={(evt, href) => {
									Linking.openURL(href);
								}}
								textSelectable={true}
								imagesMaxWidth={Dimensions.get('window').width}
								// imagesInitialDimensions={{
								// 	height: dm.height,
								// 	width: dm.width,
								// }}
								// eslint-disable-next-line react/jsx-no-duplicate-props
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
													item.imageSource.length - 1;
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
										paddingTop: 50,
										alignItems: 'center',
									}}>
									<Text style={styles.slideTitle}>
										Vídeos
									</Text>
									<MeuVideo videoSource={item.videoSource} />
								</View>
							) : null}
						</ScrollView>
						<View style={{height: 10}} />
					</View>
				),
			});
			this.setState({visible: false});
		}, 1);
	}

	onLayout = () => {
		dm.height = Dimensions.get('window').height * 0.4;
		dm.width = Dimensions.get('window').width;
	};

	static navigationOptions = ({navigation}) => {
		return {
			title: navigation.getParam('name', ''),
			textAlign: 'center',
		};
	};

	state = {
		visible: true,
	};

	onLayout(e) {
		this.setState({
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
		});
	}

	formatDate(frase) {
		return frase.slice(0, 10);
	}

	render() {
		return (
			<View style={styles.container} onLayout={this.onLayout}>
				{this.state.view}
			</View>
		);
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
		marginTop: 2,
		textAlign: 'center',
	},
	h2: {
		textAlign: 'center',
	},
	h3: {
		textAlign: 'center',
	},
	img: {
		width: 500,
		height: 500,
	},
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'flex-start',
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
		justifyContent: 'center',

		borderRadius: 4,
		marginBottom: 10,
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
		marginTop: 5,
		// paddingBottom: 25,
		// paddingBottom:10,
	},

	containerIcon: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		paddingBottom: 5,
		paddingLeft: 2,
	},

	iconTitle: {
		flexDirection: 'row',
		// alignItems: 'flex-end',
		justifyContent: 'flex-start',
		borderRadius: 5,
		marginLeft: 5,
		paddingBottom: 2,
	},

	iconText: {
		color: '#000',
		textAlignVertical: 'bottom',
	},

	slideImageOne: {
		// flexDirection:'column',
		// alignItems:'center',
		// justifyContent:'center',
		height: dm.height, //Dimensions.get('window').height * 0.4,
		width: '100%', //Dimensions.get('window').width,
		backgroundColor: '#ffff',
	},
	slideImageTwo: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffff',
	},

	slideTitle: {
		fontSize: 25,
		paddingBottom: 10,
		color: '#000',
	},

	botaoVideo: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		backgroundColor: '#472604',
		height: dm.height * 0.1,
		width: dm.width * 0.2,
	},

	abrirVideos: {
		fontSize: 9 / PixelRatio.getFontScale(),
		textAlign: 'center',
		color: '#fff',
	},
});
