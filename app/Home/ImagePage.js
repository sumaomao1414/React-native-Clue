import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');
var TimerMixin = require('react-timer-mixin');

var ScrollImage = React.createClass({
    mixins: [TimerMixin],
    getDefaultProps(){
        return{
            scrollDuration: 2000,
            imageHeight: 145,
            imageDs: []
        }
    },
    getInitialState(){
        return{
            currentPageIndex: 0,
            title:this.props.imageDs[0].title
        }
    },
    componentDidMount(){
        this.startTimer();
    },
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollViewRef"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}>
                    {this.renderAllImage()}

                </ScrollView>

                {/*<Text style={styles.tipStyle}> {this.state.title}</Text>*/}
                <View style={styles.pageViewStyle}>
                    <View style={{flexDirection:"row"}}>{this.renderPageCircle()}</View>
                </View>
                {/*<Text style={styles}> {"asfnaf;ssd\n\n\ngsdgls"}</Text>*/}

            </View>
        );
    },
    renderAllImage(){
        var allImage = [];
        var imgsArr = this.props.imageDs;
        for(var i=0; i<imgsArr.length; i++){
            allImage.push(
                <Image key={i} source={{uri: imgsArr[i].imgsrc}} style={{width:width, height:this.props.imageHeight,resizeMode:Image.resizeMode.stretch}}/>
            );
        }
        return allImage;
    },
    renderPageCircle(){
        var indicatorArr = [];
        var style;
        var imgsArr = this.props.imageDs;
        for(var i=0; i<imgsArr.length; i++){
            style = (i==this.state.currentPageIndex) ? {color:'#cf000d'} : {color:'white'};
            indicatorArr.push(
                <Text key={i} style={[{fontSize:18},style]}> • </Text>
            );
        }
        return indicatorArr;
    },
    onScrollBeginDrag(){
        this.clearInterval(this.timer);
    },
    onScrollEndDrag(){
        this.startTimer();
    },
    onAnimationEnd(e){
        var offSetX = e.nativeEvent.contentOffset.x;
        var activePage = Math.floor(offSetX / width);
        this.setState({
            currentPageIndex: activePage,
            title: this.props.imageDs[activePage].title
        });
    },
    startTimer(){
        var scrollViewRef = this.refs.scrollViewRef;
        var imgCount = this.props.imageDs.length;
        this.timer = this.setInterval(function () {
            var activePage = (this.state.currentPageIndex+1) >= imgCount ? 0 :this.state.currentPageIndex+1;
            this.setState({
                currentPageIndex: activePage,
                title:this.props.imageDs[activePage].title
            });
            scrollViewRef.scrollResponderScrollTo({x:activePage * width, y:0, animated:true});
        }, this.props.scrollDuration);
    },
});

const styles = StyleSheet.create({
    tipStyle:{
        width:width,
        backgroundColor:'rgba(0,0,0,0)',
        position:'absolute',
        bottom:2,
        fontSize: 14,
        color: '#FFFFFF'
    },
    pageViewStyle:{
        width:width,
        height:20,
        backgroundColor:'rgba(0,0,0,0.0)',
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'center',
        //alignItems:'flex-end'
    },

});

module.exports = ScrollImage;