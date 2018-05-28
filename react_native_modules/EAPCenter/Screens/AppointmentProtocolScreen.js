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
    TouchableWithoutFeedback,
    ImageBackground,
    TextInput,
    WebView
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
    protocolStr,
} from '../Strings/Strings';

import {
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;

class AppointmentProtocolScreen extends XAppBaseScreen {

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
    }

    render() {
        return(
            <View style={styles.container}>

                <WebView
                    style={styles.webView}
                    automaticallyAdjustContentInsets={false}
                    source={{html: protocolStr}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    scalesPageToFit={true}
                />

                <TouchableWithoutFeedback onPress={()=>{
                    this.pop();
                }}>
                    <View
                        style={{
                            height: 6 * a,
                            width: 56 * a,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'#ff9600',
                            marginBottom: 5 * a,
                        }}
                    >
                        <Text style={{fontSize:16,textAlign:'center',color:'#fff'}}>
                            {'已阅读'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingHorizontal: 2 * a,
    },
    webView:{
        width: 56 * a,
        flex: 1,
    },
});

export default AppointmentProtocolScreen;