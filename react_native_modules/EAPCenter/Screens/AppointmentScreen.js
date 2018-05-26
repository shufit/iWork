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
    Picker
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
                    <Button
                        onPress={()=>{
                            this.setState({
                                showDatePicker:true,
                            })

                        }}
                        title={'显示日期'}
                        color={'#0079d7'}
                    />

                    <CheckBox
                        style={{flex: 1, padding: 10}}
                        onClick={()=>{

                        }}
                        isChecked={false}
                        leftText={'item 1'}
                    />
                    <CheckBox
                        style={{flex: 1, padding: 10}}
                        onClick={()=>{

                        }}
                        isChecked={false}
                        leftText={'item 1'}
                    />
                    <CheckBox
                        style={{flex: 1, padding: 10}}
                        onClick={()=>{

                        }}
                        isChecked={false}
                        rightText={'item 1'}
                    />


                        <SelectInput
                            options={['option 1option 1option 1', 'option 2', 'option3']}
                        />

                </ScrollView>
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