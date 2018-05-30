import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    TextInput,
} from 'react-native';

import {
    Font,
    FontWeight,
    Grid,
} from 'AppTheme';

import {
    XAppBaseScreen,
    NormalNavigationOptions,
    httpGet,
    SelectInput,
} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;


class OneCardScreen extends XAppBaseScreen {


    static navigationOptions = ({ navigation, navigationOptions })=>({
        ...NormalNavigationOptions({navigation, navigationOptions}),
        ...navigationOptions,
        headerStyle: {
            backgroundColor:'#0079d7',
        },
        headerTitleStyle:{
            fontSize:18,
            color:'white',
            fontWeight:'500',
        },
    });


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this._renderHeader()}
                    {this._renderCell({title:'个人消费', time:'03-27', balance:'余额:400.36', consumption:'-10'})}
                    {this._renderCell({title:'个人消费', time:'03-27', balance:'余额:400.36', consumption:'-10'})}
                    {this._renderCell({title:'个人消费', time:'03-27', balance:'余额:400.36', consumption:'-10'})}
                </ScrollView>
            </View>
        );
    }

    _renderHeader() {
        return (
            <ImageBackground
                style={{
                    width: 60 * a,
                    height: 25 * a,
                    flexDirection: 'row',
                    alignItems:'center',

                }}
                source={require('../Images/one_card_header.png')}
                resizeMode={'stretch'}
            >
                <View style={{width:(60*a-StyleSheet.hairlineWidth)/2, height:13 * a, paddingLeft: 3 * a, flexDirection:'column', justifyContent:'space-between'}}>
                    <Text style={{fontSize:14, color:'#fff'}}>
                        {'可用余额（元）'}
                    </Text>
                    <Text style={{fontSize:30, color:'#fff'}}>
                        {'￥25.00'}
                    </Text>
                </View>
                <View style={{width:StyleSheet.hairlineWidth, height: 18 * a, backgroundColor:'#fff'}}>
                </View>
                <View style={{width:(60*a-StyleSheet.hairlineWidth)/2, height:13 * a, paddingLeft: 3 * a, flexDirection:'column', justifyContent:'space-between'}}>
                    <Text style={{fontSize:14, color:'#fff'}}>
                        {'卡内余额（元）'}
                    </Text>
                    <Text style={{fontSize:30, color:'#fff'}}>
                        {'￥400.36'}
                    </Text>
                </View>
            </ImageBackground>
        );
    }

    _renderCell({title, time, balance, consumption }) {

        return(
            <View style={{
                flexDirection:'column',
                height: 10 * a,
                width: 60 * a,
            }}>
                <View style={{
                    width: 60 * a,
                    height: 10 * a - StyleSheet.hairlineWidth,
                    flexDirection:'column',
                    paddingHorizontal: 3 * a,
                }}>
                    <View style={{flexDirection:'row', width:54 * a, height:(10 * a - StyleSheet.hairlineWidth)/2, alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{fontSize:14, color:'#212020', textAlign:'left'}}>{title}</Text>
                        <Text style={{fontSize:14, color:'#212020', textAlign:'right'}}>{consumption}</Text>
                    </View>
                    <View style={{flexDirection:'row', width:54 * a, height:(10 * a - StyleSheet.hairlineWidth)/2, alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{fontSize:12, color:'#797878', textAlign:'left'}}>{time}</Text>
                        <Text style={{fontSize:12, color:'#797878', textAlign:'right'}}>{balance}</Text>
                    </View>
                </View>
                <View style={{
                    width: 60 * a,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor:'#f6f6f6'
                }}/>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
    }
});

export default OneCardScreen;