/* eslint-disable react/prefer-stateless-function */
// "https://muhna-api.herokuapp.com/file/video?filename=42b787cd912302a5b2997e5d7262927f.mp4"

import React, {Component} from 'react';

import {View, Dimensions, FlatList, TouchableOpacity} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

import Icon from 'react-native-vector-icons/AntDesign';

// import { Container } from './styles';

const dm = {
	height: Dimensions.get('window').height * 0.4,
	width: Dimensions.get('window').width,
};

export default class MeuVideo extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		url: [],
		max: 0,
		pos: 0,
	};

	//renderiza o video player
	renderItem = ({item}) => (
		<VideoPlayer
			style={{
				width: dm.width,
				backgroundColor: '#000',
			}}
			source={{
				uri: item.url,
			}}
			disableVolume={true}
			disableBack={true}
			paused={true}
			videoStyle={{backgroundColor: '#000'}}
		/>
	);

	componentDidMount = () => {
		//pega as urls dos videos
		const {navigation} = this.props;
		const item =
			this.props.videoSource ||
			navigation.getParam('videoSource', 'no-name');

		if (item != (undefined || null)) {
			this.setState({url: item});
			this.setState({pos: 0, max: item.length - 1});
		}
	};

	proximo = () => {
		//funcao para trocar os videos
		if (this.flatList != (undefined || null)) {
			if (this.state.pos === this.state.max) {
				this.setState({pos: 0});
			} else {
				this.setState({pos: this.state.pos + 1});
			}
			this.flatList.scrollToIndex({
				animated: true,
				index: this.state.pos,
			});
		}
	};

	anterior() {
		//funcao para trocar os videos
		if (this.flatList != (undefined || null)) {
			if (this.state.pos === 0) {
				this.setState({pos: this.state.max});
			} else {
				this.setState({pos: this.state.pos - 1});
			}
			this.flatList.scrollToIndex({
				animated: true,
				index: this.state.pos,
			});
		}
	}

	verifica = () => {
		//se tem mais que um video, ele add setas para controle de qual deseja ser visto
		if (
			this.state.url !== (undefined || null) &&
			this.state.url.length > 1
		) {
			return (
				<View style={{flex: 1, flexDirection: 'row'}}>
					<TouchableOpacity
						onPress={() => this.anterior()}
						style={{width: 50}}>
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
				style={{
					flex: 1,
					paddingVertical: 50,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 20,
				}}>
				<View style={{height: dm.height, borderRadius: 20}}>
					<FlatList
						horizontal={true}
						ref={ref => {
							this.flatList = ref;
						}}
						showsHorizontalScrollIndicator={true}
						data={this.state.url}
						keyExtractor={item => item._id}
						renderItem={this.renderItem}
						scrollEnabled={false}
					/>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					{this.verifica()}
				</View>
			</View>
		);
	};
}
