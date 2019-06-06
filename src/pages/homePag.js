import React, { Component} from 'react';
import api from '../services/api';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, AsyncStorage , ToastAndroid, Dimensions,PixelRatio, ScrollView } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';  
import Slideshow from './components/Slideshow'
import * as Animatable from 'react-native-animatable';



const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};

const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
return PixelRatio.roundToNearestPixel(screenHeight * parseFloat(heightPercent) / 100);
};


const ActionBarImage = () => { //logo do museu na action bar
    return(
        <Image
            style={styles.Image}
            source={uri=require('../image/logo.png')}
        >
            
        </Image>
    )
}
export default class Main extends Component{
    
    static navigationOptions = {
        title: "Muhna notícias",
        headerLeft: <ActionBarImage />,
    };
    constructor(props){
        super(props)
        this.loadProducts();
    }
    
    state = {
        docs: [],
        lenghResume:225,
        visible: false,
		page:1,
		pageInfo: {},
		refreshing:false

    };

    loadImage = async (docs) =>{
        // console.error("AQUI", docs)
        const doc = await Promise.all(docs.map(async (file) => {
            
            let resposta = await api.get('/image/news?newsid='+file._id+'');
            let data = resposta.data

            
            const dataSource = data.map((data) => {
                return {url:api.defaults.baseURL+'/image/name?filename='+data.filename+''}
            })
            
            file.dataSource= dataSource
            
            return file
                  
        }))
		if(this.state.page <= 2){
			await AsyncStorage.setItem('docs',await JSON.stringify(doc));       //caso fique sem net, ele salva o ultimo estado
		}

        this.setState({docs:doc},()=>{this.setState({ visible: true })});
        
    }

 
    loadProducts = async (page = 1) => { //req das noticias utilizando a API
        // console.warn("LoadProcucts")
		try {
            const response = await api.get(`/news/show?page=${page}`);    
            const { docs, ...pageInfo } = response.data;
			this.setState({pageInfo})
			const alldocs = [...this.state.docs, ...docs]
			this.loadImage(alldocs)
        } catch (error) { //se deu erro, pega do async storage e tira o skeleton 
            const otherDocs = await JSON.parse(await AsyncStorage.getItem('docs'))
            if(otherDocs !== null){
                this.setState({ visible: true });
                this.setState({docs:otherDocs})
                ToastAndroid.show("not connected to the internet",ToastAndroid.SHORT)
            }
            else{
                ToastAndroid.show("not connected to the internet",ToastAndroid.SHORT)
            }
		}
		
           
	};
	
	loadMore = () =>{
		const {page,pageInfo} = this.state
		this.setState({refreshing:true})
		if( page === pageInfo.pages){
			this.setState({refreshing:false})
			return
		}
		else if(page < pageInfo.pages){
			const pageNumber = page + 1

			this.setState({page:pageNumber})
			this.loadProducts(pageNumber)
		}

		setTimeout( ()=> {this.setState({refreshing:false})},3000)
	}

    verifylenght= (frase) => { //corta a frase do resumo a uma quantidade de caracteres definidos
        
        if(frase.length > this.state.lenghResume){
            return frase.slice(0,this.state.lenghResume)+'...'
        }
        return frase
    }

	verifyListImage = ( lista ) => {
		if(lista.length === 0){
			const a = [1]
			a[0] = {url:require('../image/muhna-ref.jpg')}
			return a
		}
		return lista
	}

    renderItem = ( { item } ) => ( //rendereiza os items baixados da API
        <Animatable.View
            animation='fadeIn'
            duration={2500}
            useNativeDriver={true}
            // onAnimationEnd={() => {this.setState({visible:true})}}
        >
            <View style = { styles.productContainer }>
                <Text style = { styles.productTitle }>{ item.title }</Text>
                <View style = { styles.container2 }>
                    <Slideshow
                        dataSource = { this.verifyListImage(item.dataSource) }
                    />
                </View> 
                <Text style = { styles.productDescription }>{ this.verifylenght( item.resume ) } </Text>
                <TouchableOpacity  style={styles.productButton}onPress={ () => {  this.props.navigation.navigate( 'pag',{item:item} ) } }>
                    <Text style = { styles.productButtonText }>Acessar</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
        
    );
    
    fakeLoad(qtd){//skeleton para aliviar o stress do usuario com a demora do download
  
        if(this.state.visible === false){ 
            const vetor = []
            for(let i = 0; i < qtd; i++){
                vetor.push(
                    <View style = { styles.productContainer } key={i.toString()}>
                        <ShimmerPlaceHolder
                            style={styles.productTitleFake}
                            autoRun = {true} 
                            visible = {this.state.visible}
                            
                            
                        >
                            <Text style = { styles.productTitle }>{ }</Text>
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                            style={styles.container2Fake}
                            autoRun = {true} 
                            visible = {this.state.visible}
                            
                        >
                            <View style = { styles.container2 }>
                                
                            </View>
                        </ShimmerPlaceHolder> 
                        <ShimmerPlaceHolder
                            style={styles.productDescriptionFake}
                            autoRun = {true} 
                            visible = {this.state.visible}
                            
                        >
                            <Text style = { styles.productDescription }>{ } </Text>
                        </ShimmerPlaceHolder>

                        <TouchableOpacity  style={styles.productButton}onPress={ () => { } }>
                            <Text style = { styles.productButtonText }>Acessar</Text>
                        </TouchableOpacity>
                                        
                    </View>
                )
            }
            
            return (
                <ScrollView>
                    {vetor}
                </ScrollView>)
        }
    }

    render(){

        return(
            
            <View style={styles.container}>
                {this.fakeLoad(3)}
                <FlatList
                    contentContainerStyle = {styles.list}
                    data = {this.state.docs}
                    keyExtractor = {item => item._id}
                    renderItem = {this.renderItem}
                    refreshing = {this.state.refreshing}
					onRefresh = {this.loadProducts}
					onEndReached = {this.loadMore}
					onEndReachedThreshold = {0.5}
                />
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
		backgroundColor:'#d9d9d9'
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    container2Fake: {
        justifyContent: 'center',
        
        borderRadius:5,
        paddingTop:5,
        width:widthPercentageToDP('95%'),
        height:heightPercentageToDP('35%')
    },
    list: {
        // padding:20
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 2,
        paddingLeft: 2,

    },

    productContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 5,
        marginBottom: 20,
        //shadow configs
        elevation:4,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1
        },
    },
    animationBlock:{
        flex:1
    },
    productTitle:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight:'bold',
        color: '#000',//'#333'
    },
    productTitleFake:{
        width:widthPercentageToDP('95%'),
        height:heightPercentageToDP('5%')
    },
    productDescription:{
        fontSize:16,
        textAlign: 'center',
        color:'#767474',//'#999',
        marginTop:5,
        lineHeight:24
    },
    productDescriptionFake:{
        paddingTop:5,
        width:widthPercentageToDP('95%'),
        height:heightPercentageToDP('13%')
    },

    productButton:{
        height:42,
        borderRadius:5,
        borderWidth:2,
        borderColor:'#000000',
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10

    },
    productButtonFake:{
        paddingTop:5,
        width:widthPercentageToDP("95%"),
        height:heightPercentageToDP('5%'),
        borderRadius:5,
        borderColor:'#000000',
        backgroundColor:'transparent',
    

    },
    productButtonText:{
        fontSize:18,
        textAlign: 'center',
        color:'#000',
    },
    Image:{
        width:95,
        height:35
    }
});