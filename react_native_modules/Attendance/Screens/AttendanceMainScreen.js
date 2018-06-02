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


class AttendanceCellItem extends Component {

    constructor(props) {
        super(props);
        this.title = props.title || '';
        this.subTitle = props.subTitle || '';
        this.imgSource = props.imgSource || '';
        this.onClick = props.onClick || null;
    }

    render() {
        return (
            <View style={{
                width: 60 * a,
                height:12 * a,
                flexDirection:'column',
            }}>
                <TouchableOpacity onPress={()=>{
                    this.onClick && this.onClick();
                }}>
                    <View style={{
                        paddingLeft: 3 * a,
                        flexDirection:'row',
                        alignItems:'center',
                        height: 12 * a - StyleSheet.hairlineWidth,
                        width: 57 * a,
                    }}>
                        <View style={{height: 8 * a, width: 8 * a , alignItems:'center', justifyContent:'center', backgroundColor:'#0079d7'}}>
                            <Image style={{width: 6 * a, height: 6 * a,}} source={this.imgSource} resizeMode={'stretch'}/>
                        </View>
                        <View style={{marginLeft: 2 * a, height: 7 * a, width: 40 * a, flexDirection:'column', justifyContent:'space-around' }}>
                            <Text style={{fontSize: 16, color:'#434343'}}>{this.title}</Text>
                            <Text style={{fontSize: 14, color:'#8b8b8b'}}>{this.subTitle}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{width: 60 * a, height: StyleSheet.hairlineWidth, backgroundColor:'#8b8b8b'}}/>
            </View>
        );
    }
}

class AttendanceMainScreen extends XAppBaseScreen {

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

    render(props) {
        return (
            <View style={styles.container}>
                <AttendanceCellItem
                    title={'考勤异常'}
                    subTitle={'查看当月考勤异常数据'}
                    imgSource={require('../Images/attendance_icon1.png')}
                    onClick={()=>{
                        this.push('attendanceDetail', {
                            title:'考勤异常',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }
                        }, null)
                    }}
                />
                <AttendanceCellItem
                    title={'门禁异常'}
                    subTitle={'查看当月门禁异常数据'}
                    imgSource={require('../Images/attendance_icon2.png')}
                    onClick={()=>{

                    }}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
    }
});



export default AttendanceMainScreen;