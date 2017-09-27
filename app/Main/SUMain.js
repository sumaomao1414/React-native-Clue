
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TabBarIOS,
    Dimensions,
    Image,
} from 'react-native';

import Home from '../Home/SUHome';
import Square from '../Square/SUSquare';
import Broke from '../Broke/SUBroke';
import Notice from '../Notice/SUNotice';
import Mine from '../Mine/SUMine';

const {width,height} = Dimensions.get('window');

export default class Clue extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedTabItem:'square'    // 首选页面
        }
    }

    /* 创建item*/
    renderTabberItem(title,component,selectedTab,image,seletedImage){
        return(
            <TabBarIOS.Item
                renderAsOriginal={true}    // 如果为false，只会显示纯色图片
                icon={image}
                selectedIcon={seletedImage}
                title={title}

                selected={this.state.selectedTabItem === selectedTab}
                onPress={() => {this.setState({selectedTabItem:selectedTab})}}
            >
                {/*<View style={[styles.childViewStyle, {backgroundColor:'red'}]}>*/}

                {/*</View>*/}
                <NavigatorIOS
                    tintColor = 'salmon'
                    style={{flex:1}}
                    initialRoute = {
                        {
                            component: component,
                            title:title,
                            barTintColor:'#cf000d',
                            titleTextColor:'white'
                            // leftButtonIcon:require('image!navigationbar_friendattention'),
                            // rightButtonIcon:require('image!navigationbar_pop')
                        }
                    }
                />
            </TabBarIOS.Item>
        )
    }

    render() {
        return (
           <View style={styles.container}>
               <TabBarIOS style={{height:49,width:width,backgroundColor:'white'}}>
                   {this.renderTabberItem("首页",Home,'home',require('../../resource/TabbarImage/home.png'),require('../../resource/TabbarImage/home_click.png'))}
                   {this.renderTabberItem("广场",Square,'square',require('../../resource/TabbarImage/square.png'),require('../../resource/TabbarImage/square_click.png'))}
                   {this.renderTabberItem("",Broke,'broke',require('../../resource/TabbarImage/publish.png'),require('../../resource/TabbarImage/publish.png'))}
                   {this.renderTabberItem("公告",Notice,'notice',require('../../resource/TabbarImage/announcement.png'),require('../../resource/TabbarImage/announcement_click.png'))}
                   {this.renderTabberItem("我的",Mine,'mine',require('../../resource/TabbarImage/my.png'),require('../../resource/TabbarImage/my_click.png'))}
               </TabBarIOS>
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
    tabBarStyle:{
        width:width,
        height:height,
    },
    tabBarIconStyle:{
        width:30,
        height:30,
       // backgroundColor:'red'
    },
    childViewStyle:{
        flex:1,
    }
});
