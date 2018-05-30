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
} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;

class MySalaryDetailScreen extends XAppBaseScreen {

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

    constructor(props){
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this._renderCell('基本工资','2000.00')}
                    {this._renderCell('技能工资','2000.00')}
                    {this._renderCell('岗位工资', '2000.00')}
                </ScrollView>
            </View>
        );
    }

    _renderCell(title, subtitle) {
        return (
            <View style={{
                width: 60 * a,
                height: 6 * a,
                flexDirection:'column',
            }}>
                <View style={{
                    width: 60 * a,
                    height: 6 * a - StyleSheet.hairlineWidth,
                    flexDirection:'row',
                    paddingHorizontal: 3 * a,
                    alignItems:'center',
                    justifyContent:'space-between',
                }}>
                    <Text style={{fontSize:14,color:'#212020', textAlign:'left'}}>{title}</Text>
                    <Text style={{fontSize: 14, color:'#797878', textAlign:'right'}}>{subtitle}</Text>
                </View>
                <View style={{
                    width: 60 * a,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor:'#f6f6f6'
                }}>
                </View>
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

export default MySalaryDetailScreen;