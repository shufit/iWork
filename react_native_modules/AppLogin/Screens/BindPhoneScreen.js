
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
    SmsCountDownButton,
} from 'AppBase';

const {A, a} = Grid;

class BindPhoneScreen extends XAppBaseScreen {

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
        return(
            <View style={styles.container}>
                {this._renderHeader()}
                <Text style={styles.subTitle}>{'初次登录需要绑定手机号'}</Text>
                {this._renderPhoneNum()}
                <View style={styles.dividingLine}/>
                {this._renderSmsCode()}
                <View style={styles.dividingLine}/>
                {this._renderNextButton()}
            </View>
        );
    }

    _renderHeader() {
        return (
            <ImageBackground
                style={styles.headerBackground}
                source={require('../Images/findPwd_header_img.png')}
                resizeMode={'stretch'}
            >
            </ImageBackground>
        );
    }

    _renderCardID() {
        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/forget_01.png')}
                />
                <Text style={styles.labelText}>{'工     号'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请输入你的工号'}
                    secureTextEntry={false}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                />
            </View>
        );
    }

    _renderPhoneNum() {
        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/forget_02.png')}
                />
                <Text style={styles.labelText}>{'手机号码'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请输入手机号'}
                    secureTextEntry={false}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                />
                <SmsCountDownButton
                    timerTitle={'发送验证码'}
                    textStyle={
                        {
                            color:'#0079d7',
                            fontSize:12,
                        }
                    }
                    style={{
                        width: 13 * a,
                        height: 6 * a,
                    }}
                    enable={true}
                    onClick={(shouldStartCountting)=>{
                        shouldStartCountting(true);
                        this._sendSmsCode();
                    }}

                />
            </View>
        );
    }

    _renderSmsCode() {
        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/forget_03.png')}
                />
                <Text style={styles.labelText}>{'验证码'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请输入验证码'}
                    secureTextEntry={false}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                />
            </View>
        );
    }

    _renderNextButton() {
        return (
            <TouchableOpacity onPress={()=>{
                this._gotoNextAction();
            }}>
                <View style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>{'确定绑定'}</Text>
                </View>

            </TouchableOpacity>
        );
    }


    _sendSmsCode() {
        //发送短信
    }

    _gotoNextAction() {
        //进行下一步操作

    }


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
    },
    headerBackground:{
        width: 60 * a,
        height: 20 * a,
        flexDirection:'column',
        alignItems:'center',
    },
    iphoneImg:{
        height:10 * a,
        width: 9 * a,
        marginTop: 4 * a,
    },
    phoneAuthorText:{
        color:'#fff',
        fontSize:16,
        marginTop: 3 * a,
    },
    subTitle: {
        color:'gray',
        fontSize: 16,
        marginLeft: 3 * a,
        marginTop: 3 * a,
    },

    //分割横线
    dividingLine: {
        backgroundColor: '#0079d7',
        height: 1,
        width: 51 * a,
        marginLeft: 6 * a,
        marginRight: 3 * a,
    },
    //分割竖线
    verticalLine: {
        backgroundColor: '#0079d7',
        height: 15,
        width: 1
    },

    subInputContainer:{
        height: 8 * a,
        width: 51 * a,
        flexDirection:'row',
        alignItems:'center',
        marginLeft: 6 * a,
        marginRight: 3 * a,
        marginTop: 2 *  a,
        backgroundColor:'#fff',
    },
    subIcon:{
        height: 4.5 * a,
        width: 4.2 * a,
        marginRight: 1 * a,
    },
    labelText: {
        width: 10 * a,
        textAlign:'center',
        color:'#0079d7',
        fontSize: 15,
    },

    inputText:{
        height: 7 * a,
        width: 20 * a,
        marginLeft: 2 * a,

    },
    nextButton: {
        width:51 * a,
        height:6 * a,
        backgroundColor:'#0079d7',
        borderRadius:3 * a,
        marginTop: 6 * a,
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 6 * a,
        marginRight: 3 * a,
    },
    nextButtonText:{
        fontSize:20,
        color:'#fff',
    },
});

export default BindPhoneScreen;