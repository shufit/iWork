
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
import StepIndicator from "../../AppBase/Components/StepIndicator";

const {A, a} = Grid;

class ModifyBindBankCard extends XAppBaseScreen {

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
        this.state = {
            currentPosition:0,
        };
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    {this._renderHeader()}
                    {this._renderAllPages()}
                </ScrollView>
            </View>
        );
    }

    _renderHeader() {

        const customStyles = {
            stepIndicatorSize: 30,
            currentStepIndicatorSize:40,
            separatorStrokeWidth: 3,
            currentStepStrokeWidth: 5,
            separatorFinishedColor: '#fff600',
            separatorUnFinishedColor: 'transparent',
            stepIndicatorFinishedColor: 'transparent',
            stepIndicatorUnFinishedColor: 'transparent',
            stepIndicatorCurrentColor: 'transparent',
            stepIndicatorLabelFontSize: 15,
            currentStepIndicatorLabelFontSize: 15,
            stepIndicatorLabelCurrentColor: '#fff600',
            stepIndicatorLabelFinishedColor: '#fff600',
            stepIndicatorLabelUnFinishedColor: '#ffffff',
            labelColor: '#ffffff',
            labelSize: 12,
            currentStepLabelColor: '#fff600'
        };
        return (
            <ImageBackground
                style={styles.headerBackground}
                source={require('../Images/findPwd_header_img.png')}
                resizeMode={'stretch'}
            >
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.state.currentPosition}
                    stepCount={3}
                    labels={['1.身份认证', '2.手机认证', '3.绑定银行卡']}
                    onPress={(position)=>{
                        this.setState({
                            currentPosition:position,
                        });
                    }}

                    renderStepIndicator={({position, stepStatus})=>{

                        switch (stepStatus){
                            case 'current':
                            case 'finished':
                                return (
                                    <Image
                                        style={{
                                            width:30,
                                            height:30,
                                        }}
                                        resizeMode={'stretch'}
                                        source={require('../Images/bindcard_step_finished.png')}
                                    />
                                );
                                break;
                            case 'unfinished':
                                return (
                                    <Image
                                        style={{
                                            width:30,
                                            height:30,
                                        }}
                                        resizeMode={'stretch'}
                                        source={require('../Images/bindcard_step_unfinished.png')}
                                    />
                                );
                                break;
                        }

                    }}
                />
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

    _renderPersonalID() {
        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/bindcard_personal_id.png')}
                />
                <Text style={styles.labelText}>{'身份证号'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请输入你的身份证号'}
                    secureTextEntry={false}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                />
            </View>
        );
    }

    _renderAddress() {

        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/bindcard_address.png')}
                />
                <Text style={styles.labelText}>{'所在地'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请输入开户行所在地'}
                    secureTextEntry={false}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                />
            </View>
        );

    }

    _renderBankName() {

        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/bindcard_bank.png')}
                />
                <Text style={styles.labelText}>{'银    行'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请输入银行'}
                    secureTextEntry={false}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                />
            </View>
        );

    }

    _renderBankNo() {

        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/bindcard_bankcard.png')}
                />
                <Text style={styles.labelText}>{'银行卡号'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请输入银行卡号'}
                    secureTextEntry={false}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                />
            </View>
        );

    }

    _renderConfirmBankNo() {

        return (
            <View style={styles.subInputContainer}>
                <Image style={styles.subIcon}
                       source={require('../Images/bindcard_bankcard.png')}
                />
                <Text style={styles.labelText}>{'确认卡号'}</Text>
                <View style={styles.verticalLine}/>
                <TextInput
                    style={styles.inputText}
                    placeholder={'请再次输入银行卡号'}
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

    _renderNextButton1() {
        return (
            <TouchableOpacity onPress={()=>{
                this._gotoNextAction1();
            }}>
                <View style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>{'下一步'}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    _renderNextButton2() {
        return (
            <TouchableOpacity onPress={()=>{
                this._gotoNextAction2();
            }}>
                <View style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>{'下一步'}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    _renderConfirmButton() {
        return (
            <TouchableOpacity onPress={()=>{
                this._confirmAction();
            }}>
                <View style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>{'绑定银行卡'}</Text>
                </View>

            </TouchableOpacity>
        );
    }


    _sendSmsCode() {
        //发送短信
    }

    _gotoNextAction1() {
        //进行下一步操作
        this.setState({
            currentPosition: this.state.currentPosition + 1,
        });
    }

    _gotoNextAction2() {
        //进行下一步操作
        this.setState({
            currentPosition: this.state.currentPosition + 1,
        });
    }

    _confirmAction() {

    }

    _renderPageOne() {
        return (
            <View style={styles.container}>
                <Text style={styles.subTitle}>{'请输入你的身份证号'}</Text>
                {this._renderCardID()}
                <View style={styles.dividingLine}/>
                {this._renderPersonalID()}
                <View style={styles.dividingLine}/>
                {this._renderNextButton1()}
            </View>
        );
    }

    _renderPageTwo() {
        return (
            <View style={styles.container}>
                <Text style={styles.subTitle}>{'请输入你的手机号'}</Text>
                {this._renderPhoneNum()}
                <View style={styles.dividingLine}/>
                {this._renderSmsCode()}
                <View style={styles.dividingLine}/>
                {this._renderNextButton2()}
            </View>
        );
    }

    _renderPageThree() {
        return (
            <View style={styles.container}>
                <Text style={styles.subTitle}>{'请绑定本人所持有的银行卡'}</Text>
                {this._renderAddress()}
                <View style={styles.dividingLine}/>
                {this._renderBankName()}
                <View style={styles.dividingLine}/>
                {this._renderBankNo()}
                <View style={styles.dividingLine}/>
                {this._renderConfirmBankNo()}
                <View style={styles.dividingLine}/>
                {this._renderConfirmButton()}
            </View>
        );
    }
    _renderAllPages() {
        switch (this.state.currentPosition) {
            case 0:
                return this._renderPageOne();
                break;
            case 1:
                return this._renderPageTwo();
            case 2:
                return this._renderPageThree();
                break;
            default:
                return (<View/>);
        }
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
        height: 30 * a,
        paddingTop: 5 * a,
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
        width: 22 * a,
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

export default ModifyBindBankCard;