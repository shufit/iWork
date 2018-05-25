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
    Modal,
} from 'react-native';

import {
    Font,
    FontWeight,
    Grid,
} from 'AppTheme';

import CalendarPicker from 'react-native-calendar-picker';

const {A, a} = Grid;


class DatePickerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {modalVisible: props.showDatePicker};
        this.date = '';
        this.onConfirmPress = props.onConfirmPress || undefined;
        this.onCancelPress = props.onCancelPress || undefined;
        this.showDatePicker = props.showDatePicker || undefined;
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            modalVisible:nextProps.showDatePicker || false
        });
    }

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.modalVisible}
            >
                <View
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        position: 'absolute',
                        top:0,
                        bottom:0,
                        left:0,
                        right:0,
                    }}
                >
                    <View
                        style={{
                            flexDirection:'column',
                            alignItems:'center',
                            position: 'absolute',
                            top: 50 * a,
                            bottom: 0,
                            backgroundColor: '#fff',

                        }}
                    >
                        <CalendarPicker
                            weekdays={['一','二','三','四','五','六','日']}
                            months={['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']}
                            todayBackgroundColor='#f2e6ff'
                            selectedDayColor={'#0079d7'}
                            selectedDayTextColor={'#fff'}
                            previousTitle={'上一月'}
                            nextTitle={'下一月'}
                            onDateChange={(date, type)=>{
                                // console.warn(date);
                                this.date = date;
                            }}
                        />

                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                height:10 * a,
                                width: 60 * a,
                                paddingHorizontal: 2 * a,
                            }}
                        >
                            <Button
                                onPress={()=>{
                                    this.setState({
                                        modalVisible:false,
                                    });
                                }}
                                title={'取消'}
                                color={'#808080'}
                            />

                            <Button
                                onPress={()=>{
                                    this.setState({
                                        modalVisible:false,
                                    });
                                    this.onConfirmPress && this.onConfirmPress(this.date);
                                }}
                                title={'确定'}
                                color={'#0079d7'}
                            />
                        </View>


                    </View>
                </View>

            </Modal>
        );
    }

}

export default DatePickerModal;