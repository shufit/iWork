

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    TouchableOpacity
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


const {A, a} = Grid;

class LoginScreen extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        headerTitle:'欧菲iWork平台',
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
        super(props)
    }

    componentDidMount() {

    }


    render() {
        return (<View style={styles.container}/>);
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red',

    }

});

export {LoginScreen};



