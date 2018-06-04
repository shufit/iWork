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
    BindPhoneScreen,
    ModifyBindBankCard,
    MyBankCardScreen,
} from 'AppLogin';

import {
    EAPMainScreen,
    PsychologicalHallScreen,
    HealthLifeScreen,
    InterestingTestScreen,
    AppointmentScreen,
    AppointmentSuccessScreen,
    AppointmentProtocolScreen,
} from 'EAPCenter';


import {
    MySalaryScreen,
    MySalaryDetailScreen,
} from 'MySalary';


import {
    OneCardScreen,
} from 'OneCard';

import {
    AttendanceMainScreen,
    AttendanceDetailScreen,
} from 'Attendance';


import {
    AboutiWorkScreen,
    HRServiceScreen,
    HostelServiceScreen,
    FoodServiceScreen,
    BusServiceScreen,
} from 'LocalH5Pages';




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
    bindPhone:{
        screen: BindPhoneScreen,
    },
    modifyBindCard:{
        screen:ModifyBindBankCard,
    },
    myBankCard:{
        screen:MyBankCardScreen,
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
    appointment:{
        screen:AppointmentScreen,
    },
    appointmentSuc:{
        screen:AppointmentSuccessScreen,
    },
    appointmentProtocol:{
        screen:AppointmentProtocolScreen,
    },
    /*********************************************************************************************************************/

    /*********************************************MySalary薪资模块页面*********************************************************/
    mySalary:{
        screen:MySalaryScreen,
    },
    mySalaryDetail:{
        screen:MySalaryDetailScreen,
    },

    /*********************************************************************************************************************/

    /*********************************************OneCard一卡通模块页面*********************************************************/
    oneCard:{
        screen:OneCardScreen,
    },
    /*********************************************************************************************************************/


    /*********************************************Attendance考勤模块页面*********************************************************/

    attendance:{
        screen: AttendanceMainScreen,
    },
    attendanceDetail:{
        screen: AttendanceDetailScreen,
    },

    /*********************************************************************************************************************/


    /*********************************************LocalH5Pages模块页面*********************************************************/

    aboutIWork:{
        screen:AboutiWorkScreen,
    },
    HRService: {
        screen:HRServiceScreen,
    },
    hostelService: {
        screen:HostelServiceScreen,
    },
    foodService: {
        screen: FoodServiceScreen,
    },
    busService: {
        screen:BusServiceScreen,
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