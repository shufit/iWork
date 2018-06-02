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
} from 'react-native-global-ui';

import { Calendar, CalendarList, Agenda,LocaleConfig } from 'react-native-calendars';

const {A, a} = Grid;


class AttendanceDetailScreen extends XAppBaseScreen {

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
            markedDates:{
            }
        };
    }

    componentDidMount() {

        let dates = ['2018-06-16', '2018-06-17', '2018-06-18', '2018-06-19', '2018-06-20', '2018-06-21'];
        let value = {
            customStyles: {
                container: {
                    backgroundColor: 'red',
                    elevation: 2
                },
                text: {
                    color: 'white',
                },
            }
        };
        let markedDates = {};

        for (let i = 0 ;i < dates.length; i ++) {
            let key  = dates[i];
            markedDates[key] = value;
        }
        this.setState({
            markedDates:markedDates,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this._renderCalendar()}
                    {this._renderDesContent()}
                </ScrollView>
            </View>
        );
    }

    _renderCalendar() {

        LocaleConfig.locales['cn'] = {
            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            monthNamesShort: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
            dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六']
        };

        LocaleConfig.defaultLocale = 'cn';


        let theme = {
            calendarBackground: '#fff',
            textSectionTitleColor: '#2e343b',
            dayTextColor: '#1f1f1f',
            todayTextColor: 'white',
            textDayFontSize: 20,
            selectedDayTextColor: 'white',
            monthTextColor: '#2e343b',
            selectedDayBackgroundColor: '#0079d7',
            arrowColor: '#8d99a6',
                // textDisabledColor: 'red',
            'stylesheet.calendar.header': {

            },
            'stylesheet.calendar.main': {
                dayContainer: {
                    width: 4 * a,
                },
            },
            'stylesheet.day.basic':{
            }

        };

        return (
            <Calendar
                // Collection of dates that have to be marked. Default = {}
                markingType={'custom'}
                markedDates={this.state.markedDates}
                monthFormat={'yyyy - MM'}

                dayComponent={({date, state, marking}) => {
                    if ( !(marking instanceof Array)) {
                        console.log('marking' + marking);
                        return (
                            <View style={{ height: 5* a, width:5 * a, alignItems:'center', justifyContent:'center'}}>

                                <Image style={{position:'absolute', left:0, top:0,height:5 * a, width: 5 * a}} resizeMode={'stretch'} source={require('../Images/calendar_icon1.png')}/>
                                <Text style={{textAlign: 'center', color:'#1f1f1f', fontSize:18}}>
                                    {date.day}
                                </Text>
                            </View>

                        );
                    } else if (state === 'today') {
                        return(
                            <View style={{ height: 5* a, width:5 * a, alignItems:'center', justifyContent:'center'}}>

                                <Image style={{position:'absolute', left:0, top:0,height:5 * a, width: 5 * a}} resizeMode={'stretch'} source={require('../Images/calendar_icon3.png')}/>
                                <Text style={{textAlign: 'center', color:'#1f1f1f', fontSize:18}}>
                                    {date.day}
                                </Text>
                            </View>
                        );

                    } else if (state === 'selected') {
                        return (
                            <View style={{ height: 5* a, width:5 * a, alignItems:'center', justifyContent:'center'}}>

                                <Image style={{position:'absolute', left:0, top:0,height:5 * a, width: 5 * a}} resizeMode={'stretch'} source={require('../Images/calendar_icon2.png')}/>
                                <Text style={{textAlign: 'center', color:'#fff', fontSize:18}}>
                                    {date.day}
                                </Text>
                            </View>
                        );

                    }
                    else {
                        return (
                            <View style={{ height: 5* a, width:5 * a}}><Text
                                style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : '#1f1f1f', fontSize: 18}}>{date.day}</Text></View>
                        );
                    }
                }}

                onMonthChange={(month)=>{
                    console.warn('month:' + month);
                }}

                onDayPress={(day)=>{

                }}
                theme={theme}

            />
        );
    }
    _renderDesContent() {
        return (
            <View style={{backgroundColor:'#fff',flex:1, width: 60 * a, paddingHorizontal: 2* a, flexDirection:'column',paddingTop: 2 * a}}>
                <View style={{backgroundColor:'#8d99a6', height:StyleSheet.hairlineWidth, width: 56 * a}}/>
                <Text style={{
                    fontSize: 14,
                    color:'#0079d7',
                    lineHeight:32,
                }}>
                    {'缺出考勤'}
                </Text>
                <Text style={{
                    fontSize: 12,
                    color:'#5a5a5a',
                    lineHeight:20,
                }}>
                    {'你于2018-04-25日，缺少下班打卡信息，请及时处理异常，若有疑问，请及时联系部门文员！\n' +
                    '考勤异常审批流程存在延误，若已处理，无需理会此条信息'}
                </Text>
                <Text style={{
                    fontSize: 14,
                    color:'#0079d7',
                    lineHeight:32,
                }}>
                    {'早退'}
                </Text>
                <Text style={{
                    fontSize: 12,
                    color:'#5a5a5a',
                    lineHeight:20,
                }}>
                    {'你于2018-04-25日，存在早退打卡考勤信息，请及时处理异常，若有疑问，请及时联系部门文员！\n' +
                    '考勤异常审批流程存在延误，若已处理，无需理会此条信息'}
                </Text>
                <View style={{backgroundColor:'#8d99a6', height:StyleSheet.hairlineWidth, width: 56 * a, marginTop: 8 * a, marginBottom: 3 * a}}/>
                <View style={{
                    width: 56 * a,
                    height: 6 * a,
                    flexDirection:'row',
                    alignItems:'center',

                }}>
                    <Text style={{fontSize:14, color:'#000'}}>{'注： '}</Text>
                    <Image style={{height: 2 * a, width: 2 * a}} source={require('../Images/calendar_icon1.png')} resizeMode={'stretch'}/>
                    <Text style={{fontSize:14, color:'#000'}}>{'   表示\"当天\"签到异常    '}</Text>
                    <Image style={{height: 2 * a, width: 2 * a}} source={require('../Images/calendar_icon3.png')} resizeMode={'stretch'}/>
                    <Text style={{fontSize:14, color:'#000'}}>{'  表示\"今天\"'}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default AttendanceDetailScreen;