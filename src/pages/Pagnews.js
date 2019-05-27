import React from 'react';
import { StyleSheet, View, Button,Text } from 'react-native';

export default class extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('name', ''),
            textAlign:'center'
        }
    }

    render() {
        
        const { navigation } = this.props;
        const item = navigation.getParam('item', 'no-name');
        
        return (
        <View style={styles.container}>
            
            <Button
            title={item.title}
            onPress={() =>
                this.props.navigation.navigate('news')
            }
            />
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });