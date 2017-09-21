import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ListView,
    Image,
} from 'react-native';


//const {width,height} = Dimensions.get('window');
var Dimensions = require('Dimensions');
var ScreenW = Dimensions.get('window').width;
import ScrollImage from '../Home/ImagePage';
import Detail from '../Home/HomeDetail';
import Network from '../tool/NetUtils';

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
            })
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


        this.props.navigator.push({
            component: Detail,
            title: row.title,
            passProps:{row}
        })
    },

    renderHeader(){
        if (this.state.headerDs.length == 0) return;
        return(
            <ScrollImage imageDs = {this.state.headerDs}/>
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
    }
});

module.exports = Home;