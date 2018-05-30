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

class MySalaryScreen extends XAppBaseScreen {

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
        headerRight: (
            <TouchableOpacity onPress={()=>{
                navigation.push && navigation.push('mySalaryDetail', {
                    title:'工资明细',
                    showBackTitle: false,
                    onBackPress:()=>{
                        navigation.pop && navigation.pop();
                    }
                }, null)
            }}>
                <View style={{backgroundColor:'transparent', height: 5 * a, width: 15 * a, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:16, color:'#fff',textAlign:'center'}}>{'明细'}</Text>
                </View>

            </TouchableOpacity>
        ),
    });

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                {this._renderDescription()}
            </View>
        );
    }

    _renderHeader() {
        return (
            <ImageBackground
                style={styles.headerBackground}
                source={require('../Images/my_salary_header.png')}
                resizeMode={'stretch'}
            >
                <SelectInput
                    style={{
                        backgroundColor:'transparent',
                        marginTop: a,
                        marginLeft: a,
                        borderWidth:0,
                        width: 13 * a,
                        height: 8 * a,

                    }}
                    iconImg={require('../Images/dropdown_yellow_icon.png')}
                    options={['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份']}
                    textStyle={{
                        color:'#eaff00',
                        fontSize: 16,
                    }}
                    dropdownStyle={{
                        backgroundColor:'transparent',
                    }}
                    defaultIndex={0}
                    animated={false}
                    defaultValue={'选择月份'}
                    onSelect={(rowID, rowData)=>{

                    }}
                />
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.salaryTitle}>
                        {'总工资'}
                    </Text>
                    <Text style={styles.salaryValue}>
                        {'￥888888.00'}
                    </Text>
                </View>
            </ImageBackground>
        );
    }

    _renderDescription() {
        return (
            <Text style={styles.descriptionText}>
                {'温馨提示：\n1.为了保障您账户安全，请定期修改登录密码\n2.工资实际到账以银行为准'}
            </Text>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        flexDirection:'column',
    },
    headerBackground: {
        flexDirection:'column',
        width: 60 * a,
        height: 35 * a,
    },
    subHeaderContainer:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        width: 60 * a,
        backgroundColor:'transparent'
    },
    salaryTitle:{
        fontSize: 18,
        color:'#fff',
        textAlign:'center',
        marginTop: a,

    },
    salaryValue:{
        fontSize:  40,
        color:'#fff',
        textAlign:'center',
        marginTop: 4 * a,

    },
    descriptionText:{
        fontSize: 16,
        color:'#757575',
        lineHeight: 2.5 * 14,
        marginTop: 2 * a,
        marginLeft: 2 * a,

    }
});


export default MySalaryScreen;
