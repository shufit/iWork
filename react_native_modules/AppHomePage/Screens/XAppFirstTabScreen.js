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
    _navigationOptions,
} from './XAppBaseScreen';

class XAppFirstTabScreen extends XAppBaseScreen {

    static navigationOptions={
        ..._navigationOptions,
        header:null,
    };


    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>第一个页面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

module.exports = XAppFirstTabScreen;
