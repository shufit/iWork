/**
 * Created by shixiaohui on 19/4/18.
 */

import {StackNavigator} from "react-navigation";
import React, {Component} from "react";
import {Platform, StyleSheet, Text, Button, View, Image} from "react-native";



import AppTabScreenNavigator from './XAppTabNavigator';
// import {
//     WebView
// } from 'AppJSBridge';

import {
    LoginScreen,
    FindPwdScreen,
    ResetPwdScreen,
} from 'AppLogin';

import {
    EAPMainScreen,
    PsychologicalHallScreen,
    HealthLifeScreen,
    InterestingTestScreen,
} from 'EAPCenter'

import XAppNavigationScreen from '../tests/XAppNavigationScreen';


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

    // //webViewScreen加载H5页面
    // webView: {
    //     screen: WebView,
    // },
    test: {
        screen: XAppNavigationScreen,
    },



    /*********************************************AppLogin模块页面*********************************************************/
    /*
    *** LoginScreen登录页面
     */
    login: {
        screen: LoginScreen,
    },
    findPwd:{
        screen: FindPwdScreen,
    },
    resetPwd:{
       screen: ResetPwdScreen,
    },

    /***********************************************************************************************************************/


    /*********************************************EAPCenter模块页面*********************************************************/

    EAPCenter:{
        screen:EAPMainScreen,
    },
    psychologicalHall:{
        screen:PsychologicalHallScreen,
    },
    healthLife:{
        screen:HealthLifeScreen,
    },
    interestingTest:{
        screen:InterestingTestScreen,
    },
    /*********************************************************************************************************************/

};

const StackNavigatorConfig = {

    initialRouteName:'login',
    headerMode: 'screen',
    mode: 'card',
    navigationOptions: {
        gesturesEnabled: false,
    },

};


const MyApp = StackNavigator(RouteConfigs, StackNavigatorConfig);
module.exports = MyApp;