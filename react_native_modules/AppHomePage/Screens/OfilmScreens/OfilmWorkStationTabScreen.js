

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
    ImageBackground,
    Alert,
} from 'react-native';

import {
    Font,
    FontWeight,
    Grid,
} from 'AppTheme';

import {
    XAppBaseScreen,
    NormalNavigationOptions,

} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;



class WorkStationItem extends Component {

    constructor(props) {
        super(props);
        this.iconSource = props.iconSource || undefined;
        this.title = props.title || undefined;
        this.onClick = props.onClick || undefined;
        this.style = props.style || undefined;
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.onClick && this.onClick();
            }}>
                <View style={[styles.itemContainer, this.style]}>
                    <Image
                        style={styles.itemIcon}
                        source={this.iconSource}
                    />
                    <Text>{this.title ||''}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}



class OfilmWorkStationTabScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        headerTitle:'工作台',
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
                        <Text style={styles.blockTitle}>{'个人自助'}</Text>
                        {this._renderSelfHelp()}
                        <Text style={styles.blockTitle}>{'审批服务'}</Text>
                        {this._renderApprovalService()}
                        <Text style={styles.blockTitle}>{'服务热线'}</Text>
                        {this._renderHotline()}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _renderSelfHelp() {

        return(

                <View style={styles.blockContainer}>
                    <WorkStationItem
                        title={'工资'}
                        iconSource={require('../../Images/WorkStation/gzt_01.png')}
                        onClick={()=>{
                            this.push('mySalary', {
                                title:'工资',
                                showBackTitle: false,
                                onBackPress:()=>{
                                    this.pop();
                                }
                            }, null);
                        }}
                    />
                    <WorkStationItem
                        title={'一卡通'}
                        iconSource={require('../../Images/WorkStation/gzt_02.png')}
                        onClick={()=>{

                            this.push('oneCard', {
                                title:'一卡通',
                                showBackTitle: false,
                                onBackPress:()=>{
                                    this.pop();
                                }
                            })

                        }}
                    />
                    <WorkStationItem
                        title={'银行卡'}
                        iconSource={require('../../Images/WorkStation/gzt_03.png')}
                        onClick={()=>{
                            this.push('myBankCard', {
                                title:'银行卡',
                                showBackTitle: false,
                                onBackPress:()=>{
                                    this.pop();
                                }
                            }, null)
                        }}
                    />
                    <WorkStationItem
                        title={'考勤'}
                        iconSource={require('../../Images/WorkStation/gzt_04.png')}
                        onClick={()=>{
                            this.push('attendance', {
                                title:'考勤',
                                showBackTitle: false,
                                onBackPress:()=>{
                                    this.pop();
                                }
                            }, null)
                        }}
                    />
                    <WorkStationItem
                        title={'派车'}
                        iconSource={require('../../Images/WorkStation/gzt_05.png')}
                        onClick={()=>{

                        }}
                    />
                </View>
        );
    }

    _renderApprovalService() {

        return(
            <View style={styles.blockContainer}>

                <WorkStationItem
                    title={'待处理'}
                    iconSource={require('../../Images/WorkStation/gzt_06.png')}
                    onClick={()=>{

                    }}
                />
                <WorkStationItem
                    title={'已处理'}
                    iconSource={require('../../Images/WorkStation/gzt_07.png')}
                    onClick={()=>{

                    }}
                />
                <WorkStationItem
                    title={'流程统计'}
                    iconSource={require('../../Images/WorkStation/gzt_08.png')}
                    onClick={()=>{

                    }}
                />

            </View>
        );
    }

    _renderHotline() {

        return(
            <View style={styles.blockContainer}>
                <WorkStationItem
                    title={'IT服务'}
                    iconSource={require('../../Images/WorkStation/gzt_09.png')}
                    onClick={()=>{
                        this.push('itService', {
                            title:'IT服务',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null)
                    }}
                />
                <WorkStationItem
                    title={'人资'}
                    iconSource={require('../../Images/WorkStation/gzt_10.png')}
                    onClick={()=>{
                        this.push('HRService', {
                            title:'人资服务',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null)
                    }}
                />
                <WorkStationItem
                    title={'宿管服务'}
                    iconSource={require('../../Images/WorkStation/gzt_11.png')}
                    onClick={()=>{
                        this.push('hostelService', {
                            title:'宿管服务',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null);
                    }}
                />
                <WorkStationItem
                    title={'食堂服务'}
                    iconSource={require('../../Images/WorkStation/gzt_12.png')}
                    onClick={()=>{

                        this.push('foodService', {
                            title:'食堂服务',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        },)

                    }}
                />
                <WorkStationItem
                    title={'班车服务'}
                    iconSource={require('../../Images/WorkStation/gzt_13.png')}
                    onClick={()=>{
                        this.push('busService', {
                            title:'班车服务',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null)
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
    blockTitle:{
        fontSize: 15,
        color:'#0079d7',
        marginTop: 2 * a,
        marginBottom: 2 * a,
        marginLeft: 3 * a,
    },
    blockContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:1.5 * a,
        paddingRight:1.5 * a,
    },
    itemContainer:{
        width: 16 * a,
        height: 6 * a,
        backgroundColor:'#f1f1f1',
        borderRadius: 4,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:1.5 * a,
        marginRight:1.5 * a,
        marginTop:1.5 * a,
        marginBottom:1.5 *a,

    },

    itemIcon:{
        width: 2.5 * a,
        height: 3 * a,
        marginLeft:1.5 * a,
        marginRight:1.5 * a,
    },
    itemTitle:{
        fontSize:14,
    }

});

export default OfilmWorkStationTabScreen;