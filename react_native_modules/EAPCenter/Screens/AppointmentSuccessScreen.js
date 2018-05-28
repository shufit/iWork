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

} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;

class AppointmentSuccessScreen extends XAppBaseScreen {

    constructor(props) {
        super(props);
    }

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

    render() {
        return (
            <View
                style={styles.container}
            >
                <ImageBackground
                    style={{
                        width: 60 * a,
                        height: 40 * a,
                        flexDirection:'column',
                        alignItems:'center',
                    }}
                    source={require('../Images/eap_appointment_header.png')}
                    resizeMode={'stretch'}
                >
                    <Image
                        source={require('../Images/eap_appointment_header_icon.png')}
                        style={{
                            width: 14 * a,
                            height: 15 * a,
                            marginTop: 6 * a,
                        }}
                        resizeMode={'stretch'}
                    />
                    <Text style={{fontSize:18, color:'#fff',textAlign:'center', marginTop: 4 * a}}>
                        {'提交成功'}
                    </Text>
                </ImageBackground>

                <Text style={styles.description}>
                    {'收到你的反馈，感谢填写'}
                </Text>
                <Text style={styles.description}>
                    {'我们的咨询师会在约定的时间内等待你'}
                </Text>
                <Text style={styles.subDescription}>
                    {'如有疑问和需要更改时间请提前半天发邮件至'}
                </Text>
                <Text style={styles.subDescription}>
                    {'(EAP.心灵家园) <eap.heart@o-film.com>与我们联系'}
                </Text>
                <Text style={styles.subDescription}>
                    {'咨询地点：静境工作室（一号园区五号宿舍楼 原移动营业厅）'}
                </Text>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        flexDirection:'column',
    },
    description:{
        color:'#ff9600',
        fontSize: 14,
        textAlign:'center',
        marginBottom: 2 * a,
    },
    subDescription:{
        color:'#7a7a7a',
        fontSize: 12,
        textAlign:'center',
        marginBottom: 2 * a,
    }
});

export default AppointmentSuccessScreen;