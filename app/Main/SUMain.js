
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

import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import Home from '../Home/SUHome';
import Square from '../Square/SUSquare';
import Broke from '../Broke/SUBroke';
import Notice from '../Notice/SUNotice';
import Mine from '../Mine/SUMine';
import HomeDetail from '../Home/HomeDetail';
import SHowImage from '../Square/ImageShowView';

const {width,height} = Dimensions.get('window');



// export default class Clue extends TabNavigator {
//
//     constructor(props){
//         super(props);
//         this.state = {
//         }
//     }
//
//     /* 创建item*/
//     renderTabberItem(title,component,selectedTab,image,seletedImage){
//         return(
//             <TabBarIOS.Item
//                 renderAsOriginal={true}    // 如果为false，只会显示纯色图片
//                 icon={image}
//                 selectedIcon={seletedImage}
//                 title={title}
//
//                 selected={this.state.selectedTabItem === selectedTab}
//                 onPress={() => {this.setState({selectedTabItem:selectedTab})}}
//             >
//                 {/*<View style={[styles.childViewStyle, {backgroundColor:'red'}]}>*/}
//
//                 {/*</View>*/}
//                 <NavigatorIOS
//                     tintColor = 'salmon'
//                     style={{flex:1}}
//                     initialRoute = {
//                         {
//                             component: component,
//                             title:title,
//                             barTintColor:'#cf000d',
//                             titleTextColor:'white'
//                             // leftButtonIcon:require('image!navigationbar_friendattention'),
//                             // rightButtonIcon:require('image!navigationbar_pop')
//                         }
//                     }
//                 />
//             </TabBarIOS.Item>
//         )
//     }
//
//     render() {
//         return (
//            <View style={styles.container}>
//                <TabBarIOS style={{height:49,width:width,backgroundColor:'white'}} >
//                    {this.renderTabberItem("首页",Home,'home',require('../../resource/TabbarImage/home.png'),require('../../resource/TabbarImage/home_click.png'))}
//                    {this.renderTabberItem("广场",Square,'square',require('../../resource/TabbarImage/square.png'),require('../../resource/TabbarImage/square_click.png'))}
//                    {this.renderTabberItem("",Broke,'broke',require('../../resource/TabbarImage/publish.png'),require('../../resource/TabbarImage/publish.png'))}
//                    {this.renderTabberItem("公告",Notice,'notice',require('../../resource/TabbarImage/announcement.png'),require('../../resource/TabbarImage/announcement_click.png'))}
//                    {this.renderTabberItem("我的",Mine,'mine',require('../../resource/TabbarImage/my.png'),require('../../resource/TabbarImage/my_click.png'))}
//                </TabBarIOS>
//            </View>
//         );
//     }
// }

const MyTab = TabNavigator({
        Home:{
            screen:Home,
            navigationOptions: ()=> TabOptions('首页',require('../../resource/TabbarImage/home.png'),require('../../resource/TabbarImage/home_click.png'),'首页'),
            tabBarOptions:{
                activeTintColor:'red', // label和icon的前景色 活跃状态下（选中）。
                inactiveTintColor:'orange', // label和icon的前景色 不活跃状态下(未选中)。
                labelStyle:{
                    backgroundColor:'red'
                },
                style:{
                    backgroundColor:'red'
                }
            }
        },

        Square:{
            screen:Square,
            navigationOptions: ()=> TabOptions('广场',require('../../resource/TabbarImage/square.png'),require('../../resource/TabbarImage/square_click.png'),'广场'),

        },

        Broke:{
            screen:Broke,
            navigationOptions: ()=> TabOptions('爆料',require('../../resource/TabbarImage/publish.png'),require('../../resource/TabbarImage/publish.png'),'爆料'),

        },

        Notice:{
            screen:Notice,
            navigationOptions: ()=> TabOptions('公告',require('../../resource/TabbarImage/announcement.png'),require('../../resource/TabbarImage/announcement_click.png'),'公告'),

        },

        Mine:{
            screen:Mine,
            navigationOptions: ()=> TabOptions('我的',require('../../resource/TabbarImage/my.png'),require('../../resource/TabbarImage/my_click.png'),'我的'),
        },


});


// 初始化StackNavigator
const MyNav = StackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    MyTab:{
        screen:MyTab,
    },
    // 将需要跳转的页面注册在这里，全局才可以跳转
    HomeDetail:{
        screen:HomeDetail,
        title:'详情',
    },
    ShowImage:{
        screen:SHowImage,
        title:'查看图片',
}

},{

});

const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:35,width:35 }, {tintColor: '#cf000d'}]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:20,color:'white',alignSelf:'center',};
    // header的style
    const headerStyle = {backgroundColor:'#cf000d'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

const TabbarOptions  = () =>{

}

export default MyNav;

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
