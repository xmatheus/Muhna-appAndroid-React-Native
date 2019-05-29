import React, { Component} from 'react';
import api from '../services/api';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, AsyncStorage , ToastAndroid, Dimensions, PixelRatio, ScrollView } from 'react-native';
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

// // Estilizando uma View com os métodos acima
// const Tile = styled.View`
//   width: ${widthPercentageToDP('98%')};
//   height: ${heightPercentageToDP('10%')};
// `;

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
        userImageVisible: false,
        postImageVisible: false,
        internet:true
    };
    // componentDidMount () {
    //     if(this.state.internet === true){
    //         setTimeout(() => this.setState({ visible: true }), 3500);       
    //     }else{
    //         setTimeout(() => this.setState({ visible: true }), 140);
    //     }
    // }

    loadImage = async (docs) =>{
        // console.error("AQUI", docs)
        const doc = await Promise.all(docs.map(async (file) => {
            
            let resposta = await api.get('/image/news?newsid='+file._id+'');
            let data = resposta.data

            
            const dataSource = data.map((data) => {
                return {url:api.defaults.baseURL+'/image/name?filename='+data+''}
            })
            
            file.dataSource= dataSource
            
            return file
                  
        }))

        await AsyncStorage.setItem('docs',await JSON.stringify(doc));       //caso fique sem net, ele salva o ultimo estado

        this.setState({docs:doc});
        
    }

 
    loadProducts = async () => {
        
        try {
            const response = await api.get('/news/show');
            setTimeout(() => this.setState({ visible: true }), 1500);       
            const { docs } = response.data;
            this.loadImage(docs)
        } catch (error) {
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


    verifylenght= (frase) => {
        
        if(frase.length > this.state.lenghResume){
            return frase.slice(0,this.state.lenghResume)+'...'
        }
        return frase
    }


    renderItem = ( { item } ) => (
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
                        dataSource = { item.dataSource }
                    />
                </View> 
                <Text style = { styles.productDescription }>{ this.verifylenght( item.resume ) } </Text>
                <TouchableOpacity  style={styles.productButton}onPress={ () => {  this.props.navigation.navigate( 'pag',{item:item} ) } }>
                    <Text style = { styles.productButtonText }>Acessar</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
        
    );
    
    fakeLoad(qtd){
        
        if(this.state.visible === false){ 
            const vetor = []
            for(let i = 0; i < qtd; i++){
                vetor.push(
                    <View style = { styles.productContainer } key={i.toString()}>
                        <ShimmerPlaceHolder
                            style={styles.productTitleFake}
                            autoRun = {true} 
                            visible = {true}
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
                        <ShimmerPlaceHolder
                            style={styles.productButtonFake}
                            autoRun = {true} 
                            visible = {true}
                        >
                        <TouchableOpacity  style={styles.productButton}onPress={ () => { } }>
                            <Text style = { styles.productButtonText }>Acessar</Text>
                        </TouchableOpacity>
                        </ShimmerPlaceHolder>                
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
                {/* <Animatable.View
                    animation='fadeOut'
                    duration={3250}
                    useNativeDriver={true}
                    // onAnimationEnd={() => {this.setState({visible:true})}}
                >
                    {this.fakeLoad(3)}
                </Animatable.View> */}
                {this.fakeLoad(3)}
                <FlatList
                    contentContainerStyle={styles.list}
                    data = {this.state.docs}
                    keyExtractor = {item => item._id}
                    renderItem = {this.renderItem}
            
                />
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#d9d9d9'//'#fafafa'
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
        color:'#999',
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