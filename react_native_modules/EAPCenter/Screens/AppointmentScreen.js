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
    TextInput,
    Picker,
    TouchableWithoutFeedback,
} from 'react-native';

import {
    Font,
    FontWeight,
    Grid,
} from 'AppTheme';

import {
    XAppBaseScreen,
    NormalNavigationOptions,
    Swiper,
    DatePickerModal,
    RadioGroup,
    RadioButton,
    CheckBox,
    DropdownModal,
    SelectInput,

} from 'AppBase';


import {
    Loading,
    HUD,
} from 'react-native-global-ui';



const {A, a} = Grid;

class AppointmentScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...NormalNavigationOptions({navigation, navigationOptions}),
        ...navigationOptions,
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
        this.state = {
            showDatePicker:false,
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View
                        style={styles.contentContainer}
                    >
                        {this._renderNameInput()}
                        {this._renderSexInput()}
                        {this._renderPhoneInput()}
                        {this._renderAgeInput()}
                        {this._renderQuestionInput()}
                        {this._renderAnswerInput()}
                        {this._renderAppointmentDateInput()}
                        {this._renderProtocol()}
                        {this._renderConfirmButton()}
                    </View>
                </ScrollView>
            </View>
        );
    }


    _renderNameInput() {
        return (
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    height: 8 * a,
                    width: 56 * a,
                    paddingVertical: 2 * a,

                }}
            >
                <Text
                    style={{
                        fontSize:14,
                        color: '#8b8b8b'
                    }}
                >{'姓名：'}
                </Text>
                <TextInput
                    placeholder={''}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                    style={{
                        backgroundColor:'transparent',
                        borderWidth:1,
                        borderColor:'#c1c1c1',
                        height:4 * a,
                        flex:1,

                    }}
                >
                </TextInput>

            </View>
        )
    }

    _renderSexInput() {
        return (
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    height: 8 * a,
                    width: 56 * a,
                    paddingVertical: 2 * a,
                }}
            >
                <Text
                    style={{
                        fontSize:14,
                        color: '#8b8b8b'
                    }}
                >
                    {'性别：'}
                </Text>
                <RadioGroup
                    style={{
                        flexDirection:'row',
                    }}
                    activeColor={'#8b8b8b'}
                    color={'#8b8b8b'}
                    selectedIndex={0}
                    onSelect = {(index, value) => {
                        console.warn('index'+ index +'value' +value)
                    }}
                >
                    <RadioButton value={'male'} >
                        <Text style={{fontSize:14,color:'#8b8b8b'}}>{'男'}</Text>
                    </RadioButton>

                    <RadioButton value={'female'}>
                        <Text style={{fontSize:14,color:'#8b8b8b'}}>{'女'}</Text>
                    </RadioButton>

                </RadioGroup>
            </View>
        );
    }

    _renderPhoneInput() {
        return (
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    height: 8 * a,
                    width: 56 * a,
                    paddingVertical: 2 * a,

                }}
            >
                <Text
                    style={{
                        fontSize:14,
                        color: '#8b8b8b'
                    }}
                >{'手机：'}
                </Text>
                <TextInput
                    placeholder={''}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                    style={{
                        backgroundColor:'transparent',
                        borderWidth:1,
                        borderColor:'#c1c1c1',
                        height:4 * a,
                        flex:1,

                    }}
                >
                </TextInput>

            </View>
        )
    }

    _renderAgeInput() {
        return (
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    height: 8 * a,
                    width: 56 * a,
                    paddingVertical: 2 * a,

                }}
            >
                <Text
                    style={{
                        fontSize:14,
                        color: '#8b8b8b'
                    }}
                >{'年龄：'}
                </Text>
                <TextInput
                    placeholder={''}
                    padding={0}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text)=>{

                    }}
                    style={{
                        backgroundColor:'transparent',
                        borderWidth:1,
                        borderColor:'#c1c1c1',
                        height:4 * a,
                        flex:1,

                    }}
                >
                </TextInput>

            </View>
        )
    }

    _renderQuestionInput() {
        return (
            <View style={{
                flexDirection:'column',
                height: 10 * a,
                width: 56 * a,
                justifyContent:'space-around',
            }}>
                <Text
                    style={
                        {
                            fontSize:14,
                            color: '#8b8b8b'
                        }
                    }
                >
                    {'面临的问题'}
                    </Text>
                <SelectInput
                    style={{
                        width: 56 * a,
                        height: 4 * a,
                    }}
                    options={['家庭性感', '恋爱情感', '婚姻情感', '...']}
                    onSelect={(rowID, rowData)=>{

                    }}
                    defaultValue={'请选择问题类型'}
                    animated={false}
                >
                </SelectInput>

            </View>
        );
    }

    _renderAnswerInput() {
        return (
            <View
                style={{
                    flexDirection:'column',
                    height: 15 * a,
                    width: 56 * a,
                    justifyContent:'space-between',
                }}
            >
                <Text style={{fontSize:14, color:'#8b8b8b',marginTop:a,}}>{'你期待从咨询中获得什么帮助'}</Text>
                <Text style={{fontSize:12, color:'#c1c1c1', marginTop:a, lineHeight:parseInt(1.5 * 10)}}
                      numberOfLines={2}
                >
                    {'(我们认为自己才是解决自己问题的大师，我们不会给予答案，而是双方共同去探索解决办法)'}
                    </Text>
                <TextInput
                    placeholder={''}
                    padding={0}
                    multiline={true}
                    underlineColorAndroid={'transparent'}

                    onChangeText={(text)=>{

                    }}
                    style={{
                        backgroundColor:'transparent',
                        borderWidth:1,
                        borderColor:'#c1c1c1',
                        height:5 * a,
                        flex:1,
                        marginTop: a,

                    }}
                >
                </TextInput>
            </View>
                );
    }

    _renderAppointmentDateInput() {

        return (
            <View
                style={{
                    flexDirection:'column',
                    height: 20 * a,
                    width: 56 * a,
                    justifyContent:'space-between',
                }}
            >
                <Text style={{fontSize:14, color:'#8b8b8b',marginTop:a,}}>{'预约日期'}</Text>
                <Text style={{fontSize:12, color:'#c1c1c1', marginTop:a, lineHeight:parseInt(1.5 * 10)}}
                      numberOfLines={2}
                >
                    {'当前咨询时间段为每周一，三，五晚。当天预约要第二天才能咨询，咨询时间目前有18:30和20:00两个时段'}
                </Text>
                <View
                    style={{
                        flexDirection:'row',
                        height: 5 * a,
                        flex: 1,
                        alignItems:'center',
                    }}

                >
                    <SelectInput
                        style={{
                            width: 20 * a,
                            height: 4 * a,
                        }}
                        options={['2018-5-7', '2018-5-8', '2018-5-9', '2018-5-10']}
                        onSelect={(rowID, rowData)=>{

                        }}
                        defaultValue={'请选择日期'}
                        animated={false}
                    >
                    </SelectInput>

                    <SelectInput
                        style={{
                            width: 15 * a,
                            height: 4 * a,
                            marginLeft: 2 * a,
                        }}
                        options={['18:30', '20:00']}
                        onSelect={(rowID, rowData)=>{
                            console.warn()
                        }}
                        defaultValue={'请选择日期'}
                        animated={false}
                    >
                    </SelectInput>
                </View>
                <Text style={{fontSize:12, color:'#c1c1c1', marginTop:a, lineHeight:parseInt(1.5 * 10)}}
                      numberOfLines={2}
                >
                    {'咨询地点：静境工作室\"心灵家园\"（一号园区五号楼宿舍楼 原移动营业厅）'}
                </Text>

            </View>
        );

    }

    _renderProtocol() {
        return (
            <View
                style={{
                    height:6 * a,
                    width: 56 * a,
                    flexDirection:'row',
                    marginTop: 2 * a,
                }}
            >
                <CheckBox
                    onClick={()=>{

                    }}
                    isChecked={false}
                />
                <TouchableOpacity
                    onPress={()=>{
                        this.push('appointmentProtocol', {
                            title:'EAP预约',
                            showBackTitle: false,
                            onBackPress:()=>{
                                this.pop();
                            }

                        }, null)
                    }}
                >

                    <Text style={{marginLeft: a, fontSize:12, color:'#004cd7', lineHeight:parseInt(1.5 * 10),width: 52 * a,}}
                          numberOfLines={2}
                    >
                        {'咨询地点：静境工作室\"心灵家园\"（一号园区五号楼宿舍楼 原移动营业厅）'}
                    </Text>

                </TouchableOpacity>
            </View>
        );
    }

    _renderConfirmButton() {
        return (
            <TouchableWithoutFeedback onPress={()=>{

                this.push('appointmentSuc', {
                    title:'预约成功',
                    showBackTitle: false,
                    onBackPress:()=>{
                        this.pop();
                    }

                }, null)

            }}>
                <View
                    style={{
                        height: 6 * a,
                        width: 56 * a,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'#ff9600'
                    }}
                >
                    <Text style={{fontSize:16,textAlign:'center',color:'#fff'}}>
                        {'提交'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }


}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    contentContainer:{
        flex:1,
        paddingHorizontal: 2 * a,
        flexDirection: 'column',
    }
});

export default AppointmentScreen;