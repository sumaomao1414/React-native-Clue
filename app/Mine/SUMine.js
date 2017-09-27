import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    PixelRatio,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import ListItem from '../Mine/ListItem';
import ListItemDivider from '../Mine/ListItemDivider';
import CountEmitter from '../tool/CountEmitter';
import utils from '../tool/Utils';


const {width,height} = Dimensions.get('window');

export default class SUMine extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.divider}></View>
                <ScrollView style={styles.content}>
                    <View style={{width: width, height: 20}} />
                    <TouchableHighlight underlayColor='#D9D9D9' onPress={()=>{this.turnOnPage('PersonInfo', {userInfo: this.state.userInfo})}}>
                        <View style={styles.meInfoContainer}>
                            <Image style={styles.meInfoAvatar} source={utils.isEmpty(this.state.avatar) ? require('../../resource/TabbarImage/home.png') : {uri: this.state.avatar}} />
                            <View style={styles.meInfoTextContainer}>
                                <Text style={styles.meInfoNickName}>{'susususu'}</Text>
                                <Text style={styles.meInfoWeChatId}>{"昵称：sssssss"}</Text>
                            </View>
                            <Image style={styles.meInfoQRCode} source={require('../../resource/TabbarImage/home.png')} />
                        </View>
                    </TouchableHighlight>
                    <View />
                    <View style={{width: width, height: 20}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"钱包"} />
                    <View style={{width: width, height: 20}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"收藏"} showDivider={true} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"相册"} showDivider={true} handleClick={()=>{this.turnOnPage('Moment')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"卡包"} showDivider={true} handleClick={()=>{this.turnOnPage('CardPackage')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"表情"} />
                    <View style={{width: width, height: 20}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"设置"} handleClick={()=>{this.turnOnPage('Settings')}} />
                    <View style={{width: width, height: 20}} />
                </ScrollView>
                <View style={styles.divider}></View>
            </View>
        );
    }

    turnOnPage(pageName) {
        alert(pageName)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: width,
        height: 1 / PixelRatio.get(),
        backgroundColor: '#D3D3D3'
    },
    content: {
        flex: 1,
        width: width,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },
    tabBarIcon: {
        width: 24,
        height: 24,
    },
    meInfoContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 10,
    },
    meInfoAvatar: {
        width: 60,
        height: 60,
    },
    meInfoTextContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    meInfoNickName: {
        color: '#000000',
        fontSize: 16,
    },
    meInfoWeChatId: {
        color: '#999999',
        fontSize: 14,
        marginTop: 5,
    },
    meInfoQRCode: {
        width: 25,
        height: 25,
    }
});