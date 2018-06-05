

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground, Alert
} from 'react-native';

import {
    Font,
    FontWeight,
    Grid,
} from 'AppTheme';

import {
    XAppBaseScreen,
    NormalNavigationOptions,
    UserAvatar,

} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui';

import {NavigationActions} from 'react-navigation';

const {A, a} = Grid;


class MeCellItem extends Component {
    constructor(props) {
        super(props);
        this.iconSource = props.iconSource || undefined;
        this.title = props.title || undefined;
        this.onClick = props.onClick || undefined;
        this.style = props.style || undefined;
    }

    render() {
        return (

            <View style={[styles.meCellItem, this.styles]}>
                <TouchableOpacity onPress={() => {
                    this.onClick && this.onClick();
                }}>
                    <View style={styles.meSubCellItem}>
                        <Image
                            source={this.iconSource}
                            style={styles.cellItemIcon}
                            resizeMode={'stretch'}
                        />
                        <Text style={styles.cellItemText}>{this.title}</Text>
                        <Image
                            source={require('../../Images/Portal/menhu_07.png')}
                            style={styles.leftArrowIcon}
                            resizeMode={'stretch'}
                        />

                    </View>
                </TouchableOpacity>
                <View style={styles.dividingLine}/>
            </View>
        );
    }
}

class OfilmMeTabScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        headerTitle:'我的',
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
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.contentContainer}>
                        {this._renderHeader()}
                        {this._renderMeList()}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _renderHeader() {
        return (
            <ImageBackground
                style={styles.headerBackground}
                source={require('../../Images/Me/my_header.png')}
            >
                <UserAvatar
                    size={15*a}
                    borderColor={'#fff'}
                    borderWidth={3}
                    name={'木易之心'}
                />
                <View style={styles.userInfoView}>
                    <Text style={styles.userNameText}>{'木易之心'}</Text>
                    <Text style={styles.departmentText}>{'智慧城市事业部'}</Text>
                    <View style={styles.headerDividingLine}/>

                </View>

            </ImageBackground>
        );
    }

    _renderMeList() {
        return (
            <View style={styles.listView}>

                <MeCellItem
                    title={'重新绑定手机号码'}
                    iconSource={require('../../Images/Me/me_icon01.png')}
                    onClick={()=>{
                        this.push('bindPhone', {
                            title:'重新绑定手机号',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null)
                    }}
                />
                <MeCellItem
                    title={'修改密码'}
                    iconSource={require('../../Images/Me/me_icon02.png')}
                    onClick={()=>{

                        this.push('resetPwd', {
                            title:'重置密码',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null)

                    }}
                />
                <MeCellItem
                    title={'关于iWork'}
                    iconSource={require('../../Images/Me/me_icon03.png')}
                    onClick={()=>{
                        this.push('aboutIWork', {
                            title:'关于iWork',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        },null)
                    }}
                />

                <MeCellItem
                    title={'退出登录'}
                    iconSource={require('../../Images/Me/me_icon04.png')}
                    onClick={()=>{

                        /*
                        **  重置路由，将根页面设置成登录页面
                         */
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName:'login', params:{}})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
                    }}
                />


            </View>
        );
    }
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    contentContainer:{
        flex:1,
        backgroundColor: '#fff',
        flexDirection:'column',
    },

    headerBackground: {
        width: 60 * a,
        height: 30 * a,
        flexDirection:'row',
        paddingRight: 5 * a,
        paddingLeft: 5 * a,
        alignItems:'center',
    },

    userInfoView: {
        height: 15 * a,
        width: 35 * a,
        backgroundColor:'transparent',
        marginLeft: 3 * a,
    },

    userNameText:{
        fontSize: 20,
        color:'#fff'
    },
    departmentText:{
        fontSize: 14,
        color:'#fff',
        marginTop: 2 * a,
        marginBottom: 2 * a,
    },

    listView:{
        flex:1,
        flexDirection:'column',
        marginLeft: 3 * a,
        marginRight: 3 * a,

    },

    meCellItem:{
        width: 54 * a,
        height: 8 * a,
        flexDirection:'column',
    },
    meSubCellItem:{
        width: 60 * a,
        height:(8 * a -1),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 3 * a,
        paddingRight: 3 * a,
    },
    //分割横线
    dividingLine: {
        backgroundColor: 'lightgray',
        height: StyleSheet.hairlineWidth,
        width: 54 * a
    },
    headerDividingLine:{
        backgroundColor:'#add8e6',
        height: 2,
        width: 35 * a,
    },
    cellItemIcon:{
        width: 4 * a,
        height: 4 * a,
        marginRight: 2 * a,
    },
    cellItemText:{
        fontSize:16,
        color:'gray',
        width: 40 * a,
    },
    leftArrowIcon:{
        width: 4 * a,
        height: 3.5* a,
    }

});

export default OfilmMeTabScreen;