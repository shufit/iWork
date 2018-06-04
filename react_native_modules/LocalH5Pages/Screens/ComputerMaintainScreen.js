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
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;


class ComputerMaintainScreen extends XAppBaseScreen {


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
            <View style={styles.container}>
                <WebView
                    style={styles.webView}
                    automaticallyAdjustContentInsets={false}
                    source={require('../H5Resource/ComputerMaintain.html')}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    scalesPageToFit={true}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    webView:{
        width: 60 * a,
        flex: 1,
    },
});

export default ComputerMaintainScreen;