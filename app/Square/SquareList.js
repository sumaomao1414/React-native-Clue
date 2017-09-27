

import React, {Component, PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, PixelRatio, ListView, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import px2dp from '../tool/Px2dp';
import theme from '../tool/Theme';
//import MainPage from '../page/MainPage';

export default class SquareList extends Component{
    static propTypes = {
        isRenderHeader: PropTypes.bool
    }

    static defaultProps = {
        isRenderHeader: false
    }

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.contents)
        }
    }

    _itemClickCallback(rowData){
      //  MainPage.switchToWebViewPage(rowData);
    }

    _renderItem(rowData, sectionID, rowID, highlightRow){
        if(Platform.OS === 'ios') {
            return (
                <TouchableOpacity
                    onPress={this._itemClickCallback.bind(this, rowData)}
                    activeOpacity={theme.btnActiveOpacity}>
                    {this._renderItemContent(rowData)}
                </TouchableOpacity>
            )
        }else if(Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback onPress={this._itemClickCallback.bind(this, rowData)}>
                    {this._renderItemContent(rowData)}
                </TouchableNativeFeedback>
            )
        }
    }

    _renderItemContent(rowData){
        return(
            <View style={styles.item}>
                <View style={{
                    flex: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                   // alignItems: 'center'
                     }}>
                    {rowData.screenshot ?
                        <Image source={{uri: rowData.screenshot.url}}
                               style={styles.image}/>
                        :
                        <Image source={require('../../resource/TabbarImage/home.png')}
                               style={styles.image}/>
                    }
                </View>
                <View style={{flex: 80, marginTop: px2dp(15)}}>
                    <Text style={styles.content} numberOfLines={2}>{"按时留费奥斯卡浪费和爱上弗兰克哈"}</Text>
                    <View style={styles.infoBar}>
                        <Text style={styles.infoBarText} numberOfLines={1}>{"2017年09月26日16:40:40"}人收藏
                            • {"啦啦啦啦啦啦啦啦"} • {rowData.time}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderHeader(){
        if(this.props.isRenderHeader) {
            return (
                <View style={styles.header}>
                    <Text>热门文章</Text>
                </View>
            );
        }
    }

    render(){
        return(
            <ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        marginTop: px2dp(10)
    },
    header: {
        backgroundColor: '#fff',
        height: px2dp(40),
        paddingLeft: px2dp(15),
        justifyContent: 'center'
    },
    item: {
        flexDirection: 'row',
        //width: theme.screenWidth,
        height: px2dp(160),
        backgroundColor: 'white',
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
        borderTopColor: '#d4d4d4',
        borderTopWidth: 1 / PixelRatio.get()
    },
    content: {
        color: '#000',
        fontSize: px2dp(15),
    },
    image: {
        height: px2dp(55),
        width: px2dp(55),
        backgroundColor: '#f4f4f4',
      //  resizeMode: 'cover',
        marginTop:10,
        paddingLeft:10,
        borderRadius:px2dp(55/2),
    },
    infoBar: {
        flexDirection: 'row',
        marginTop: px2dp(15)
    },
    infoBarText: {
        fontSize: px2dp(11),
        color: theme.grayColor
    }
});