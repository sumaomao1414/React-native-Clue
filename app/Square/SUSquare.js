import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    Dimensions,
    FlatList,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './CustomTabbar';

const {width,height} = Dimensions.get('window');

export default class SUSquare extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarActiveTextColor = '#cf000d'
                >
                    <Text tabLabel='拆违治水1'/>
                    <Text tabLabel='拆违治水2'/>
                    <Text tabLabel='拆违治水3'/>
                    <Text tabLabel='拆违治水4'/>
                    <Text tabLabel='拆违治水5'/>
                    <Text tabLabel='拆违治水6'/>
                    <Text tabLabel='拆违治水7'/>
                    <Text tabLabel='拆违治水8'/>
                    <Text tabLabel='拆违治水9'/>
                    <Text tabLabel='拆违治水10'/>
                    <Text tabLabel='拆违治水11'/>


                </ScrollableTabView>
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
        paddingTop:64,
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