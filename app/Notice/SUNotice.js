import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';

import Network from '../tool/NetUtils';

const {width,height} = Dimensions.get('window');

export default class SUNotice extends PureComponent {

    // 数据容器，用来存储数据
    dataContainer = [];

    constructor(props) {
        super(props);

        this.state = {
            // 存储数据的状态
            sourceData : []
            ,selected: (new Map(): Map<String, boolean>),
            refreshing: false
            // 添加存储用户输入索引的状态
            ,indexText: ''
        }
    }

    // 当视图全部渲染完毕之后执行该生命周期方法
    componentDidMount() {
        const url = "https://api.daliandong.cn/api/clue/operationNoticeDubboService/findOperationNoticeForPageForMobile";
       const params = {
           appKey : 'H2bLGFrv_6XJA5zW',
           departmentNo : 330106,
           rows : 10,
           tqmobile : true,
           mobileType : 'ios',
           apiVersion : 5,
           page : 1,
       }
        // Network.postJson(url,params,(result) =>{
        //     var jsonData = result["response"];
        //     alert(jsonData)
        //     this.dealWithData(jsonData);
        // });

        // 创造模拟数据
        for (let i = 0; i < 10; i ++) {
            let obj = {
                id: i
                ,title: i + '只柯基a啊沙发上啊路上卡了爱上啦；按时；阿里基数大；时间啊；三六九等；阿里山啊；老实交代；啊；爱上啦几点了； 啊手机丢了；啊啊手机丢了； 啊手机丢了； 按时；登陆；阿萨德啦'
            };

            //  将模拟数据存入数据容器中
            this.dataContainer.push(obj);
        }

        // 将存储的数据赋予状态并更新页面
        this.setState({
            sourceData: this.dataContainer
        });
    }

    dealWithData(jsonData){
        var headerArr = [], listDataArr = [];
        for(var i=0; i<jsonData.count; i++){
            var data = jsonData[i];
            // if(data.hasAD == 1){
            //     headerArr = data.ads;
            //     headerArr.push(data)
            // }else{
            //     listDataArr.push(data);
            // }
           // alert(data);
        }
        // this.setState({
        //     headerDs: headerArr,
        //     listDs: this.state.listDs.cloneWithRows(listDataArr)
        // });
    }

    /**
     * 此函数用于为给定的item生成一个不重复的Key。
     * Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
     * 若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标
     *
     * @param item
     * @param index
     * @private
     */
        // 这里指定使用数组下标作为唯一索引
    _keyExtractor = (item, index) => index;

    /**
     * 使用箭头函数防止不必要的re-render；
     * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
     * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
     *
     * @param id
     * @private
     */
        // 下拉刷新
    _renderRefresh = () => {
        this.setState({refreshing: true})//开始刷新
        //这里模拟请求网络，拿到数据，3s后停止刷新
        setTimeout(() => {
           // CustomToastAndroid.show('没有可刷新的内容！', CustomToastAndroid.SHORT);
            this.setState({refreshing: false});
        }, 3000);
    };

    // 上拉加载更多
    _onEndReached = () => {
        let newData = [];

        for (let i = 10; i < 30; i ++) {
            let obj = {
                id: i
                ,title: i + '生了只小柯基'
            };

            newData.push(obj);
        }

        this.dataContainer = this.dataContainer.concat(newData);
        this.setState({
            sourceData: this.dataContainer
        });
    };


    _onPressItem = (id: string) => {
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return {selected}
        });
    };

    // 加载item布局
    _renderItem = ({item}) =>{
        return(
            <FlatListItem
                id={item.id}
                onPressItem={ this._onPressItem }
                selected={ !!this.state.selected.get(item.id) }
                title={ item.title }
            />
        );
    };

    // 空布局
    _renderEmptyView = () => (
        <View><Text>EmptyView</Text></View>
    );

    render() {
        return(
            <FlatList
                data={ this.state.sourceData }
                // 实现PureComponent时使用
                extraData={ this.state.selected }
                keyExtractor={ this._keyExtractor }
                renderItem={ this._renderItem }
                ItemSeparatorComponent={({highlighted}) => (<View style={{ height:1, backgroundColor:'#000' }}></View>)}
                ListEmptyComponent={ this._renderEmptyView }

                refreshing={ this.state.refreshing }
                // 决定当距离内容最底部还有多远时触发onEndReached回调；数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
                onEndReachedThreshold={0.1}
                onEndReached={ this._onEndReached }

                onRefresh={ this._renderRefresh }
            />
        );
    }
}

// 封装Item组件
class FlatListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return(
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                style={{  justifyContent: 'center', alignItems: 'center',backgroundColor:'gainsboro', borderBottomColor:'white'
                }}
            >
                <View style={styles.container}>
                    <Image style={styles.imageStyl}/>
                    <Text style={styles.text} numberOfLines={2}>
                        <Text>
                            {this.props.title}
                        </Text>
                    </Text>
                    <Text style={styles.rightText} >
                        {"aafjkaslfja;sfj"}
                    </Text>

                </View>
            </TouchableOpacity>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
       // alignItems: 'center',
        backgroundColor: 'white',
        marginTop:8,
        marginLeft:8,
        marginRight:8,
        borderBottomWidth:0.1,
        borderBottomColor:'white'
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
    imageStyl:{
        justifyContent: 'center',
        alignItems: 'center',
        height:160,
        width:width-16,
        backgroundColor:'red',
       // marginTop:8,
    },
    text:{
        fontSize:14,
        //alignItems:'left',
         alignItems:'flex-end',
        marginBottom:8,
        paddingRight:10,
        backgroundColor:'white',
        borderBottomColor:'white',
    },
    rightText:{
        fontSize:14,
       // alignItems:'right',
        justifyContent:'center',
        alignItems:'flex-end',
        marginBottom:8,
        marginRight:10,
        backgroundColor:'white',
        borderBottomColor:'white',
        width:100,
    }
});