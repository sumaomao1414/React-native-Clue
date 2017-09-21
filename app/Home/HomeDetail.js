import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

var Detail = React.createClass({
    getInitialState(){
        return{
            detailData: ''
        }
    },

    render() {
        return (
            <WebView
                automaticallyAdjustContentInsets={true}
                //style={styles.webView}
                source={{html: this.state.detailData, baseUrl: ''}}
                javaScriptEnabled={true}//仅限Android平台。iOS平台JavaScript是默认开启的。
                domStorageEnabled={true}//安卓用 指定是否开启DOM本地存储。
                startInLoadingState={true}//强制WebView在第一次加载时先显示loading视图
                scalesPageToFit={this.state.scalesPageToFit}
            />
        );
    },

    componentDidMount(){
        //加载  ？？？
        var url_api = 'http://c.m.163.com/nc/article/'+this.props.row.docid+'/full.html';
        console.log(url_api);
        fetch(url_api)
            .then((response) => response.json())
            .then((responseData)=>{
                console.log(responseData);
                var allData = responseData[this.props.row.docid];
                var bodyHtml = allData['body'];
                if(allData['img'].length > 0){
                    for(var i=0; i<allData['img'].length; i++){
                        var img = allData['img'][i];
                        var imgSrc = img['src'];
                        var  imgHtml = '<img src="' + imgSrc + '" width="100%">';
                        bodyHtml = bodyHtml.replace(img['ref'], imgHtml);
                    }
                }
                this.setState({
                    detailData:bodyHtml
                });
            })
            .catch((error) => {
                alert('请求数据失败');
            })
    }
});

module.exports = Detail;