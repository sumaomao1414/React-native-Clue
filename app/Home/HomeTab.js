

import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl} from 'react-native';

import theme from '../tool/Theme'
import ListViewForOtherTab from '../Square/SquareList';

export default class HomeTab extends Component{

    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: []
        };
    }

    render() {
        return (
            <ScrollView
                style={styles.container}>
                {/*// refreshControl={*/}
                {/*//     <RefreshControl*/}
                {/*//         refreshing={this.state.refreshing}*/}
                {/*//         onRefresh={this._onRefresh.bind(this)}*/}
                {/*//         colors={['red','#ffd500','#0080ff','#99e600']}*/}
                {/*//         tintColor={theme.themeColor}*/}
                {/*//         title="Loading..."*/}
                {/*//         titleColor={theme.themeColor}*/}
                     {/*>*/}
                 {/*}>*/}
                {/*{ this._renderContents() }*/}
                {/*>*/}
                {/*<View style={styles.container}>*/}

                {/*</View>*/}
                <View>
                        <ListViewForOtherTab contents={[1,2,3,4,5,6,7,8,9,0,8,8,7,6]}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // justifyContent: 'center',
       // alignItems: 'center',
        paddingTop:0,
        backgroundColor:'yellow',
        // backgroundColor: 'red',
    },
})