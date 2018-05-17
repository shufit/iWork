

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
    ImageBackground
} from 'react-native';

import {
    Font,
    FontWeight,
    Grid,
} from 'AppTheme';

import {
    XAppBaseScreen,
    NormalNavigationOptions,

} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;


class OfilmWorkStationTabScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        headerTitle:'工作台',
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
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.contentContainer}>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    contentContainer:{
        flex:1,
        backgroundColor: '#fff',
        flexDirection:'column',
    }

});

export default OfilmWorkStationTabScreen;