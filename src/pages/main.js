import React, { Component} from 'react';
import api from '../services/api';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, AsyncStorage , ToastAndroid} from 'react-native';

// import Slideshow from 'react-native-image-slider-show';
import Slideshow from './components/Slideshow'

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

    state = {
        docs: [],
        lenghResume:225

    };
    componentDidMount() {
        this.loadProducts();
    }
    
    // loadProducts = async () => {
        
    //     const response = await api.get('/news/show');

    //     const { docs } = response.data;
        
    //     const doc = await Promise.all(docs.map(async (file) => {
            
    //         let resposta = await api.get('/image/news?newsid='+file._id+'');
    //         let data = resposta.data

            
    //         const dataSource = data.map((data) => {
    //             return {url:api.defaults.baseURL+'/image/name?filename='+data+''}
    //         })
            
    //         file.dataSource= dataSource
            
    //         return file
                  
    //     }))

    //     this.setState({docs:doc});
    // };
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
            const { docs } = response.data;

            this.loadImage(docs)
        } catch (error) {
            const otherDocs = await JSON.parse(await AsyncStorage.getItem('docs'))
            if(otherDocs !== null){
                this.setState({docs:otherDocs})
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
    );

    render(){
        
        return(
            <View style={styles.container}>
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
        }
       
    },

    productTitle:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight:'bold',
        color: '#000',//'#333'
    },

    productDescription:{
        fontSize:16,
        textAlign: 'center',
        color:'#999',
        marginTop:5,
        lineHeight:24
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