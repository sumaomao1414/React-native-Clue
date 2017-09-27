import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    PixelRatio,
    StatusBar,
    FlatList,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    ART,
    TextInput,
} from 'react-native';


import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './ScrollTabbar';
import HomeTab from '../Home/HomeTab';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import theme from '../tool/Theme';
import Network from '../tool/NetUtils';

const {width,height} = Dimensions.get('window');


export default class SUSquare extends Component {

    constructor(props){
        super(props);
        this.state = {
            tabNames:['拆违治水1','拆违治水2','拆违治水3','拆违治水4','拆违治水5','拆违治水6','拆违治水7','拆违治水8','拆违治水9','拆违治水10']
        };
        this._handleTabNames = this._handleTabNames.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    tabBarPosition='top'
                    renderTabBar={() => <ScrollableTabBar/>}
                    initialPage={0}
                    tabBarActiveTextColor='#cf000d'
                    tabBarTextStyle={{fontSize: theme.scrollView.fontSize}}
                    tabBarUnderlineStyle={theme.scrollView.underlineStyle}
                    // onChangeTab={(obj) => {
                    //     alert(obj.i)
                    // }
                    // }
                >

                    {this.state.tabNames.map((item, i) => {
                        return (
                            <HomeTab tabLabel={item} key={i} tabTag={item}/>
                        );
                    })
                    }

                </ScrollableTabView>
            </View>
        );

    }

    componentDidMount(){

        const url = "https://api.daliandong.cn/api/clue/personalizedConfigurationDubboService/findThemeContentByDepartmentNo";
       const sign = 'E9776918211081DB0FB47709500247AC'
        const dic = {
            apiVersion:'5',
            appKey:'0',
            departmentNo:'330106',
            infoType:'0',
            mobileType:'ios',
            sign:sign,
            tqmobile:'true'
        };
        const sid = '96323b0a-e15d-4443-87a8-c0c071abbc3b'
        // Network.getSign(url,dic,sid,sign,(result) =>{
        //
        // })

    }

    componentWillUnmount(){
        RCTDeviceEventEmitter.removeListener('value', this._handleTabNames);
    }

    _handleTabNames(tabNames){
        this.setState({ tabNames: tabNames });
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