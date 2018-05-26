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


import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


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
                        {this._renderCalendar()}
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


    _renderCalendar() {

        return (
            <Calendar
                // Initially visible month. Default = Date()
                // current={'2012-03-01'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2017-05-10'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2020-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {console.log('selected day', day)}}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {console.log('selected day', day)}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
                // Hide month navigation arrows. Default = false
                hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow={(direction) => (<Arrow />)}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
            />
        );
    }

}

export default DatePickerModal;