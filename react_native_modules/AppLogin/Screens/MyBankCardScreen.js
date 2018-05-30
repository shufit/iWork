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

class MyBankCardScreen extends XAppBaseScreen {


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
                {this._renderHeader()}
                {this._renderContent()}
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
                source={require('../Images/my_card_header.png')}
                resizeMode={'stretch'}
            >
            </ImageBackground>
        );
    }

    _renderContent() {
        return (
            <View style={{
                flex:1,
                width: 60 * a,
                flexDirection:'column',
                paddingHorizontal: 3 * a,
                paddingTop: 3 * a,
                paddingBottom: 10 * a,
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <Text style={{
                    fontSize:14,
                    color:'#757575',
                    lineHeight: 2 * 14,
                }}>
                    {'南昌园区：\n1.为了不影响工资发放，请绑定本人银行卡\n2.每月12号前绑定，当月生效；12号后绑定，次月生效\n3.对于12号绑定银行卡的员工，为了可以正常发工资，每月25号左右安排补发工资，如果25号前未成功绑定银行卡。工资顺延至次月发放。'}
                </Text>
                <TouchableOpacity onPress={()=>{
                        this.push('modifyBindCard', {
                            title:'更绑银行卡',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null)
                }}>
                    <View style={{
                        width:45 * a,
                        height:6 * a,
                        backgroundColor:'#0079d7',
                        borderRadius: 2 * a,
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            fontSize:20,
                            color:'#fff',
                        }}>
                            {'更绑银行卡'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        flexDirection:'column',
    },
});

export default MyBankCardScreen;