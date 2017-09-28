

import React, {Component} from 'react';
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
    ART,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';

import theme from '../tool/Theme'
import ListViewForOtherTab from '../Square/SquareList';
import LoadingView from '../tool/LoadingView';
import Base64 from '../tool/Base64';
import Utils from '../tool/Utils';
import CountEmitter from '../tool/CountEmitter';
import px2dp from '../tool/Px2dp';
import ImageShow from '../Square/ImageShowView';

const {width,height} = Dimensions.get('window');
const AVATAR_WIDTH = 80;
const HEIGHT = width * 7 / 10;

export default class HomeTab extends Component{

    constructor(props) {
        super(props);
        this.state = {
            moments: [],
            avatar: '',
            showProgress: false,
            menuPos: {},
            menuShow: false,
            doFavorMomentId: -1,
            isUpdate: false,
            isLoadMore: false,
            hasMoreData: true,
            showReplyInput: false,
        };
        // 分页需要使用的两个参数offset:偏移量, pagesize:一页的大小,pagesize=-1代表获取所有数据
        this.offset = 0;
        this.pagesize = 5;
        this.avatar = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2637960348,2817904703&fm=27&gp=0.jpg'
    }

    componentWillMount() {
        CountEmitter.addListener('updateMomentList', ()=>{
            // 刷新朋友圈列表
            this.setState({isUpdate: true, isLoadMore: false});
            this.getMoments(true);
        });
    }
    componentDidMount() {
        if (!this.state.isUpdate) {
            this.setState({isLoadMore: false});
            this.getMoments(true);
        }
        let replyInput = this.refs.replyInput;
        if (!Utils.isEmpty(replyInput)) {
            replyInput.focus();
        }
    }

    getMoments(useLoading) {
        if (useLoading) {
            this.showLoading();
        }
        let url = 'http://rnwechat.applinzi.com/moments?offset=' + this.offset + '&pagesize=' + this.pagesize;

        fetch(url).then((res)=>res.json())
            .then((json)=>{
                if (useLoading) {
                    this.hideLoading();
                }
                if (json != null) {
                    if (json.code == 1) {
                        let data = json.msg; // 数组
                        if (data.length == 0) {
                           // alert('没有更多数据了')
                            this.setState({hasMoreData: false});
                            return ;
                        }
                        let moments = this.state.moments;
                        if (data != null && data.length > 0) {
                            for(let i = 0; i < data.length; i++) {
                                data[i].key = i + '-' + this.offset;
                                if (this.state.isLoadMore) {
                                    moments.push(data[i]);
                                }
                            }
                        }
                        if (this.state.isLoadMore) {
                            this.setState({moments: moments});
                        } else {
                            this.setState({moments: data});
                        }
                    }
                }
            }).catch((e)=>{
            if (useLoading) {
                this.hideLoading();
            }

            alert(e.toString())
        })
    }
    showLoading() {
        this.setState({showProgress: true});
    }
    hideLoading() {
        this.setState({showProgress: false});
    }

    renderHeaderView() {
        return (
            <View style = {{height:10,backgroundColor:'#f6f7f8'}}>
            </View>
        );
    }


    render() {
        return (
            <ScrollView
                style={styles.container}>

                <View>
                        {/*<ListViewForOtherTab contents={[1,2,3,4,5,6,7,8,9,0,8,8,7,6]}/>*/}
                    <FlatList
                        ListHeaderComponent={()=>this.renderHeaderView()}
                        data={this.state.moments}
                        renderItem={this.renderItem}
                        onEndReached={()=>{this.loadNextPage()}}
                        onEndReachedThreshold={0.2}
                    />
                </View>
            </ScrollView>
        );
    }

