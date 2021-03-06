

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

class LoginScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        headerTitle:'欧菲iWork平台',
        headerTitleStyle:{
            fontSize:18,
            color:'white',
            fontWeight:'500',
        },
        headerStyle: {
            backgroundColor:'#0079d7',
        },

    });

    constructor(props) {
        super(props);
        this.userName = '';
        this.password = '';

    }

    componentDidMount() {

    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImg}
                       source={require('../Images/login_background_img.png')}
                       resizeMode={'cover'}
                >
                    <Image
                        style={styles.iconTitle}
                        source={require('../Images/icon_title.png')}
                        resizeMode={'stretch'}
                    />
                    <View style={styles.inputContainerView}>
                        <Text style={styles.labelText}>{'用户名'}</Text>
                        <View style={styles.verticalLine}/>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'请输入你的工号'}
                            padding={0}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text)=>{
                                this.userName = text;
                            }}
                        />
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.labelText}>{'密   码'}</Text>
                        <View style={styles.verticalLine}/>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'初始密码为Of+身份证后6位'}
                            secureTextEntry={true}
                            padding={0}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text)=>{
                                this.password = text;
                            }}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={()=>{
                            this._loginAction();
                        }}>
                            <View style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>{'登录'}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{
                            this._findPwdAction();
                        }}>
                            <Text style={styles.findPwdButtonText}>{'找回密码'}</Text>
                        </TouchableOpacity>

                    </View>

                </ImageBackground>
            </View>
        );
    }


    /*
    ***登录
     */
    _loginAction() {

        //登录成功后替换成首页
        // httpGet('https://api.douban.com/v2/movie/top250?start=0&count=20', {
        // }, {
        //     'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJVLTliZGJhNjBjMjZiMDQwZGJiMTMwYWRhYWVlN2FkYTg2IiwiZXhwaXJhdGlvblRpbWUiOjE0NzUxMTg4ODU4NTd9.ImbjXRFYDNYFPtK2_Q2jffb2rc5DhTZSZopHG_DAuNU'
        // })
        //     .then((response)=>{
        //
        //     })
        //     .catch((err)=>{
        //
        //     });
        this.replace('main', {}, null);

    }

    /*
    ***找回密码
     */

    _findPwdAction() {

        this.push('findPwd', {
            title:'找回密码',
            showBackTitle: false,
            onBackPress:()=>{
                this.pop();
            }
        }, null);

    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    backgroundImg: {
        flex:1,
        width:60 * a,
        flexDirection:'column',
        alignItems:'center',
        paddingTop: 20 * a,
    },
    iconTitle: {
        width:45 * a,
        height:6 * a,
    },
    inputContainerView:{
        width:45 * a,
        height:6 * a,
        borderWidth:1,
        borderColor:'#0079d7',
        borderRadius: 2 * a,
        backgroundColor:'transparent',
        flexDirection:'row',
        alignItems:'center',
        marginTop: 4 * a,

    },
    labelText:{
        fontSize:14,
        fontWeight:'100',
        color:'#0079d7',
        marginLeft:2 * a,
        marginRight:0.5* a,
        width: 8 * a,
    },
    textInput:{
        height: 5 * a,
        width: 33 * a,
        backgroundColor:'transparent',
        borderWidth:0,
        marginLeft: 1.5 * a,
    },
    buttonContainer:{
        flex:1,
        flexDirection:'column',
        alignItems:'flex-end',

    },
    loginButton: {
        width:45 * a,
        height:6 * a,
        backgroundColor:'#0079d7',
        borderRadius:2 * a,
        marginTop: 6 * a,
        alignItems:'center',
        justifyContent:'center',
    },
    loginButtonText:{
        fontSize:20,
        color:'#fff',
    },
    findPwdButtonText:{
        fontSize: 12,
        color:'#0079d7',
        marginTop:3 * a,
    },
    //分割横线
    dividingLine: {
        backgroundColor: '#E8E8E8',
        height: 0.5,
        width: 60 * a * 0.9
    },
    //分割竖线
    verticalLine: {
        backgroundColor: '#0079d7',
        height: 14,
        width: 0.5
    }


});

export default LoginScreen;



