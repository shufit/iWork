/**
 * Created by shixiaohui on 19/4/18.
 */
import {TabNavigator} from "react-navigation";
import React, {Component} from "react";
import {Platform, StyleSheet, Text, Button, View, Image} from "react-native";


// import XAppFirstTabScreen from "./XAppFirstTabScreen"; //tab第一个页面
// import XAppSecondTabScreen from "./XAppSecondTabScreen"; //tab第二个页面
// import XAppThirdTabScreen from "./XAppThirdTabScreen"; //tab第三个页面
// import XAppFourthTabScreen from "./XAppFourthTabScreen"; //tab第四个页面

import OfilmHomeTabScreen from './OfilmScreens/OfilmHomeTabScreen';
import OfilmWorkStationTabScreen from './OfilmScreens/OfilmWorkStationTabScreen';
import OfilmPortalTabScreen from './OfilmScreens/OfilmPortalTabScreen';
import OfilmMeTabScreen from './OfilmScreens/OfilmMeTabScreen';


const AppTabScreenNavigator = TabNavigator({

    tabPageOne:{
        screen:OfilmHomeTabScreen,
        navigationOptions:{
            title:'首页',
            tabBarVisible:true,
            swipeEnabled:false,
            tabBarIcon:({focused,tintColor })=>{
                if (focused) {
                    return (
                        <Image
                            source={require('../Images/tab_first_page_pre.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                } else {
                    return (
                        <Image
                            source={require('../Images/tab_first_page_nor.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                }

            }

        }
    },
    tabPageTwo:{
        screen:OfilmWorkStationTabScreen,
        navigationOptions:{
            title:'工作台',
            tabBarVisible:true,
            swipeEnabled:false,
            tabBarIcon:({focused,tintColor })=>{
                if (focused) {
                    return (
                        <Image
                            source={require('../Images/tab_second_page_pre.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                } else {
                    return (
                        <Image
                            source={require('../Images/tab_second_page_nor.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                }

            }

        }

    },
    tabPageThree:{
        screen:OfilmPortalTabScreen,
        navigationOptions:{
            title:'门户',
            tabBarVisible:true,
            swipeEnabled:false,
            tabBarIcon:({focused,tintColor })=>{
                if (focused) {
                    return (
                        <Image
                            source={require('../Images/tab_third_page_pre.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                } else {
                    return (
                        <Image
                            source={require('../Images/tab_third_page_nor.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                }

            }

        }
    },
    tabPageFour:{
        screen:OfilmMeTabScreen,
        navigationOptions:{
            title:'我的',
            tabBarVisible:true,
            swipeEnabled:false,
            tabBarIcon:({focused,tintColor })=>{
                if (focused) {
                    return (
                        <Image
                            source={require('../Images/tab_fourth_page_pre.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                } else {
                    return (
                        <Image
                            source={require('../Images/tab_fourth_page_nor.png')}
                            style={[styles.tabIcon, tintColor]}
                        />
                    );
                }

            }

        }
    }

}, {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#fff', // 文字和图片选中颜色
        inactiveTintColor: '#fff', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#0079d7', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
        tabStyle: {},
    },
    }
);

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    tabIcon:{
        height:22,
        width:22,
        resizeMode:'contain'
    }
});

module.exports = AppTabScreenNavigator;