    renderImageRow(arr, start, end) {
        let images = [];
        if (end === 1){
            let img = {uri: arr[0]};
            images.push(
                <TouchableOpacity key={"row-image-0"} activeOpacity={0.6} onPress={()=>{this.props.showBigImage(arr,0)}}>
                    <Image source={img} style={{width:200 ,height:120,marginRight: 3,}} />
                </TouchableOpacity>
            );
        }else {
            for (let i = start; i < end; i++) {
                let img = {uri: arr[i]};
                images.push(
                    <TouchableOpacity key={"row-image-" + i} activeOpacity={0.6} onPress={()=>{this.props.showBigImage(arr,i)}}>
                        <Image source={img} style={listItemStyle.imageCell} />
                    </TouchableOpacity>
                );
            }
        }

        return (
            <View key={"row-" + start} style={{flexDirection: 'row', marginTop: 3}}>
                {images}
            </View>
        );
    }

    renderImages(pictures) {
        if (pictures == null || pictures == '') {
            return null;
        }
        let arr = pictures.split('#');
        let len = arr.length;
        let images = [];
        if (len > 0) {
            let rowNum = Math.ceil(len / 3);
            for (let i = 0; i < rowNum; i++) {
                let start = i * 3;
                let end = i * 3 + 3;
                if (end > len) {
                    end = len;
                }
                images.push(this.renderImageRow(arr, start, end));
            }
        }
        return (
            <View style={listItemStyle.imageContainer}>
                {images}
            </View>
        );
    }
    loadNextPage = (info)=>{
        if (!this.state.hasMoreData) {
            return ;
        }
        this.setState({isLoadMore: true});
        //alert('加载下一页')
        this.offset = this.offset + this.pagesize;
        this.getMoments(false);
    }

    renderItem = (item) => {
        const path = ART.Path();
        path.moveTo(10, 10);
        path.lineTo(20, 0);
        path.lineTo(30, 10);
        path.close();
        let avatar = require('../../resource/TabbarImage/home.png');
        if (!Utils.isEmpty(item.item.avatar)) {
            avatar = {uri: item.item.avatar};
        }
        return (
            <View key={item.item.key}>
                <View style={listItemStyle.container}>
                    <Image style={listItemStyle.avatar} source={avatar} />
                    <View style={listItemStyle.content}>
                        <Text style={listItemStyle.nameText}>{item.item.username}</Text>
                        <Text style={listItemStyle.infoBarText} numberOfLines={1}>{"2017年09月26日16:40:40"}</Text>
                        <Text style={listItemStyle.msgText}>{Base64.decoder(item.item.content)}</Text>
                        {this.renderImages(item.item.pictures)}


                    </View>
                </View>
                <View style={listItemStyle.divider} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // justifyContent: 'center',
       // alignItems: 'center',
        paddingTop:0,
        backgroundColor:'white',
        // backgroundColor: 'red',
    },
})

const listItemStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
    },
    imageContainer: {
        flexDirection: 'column',
        marginTop: 6,
    },
    imageCell: {
        width: 100,
        height: 100,
        marginRight: 3,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius:px2dp(40/2),

    },
    content: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    nameText: {
        fontSize: 15,
        color: '#54688D'
    },
    msgText: {
        fontSize: 15,
        color: '#000000',
        marginTop: 10,
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    timeText: {
        flex: 1,
        fontSize: 12,
        color: '#999999',
    },
    commentImg: {
        width: 25,
        height: 17,
    },
    divider: {
        flex: 1,
        height: 1 / PixelRatio.get(),
        backgroundColor: '#D3D3D3',
    },
    commentContainer: {
        flex: 1,
    },
    commentContent: {
        backgroundColor: '#EEEEEE',
        padding: 6,
    },
    favorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favorImg: {
        width: 13,
        height: 13,
        marginRight: 5,
        marginTop: 5,
    },
    commentText: {
        flex:1,
        fontSize: 13,
        color: '#54688D',
        marginTop: 10,
    },
    infoBarText: {
        fontSize: px2dp(11),
        color: theme.grayColor,
        marginTop:5
    }
});