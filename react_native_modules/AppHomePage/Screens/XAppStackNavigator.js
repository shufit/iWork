/**
 * Created by shixiaohui on 19/4/18.
 */

import {StackNavigator} from "react-navigation";
import React, {Component} from "react";
import {Platform, StyleSheet, Text, Button, View, Image} from "react-native";


import AppTabScreenNavigator from './XAppTabNavigator';
import {
    WebView
} from 'AppJSBridge';


const RouteConfigs = {

    /*
    *
    * 将app中所有的页面在此处注册到StackNavigator中
    *
     */



    //app tab主页
    main: {
        screen: AppTabScreenNavigator,
    },

    //webViewScreen加载H5页面
    webView: {
        screen: WebView,
    },

};

const StackNavigatorConfig = {

    initialRouteName:'main',
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
        gesturesEnabled: false,
    },

};


const MyApp = StackNavigator(RouteConfigs, StackNavigatorConfig);
module.exports = MyApp;