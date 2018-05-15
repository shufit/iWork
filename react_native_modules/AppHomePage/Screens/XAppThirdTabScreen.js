/**
 * Created by shixiaohui on 19/4/18.
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Image,
} from 'react-native';
import {
    XAppBaseScreen,
    NormalNavigationOptions,
} from 'AppBase';

class XAppThirdTabScreen extends XAppBaseScreen {
    static navigationOptions = ({ navigation, navigationOptions })=>({
        ...navigationOptions,
        header:null,
    });


    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>第三个页面</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

module.exports = XAppThirdTabScreen;