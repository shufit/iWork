/**
 * Created by shixiaohui on 25/4/18.
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
} from '../Screens/XAppBaseScreen';

class XAppNavigationScreen extends XAppBaseScreen {

    static navigationOptions = {
        ..._navigationOptions,
        headerBackImage:require('../Image/back.png'),
        headerStyle:{
            backgroundColor:'white',

        },
        backButtonTitle:'返回',
        headerBackTitleStyle:{
            color:'red',
            fontSize:10,
            textAlign:'center',
        },
        headerTintColor:'',
        title:'二级页面',
        headerTitleStyle:{
            color:'black',
        }
    }
    ;


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>二级页面</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

module.exports = XAppNavigationScreen;