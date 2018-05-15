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


class XAppSecondTabScreen extends XAppBaseScreen {

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
                <Text>第二个页面</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

module.exports = XAppSecondTabScreen;