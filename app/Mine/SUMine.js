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
import ImagePicker from 'react-native-image-crop-picker';

const {width,height} = Dimensions.get('window');

export default class SUMine extends Component {

    //初始化一个对象，path本地路径
    _imageObj = {
        path: '/Users/maomao/WebstormProjects/Clue/resource/TabbarImage/announcement.png'
    };

    constructor(props) {
        super(props);
        this.state = {
            avatar:require('../../resource/TabbarImage/announcement.png')
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.divider}></View>
                <ScrollView style={styles.content}>
                    <View style={{width: width, height: 20}} />
                    <TouchableHighlight underlayColor='#D9D9D9' onPress={()=>{this.changeIcon()}}>
                        <View style={styles.meInfoContainer}>
                            <Image style={styles.meInfoAvatar} source= {this.state.avatar} />
                            <View style={styles.meInfoTextContainer}>
                                <Text style={styles.meInfoNickName}>{'susususu'}</Text>
                                <Text style={styles.meInfoWeChatId}>{"sssssss"}</Text>
                            </View>
                            <Image style={styles.meInfoQRCode} source={require('../../resource/TabbarImage/home.png')} />
                        </View>
                    </TouchableHighlight>
                    <View />
                    <View style={{width: width, height: 10}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"勋章堂"} showDivider={true} handleClick={()=>{this.turnOnPage('勋章')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"积分商城"} showDivider={true} handleClick={()=>{this.turnOnPage('积分商城')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"金币中心"} showDivider={true} handleClick={()=>{this.turnOnPage('金币中心')}} />
                    <ListItemDivider />
                    <View style={{width: width, height: 10}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我关注的人"} showDivider={true} handleClick={()=>{this.turnOnPage('关注的人')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我的粉丝"} showDivider={true} handleClick={()=>{this.turnOnPage('我的粉丝')}} />
                    <ListItemDivider />
                    <View style={{width: width, height: 10}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我的爆料"} showDivider={true} handleClick={()=>{this.turnOnPage('我的爆料')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我的说说"} showDivider={true} handleClick={()=>{this.turnOnPage('我的说说')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我的评论"} showDivider={true} handleClick={()=>{this.turnOnPage('我的评论')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我的关注"} showDivider={true} handleClick={()=>{this.turnOnPage('我的关注')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我的投诉"} showDivider={true} handleClick={()=>{this.turnOnPage('我的投诉')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"我的任务"} showDivider={true} handleClick={()=>{this.turnOnPage('我的任务')}} />
                    <View style={{width: width, height: 10}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"邀请好友"} showDivider={true} handleClick={()=>{this.turnOnPage('邀请好友')}} />
                    <View style={{width: width, height: 10}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"草稿箱"} showDivider={true} handleClick={()=>{this.turnOnPage('草稿箱')}} />
                    <View style={{width: width, height: 10}} />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"意见反馈"} showDivider={true} handleClick={()=>{this.turnOnPage('意见反馈')}} />
                    <ListItemDivider />
                    <ListItem icon={require('../../resource/TabbarImage/home.png')} text={"关于我们"} showDivider={true} handleClick={()=>{this.turnOnPage('关于我们')}} />
                    <View style={{width: width, height: 10}} />
                </ScrollView>
                <View style={styles.divider}></View>
            </View>
        );
    }

    turnOnPage(pageName) {
        alert(pageName)
    }

    // 更多获取图片方法见 http://www.jianshu.com/p/811e58a7aafa
    changeIcon(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay:true,
            compressImageQuality:0.5,
        }).then(image => {
            this.setState({
                avatar: {uri: image['path']}
            });
            this._imageObj = image;
        });
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
        borderRadius:60/2,
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