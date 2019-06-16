import React, { PureComponent } from 'react';

import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ToastAndroid, Image, TouchableHighlight } from 'react-native';

import QRCodeScanner from "react-native-qrcode-scanner";

import Dialog, { DialogTitle, DialogContent, SlideAnimation, } from 'react-native-popup-dialog';

import routeNews from '../rotas/routeNews';



export default class pages extends PureComponent {
	
	constructor(props) {
		super(props)
	}
	state = {
		success:false,
		visible:true,
		onPop:false,
		data:''
	}
	onSuccess = async (e)=>{
		await this.setState({success:true, data:e.data})
		
	}

	componentDidMount() {
		const { navigation } = this.props;
		
		navigation.addListener('willFocus', () =>
			this.setState({ focusedScreen: true })
		);
		navigation.addListener('willBlur', () =>
			this.setState({ focusedScreen: false })
		);
		setTimeout(()=>{
			this.setState({onPop:true})
		},400)
			
	  }
	
	componentWillUnmount() {
		this.focusListener.remove()
	}

	acessar=()=>{
		this.setState({success:false})
		ToastAndroid.show(this.state.data,ToastAndroid.SHORT)
		this.scanner.reactivate()
	}

	allrender = ()=>{
		const isFocused = this.props.navigation.isFocused();
		// console.warn("De novo")
		if (!isFocused) {
			return null
		} else if (isFocused) {
			return (
				<View style={styles.container}>
					
					<QRCodeScanner
						onRead={ this.onSuccess}
						showMarker={false}
						checkAndroid6Permissions={true}
						cameraStyle={styles.cameraContainer}
						ref={ (elem) => { this.scanner=elem }}
					/>

					{this.state.onPop && (
						<View style = {styles.PopContainer}>  
							<Dialog
								visible={this.state.visible}
								onTouchOutside={() => {
									this.setState({ visible: false });
								}}
								dialogAnimation={new SlideAnimation({
									slideFrom: 'bottom',
								})}
								dialogTitle={<DialogTitle title="Como usar?" />}
							>
								<DialogContent >
									<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
										<Text>
											Aponte a câmera para o QR code de algum item do acervo
									</Text>
										<Image
											style={{ height: 400, width: 200 }}
											source={uri = require('../image/exemplo.png')}
										>
										</Image>
										<TouchableHighlight
											style={styles.popButton}
											onPress={() => {
												this.setState({ visible: false })
											}}
										>
											<Text
												style={styles.text}
											>Fechar</Text>
										</TouchableHighlight>
									</View>
								</DialogContent>
								
							</Dialog>
						</View>
						
					)}

					{this.state.success && (
						<View style={styles.teste}>
							<View>
								<Text style={styles.text}>{this.state.data}</Text>
							</View>
							<TouchableOpacity
								style={styles.productButton}
								onPress={this.acessar}
							>
								<Text style={styles.text}>
									Acessar
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			)
		}
	}

	renderCamera= ()=>{
		const { hasCameraPermission, focusedScreen } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else if (focusedScreen){
			return (this.allrender())
		} else {
			return <View />;
		}
	}
		   
	render() {
		return(
			<View style={styles.containerGeral}>
				{this.renderCamera()}	
			</View>
		)
	}
}

const styles = StyleSheet.create({
	containerGeral: {
		flex: 1,
	},

	PopContainer:{
		height:Dimensions.get('window').height * 0.8,
		width:Dimensions.get('window').width * 0.9,
	},

	teste:{
		flex:1,
		height:Dimensions.get('window').height * 0.1,
		width:Dimensions.get('window').width * 0.3,
		justifyContent:'center',
		alignItems:'center'
	},

	modal:{
		height:Dimensions.get('window').height * 0.4,
		width:Dimensions.get('window').width * 0.7,
	},

	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		justifyContent: 'center',
		alignItems: 'center'
	},

	touchable: {
	  padding: 16
	},

	text: {
		fontSize: 21,
	  	color: "rgb(255,255,255)"
	},
  
	cameraContainer: {  
	  flex:1
	},

	productButton:{
        borderRadius:5,
        borderWidth:1,
        borderColor:'#000000',
        backgroundColor:'rgb(45, 20, 7)',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5

	},
	
	cameraContainer: {
		height: Dimensions.get('window').height,
	},

	popButton:{
		// height:35,
		// width:75,
        borderRadius:5,
        borderWidth:2,
        borderColor:'rgb(255, 255, 255)',
        backgroundColor:'#4d2600',
        justifyContent:'center',
		alignItems:'center',
		padding:3,
        marginTop:20

	}
  
});