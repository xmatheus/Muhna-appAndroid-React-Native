import React, { Component } from 'react';

import { View, StyleSheet, Image, Dimensions } from 'react-native';

// import { Container } from './styles';

export default class pages extends Component {
  render() {
    return (
        <View style={styles.containerGeral}>
            <Image
                 style={styles.image}
                 source={require('../image/gifs/all.gif')}

            >
                
            </Image>
        </View>
    );
  }
}



const styles = StyleSheet.create({
	containerGeral: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
    }
})