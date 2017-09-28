import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ViewPagerAndroid,
    Text
} from 'react-native';

var { width, height } = Dimensions.get('window');

export default class ImageShowScreen extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'ShowImage',
        headerStyle:{
            tintColor:'#cf000d'
        }
        // headerRight:(
        //     <Text style={{color:'red',marginRight:20}} onPress={()=>navigation.state.params?navigation.state.params.navigatePress():null}>我的</Text>
        // ),
    });

    // componentDidMount(){
    //     // 通过在componentDidMount里面设置setParams将title的值动态修改
    //     this.props.navigation.setParams({
    //         headerTitle:'ShowImage',
    //         navigatePress:this.navigatePress,
    //         backgroundColor:'#cf000d',
    //     });
    // }
    //
    // navigatePress = () => {
    //     alert('点击headerRight');
    // }

    render() {
        let data = this.props.navigation.state.params.images;
        let index = this.props.navigation.state.params.index;

        let pages = [];
        if (data != null && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                pages.push(
                    <View key={data[i]} style={{width: width, height: height}}>
                        <Image resizeMode="contain" style={styles.image} source={{uri: data[i]}} />
                    </View>
                );
            }
        }
        return (
            <View style={styles.container}>
                <ViewPagerAndroid initialPage={this.props.navigation.state.params.index} style={styles.viewPager}>
                    {pages}
                </ViewPagerAndroid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    image: {
        flex: 1,
        width: width
    },
    viewPager: {
        width: width,
        height: height
    }
})
