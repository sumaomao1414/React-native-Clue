import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    Dimensions,
    FlatList,
    Image,
} from 'react-native';

const {width,height} = Dimensions.get('window');

export default class SUNotice extends Component {

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});