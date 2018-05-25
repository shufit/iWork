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
    TextInput
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

} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui';

import CalendarPicker from 'react-native-calendar-picker';

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
                    <Button
                        onPress={()=>{
                            this.setState({
                                showDatePicker:true,
                            })

                        }}
                        title={'显示日期'}
                        color={'#0079d7'}
                    />
                </ScrollView>
                <DatePickerModal
                    onConfirmPress={(date)=>{

                    }}
                    onCancelPress={()=>{

                    }}
                    showDatePicker={this.state.showDatePicker}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff'
    }
});

export default AppointmentScreen;