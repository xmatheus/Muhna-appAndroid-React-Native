/* eslint-disable react/prefer-stateless-function */
// "https://muhna-api.herokuapp.com/file/video?filename=42b787cd912302a5b2997e5d7262927f.mp4"

import React, { Component } from 'react';

import {
	View,
	Text,
	Dimensions,
	ScrollView,
	FlatList,
	RefreshControl,
	TouchableOpacity
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

import Icon from 'react-native-vector-icons/AntDesign';

// import { Container } from './styles';

const dm = {
	height: Dimensions.get('window').height * 0.6,
	width: Dimensions.get('window').width
};

// {
// 	uri:
// 		'https://muhna-api.herokuapp.com/filePost/video?filename=7ed14ef173dcbcb78aeffc02f8078450.mp4',
// 	_id: '1'
// },
// {
// 	uri:
// 		'https://muhna-api.herokuapp.com/filePost/video?filename=f68b3ec4d803ef94b1068de8d669f4ba.mp4',
// 	_id: '2'
// }
export default class MeuVideo extends Component {
	constructor(props) {
		super(props);

		// this.verifica = this.verifica.bind(this);
		// this.proximo = this.proximo.bind(this);
		// this.anterior = this.anterior.bind(this);
	}
	state = {
		url: [],
		max: 0,
		pos: 0
	};
	multipleVideo = (item) => {
		const videos = [];
		if (item != (undefined || null) && item.length > 0) {
			let contador = 1;
			item.forEach((element) => {
				videos.push(
					<View
						style={{
							height: dm.height,
							width: dm.width,
							alignItems: 'center',
							alignContent: 'center'
						}}
					>
						<VideoPlayer
							source={{
								uri: element.uri
							}}
							navigator={() => {}}
							disableVolume={true}
							disableBack={true}
						/>
					</View>
				);
			});
			return videos;
		}
		return null;
	};

	renderItem = ({ item }) => (
		<VideoPlayer
			style={{ height: dm.height * 0.99, width: dm.width }}
			source={{
				uri: item.url
			}}
			navigator={() => {}}
			disableVolume={true}
			disableBack={true}
			paused={true}
			// onPlay={() => console.warn('pla')}
			// onPause={() => console.warn('pause')}
			// onPress={() => console.warn('Aeo')}
		/>
	);
	// _flatList = () => {};
	componentDidMount = () => {
		const { navigation } = this.props;
		const item = navigation.getParam('videoSource', 'no-name');

		if (item != (undefined || null)) {
			this.setState({ url: item });
			this.setState({ pos: 0, max: item.length - 1 });
		}
		// if (this.props.urlVideos != (undefined || null)) {
		// 	const item = this.props.urlVideos;
		// 	this.setState({ pos: 0, max: this.props.urlVideos.length - 1 });
		// 	this.setState({ url: item });
		// }
	};

	proximo = () => {
		if (this.flatList != (undefined || null)) {
			if (this.state.pos === this.state.max) {
				this.setState({ pos: 0 });
			} else {
				this.setState({ pos: this.state.pos + 1 });
			}
			this.flatList.scrollToIndex({ animated: true, index: this.state.pos });
		}
	};

	anterior() {
		if (this.flatList != (undefined || null)) {
			if (this.state.pos === 0) {
				this.setState({ pos: this.state.max });
			} else {
				this.setState({ pos: this.state.pos - 1 });
			}
			this.flatList.scrollToIndex({ animated: true, index: this.state.pos });
		}
	}

	verifica = () => {
		if (this.state.url != (undefined || null) && this.state.url.length > 1) {
			return (
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<TouchableOpacity onPress={() => this.anterior()} style={{ width: 50 }}>
						<Icon name="left" color={'#000'} size={40} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.proximo()}>
						<Icon name="right" color={'#000'} size={40} />
					</TouchableOpacity>
				</View>
			);
		} else {
			return null;
		}
	};

	render = () => {
		return (
			<View
				style={{ flex: 1, paddingVertical: 50, justifyContent: 'center', alignItems: 'center' }}
			>
				<View style={{ height: dm.height }}>
					<FlatList
						horizontal={true}
						ref={(ref) => {
							this.flatList = ref;
						}}
						showsHorizontalScrollIndicator={true}
						data={this.state.url}
						keyExtractor={(item) => item._id}
						renderItem={this.renderItem}
						scrollEnabled={false}
					/>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					{this.verifica()}
				</View>
			</View>
		);
	};
}
