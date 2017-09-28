import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ListView,
    Image,
    RefreshControl,
    ScrollView,
    PixelRatio,
    Alert,
} from 'react-native';

import Swiper from 'react-native-swiper';
import ImageButton from '../Home/ImageButton';

//const {width,height} = Dimensions.get('window');
var Dimensions = require('Dimensions');
var ScreenW = Dimensions.get('window').width;
import ScrollImage from '../Home/ImagePage';
import Detail from '../Home/HomeDetail';
import Network from '../tool/NetUtils';
import px2dp from '../tool/Px2dp';

const imgBtnImages = [
    require('../../resource/Home/IllegalFlood.png'),
    require('../../resource/Home/convenienceService.png'),
    require('../../resource/Home/advertise.png'),
    require('../../resource/Home/Solution.png'),
];


//export default class SUHome extends Component {
var Home = React.createClass({
    getDefaultProps(){
        return {
            url_api: "https://c.m.163.com/nc/auto/list/5YWo5Zu9/0-20.html"
        }
    },

    getInitialState(){
        return {
            headerDs: [],
            listDs: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            btnName: ['拆违治水','便民服务','平安宣传','更多']
        }
    },


    render() {
        return (
            <ListView
                dataSource={this.state.listDs}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        );
    },

    renderRow(row){
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.pushToDetail(row)}}>
                <View style={styles.cellViewStyle}>
                    <Image source={{uri:row.imgsrc}} style={styles.imgStyle}/>
                    <View style={styles.rightViewStyle}>
                        <Text style={styles.titleStyle}>{row.title}</Text>
                        <Text style={styles.subTitleStyle}>{row.digest}</Text>
                        <Text style={styles.replyTitleStyle}>{row.replyCount}跟帖</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },

    pushToDetail(row){


        // this.props.navigator.push({
        //     component: Detail,
        //     title: row.title,
        //     passProps:{row}
        // })

        this.props.navigation.navigate('HomeDetail',{title:row.title,'docid':row.docid,headerTitle:'详情'})
    },

    renderHeader(){
        if (this.state.headerDs.length == 0) return;
        return(
            <View>
                {/*<ScrollImage imageDs = {this.state.headerDs}/>*/}
                <Swiper
                    height={px2dp(130)}
                    autoplay={true}
                    bounces={true}>
                    {/* 需要重新封装*/}
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.state.headerDs[0].imgsrc}} resizeMode="stretch"/>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.state.headerDs[1].imgsrc}} resizeMode="stretch"/>
                    </View>
                </Swiper>
                <View style={styles.imageBtnLine}>
                    {this.state.btnName.map((item, index) => {
                        return(
                            <ImageButton
                                key={index}
                                image={imgBtnImages[index]}
                                imgSize={px2dp(46)}
                                text={item}
                                color="#000"
                                btnStyle={styles.imgBtn}
                               onPress={this._imageButtonCallback.bind(this, index)}
                            />
                        )})
                    }
                </View>
                <View style = {{height : 10,backgroundColor:'#f5f5f5'}}/>

            </View>
        );
    },

    componentDidMount(){

        Network.get(this.props.url_api,null,(result) =>{
            var jsonData = result['list'];
            this.dealWithData(jsonData);
        });

        // fetch(this.props.url_api)
        //     .then((response)=>response.json())
        //     .then((responseData)=>{
        //         var jsonData = responseData['list'];
        //         this.dealWithData(jsonData);
        //     })
        //     .catch((error)=>{
        //         if(error){
        //             var jsonData = localdatas['list'];
        //             this.dealWithData(jsonData)
        //         }
        //     })
    },

    _imageButtonCallback(position){
        alert(position);
    },

    dealWithData(jsonData){
        var headerArr = [], listDataArr = [];
        for(var i=0; i<jsonData.length; i++){
            var data = jsonData[i];
            if(data.hasAD == 1){
                headerArr = data.ads;
                headerArr.push(data)
            }else{
                listDataArr.push(data);
            }
        }
        this.setState({
            headerDs: headerArr,
            listDs: this.state.listDs.cloneWithRows(listDataArr)
        });
    }
//}
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: 'red',
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
    cellViewStyle:{
        flexDirection:'row',
        padding:8,
        borderBottomColor:'#A8A8A8',
        borderBottomWidth:0.5
    },
    imgStyle:{
        width:100,
        height:100
    },
    rightViewStyle:{
        width: ScreenW-124,
        marginLeft:8
    },
    titleStyle:{
        fontSize:14,
        color:'#2B2B2B',
        marginBottom:4
    },
    subTitleStyle:{
        fontSize:11,
        color:'#6B6B6B',
    },
    replyTitleStyle:{
        position:'absolute',
        right:4,
        bottom:0,
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius:4,
        padding:2,
        backgroundColor:'#EDEDED',
        color:'gray'
    },
    imageBtnLine:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    },
    imgBtn: {
        height: px2dp(100),
        width: Dimensions.get('window').width/4,
    },
        slide: {
        backgroundColor: 'transparent'
    },
    image: {
        height: px2dp(145),
        width: Dimensions.get('window').width
    },
});

module.exports = Home;