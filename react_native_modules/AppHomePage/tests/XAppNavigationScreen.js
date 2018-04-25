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
        // headerBackImage:()=>{
        //     return(<Image source={require('../Image/back.png')}/>)
        // },
        // headerStyle:{
        //     backgroundColor:'#1a1a1a',
        //
        // }
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