/**
 * Created by shixiaohui on 25/4/18.
 */
import React, {Component} from "react";
import {Platform, StyleSheet, Text, Button, View, Image, TouchableOpacity} from "react-native";
import {XAppBaseScreen,NormalNavigationOptions} from "../Screens/XAppBaseScreen";


class XAppNavigationScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions })=>({
        ...navigationOptions,
        ...NormalNavigationOptions({ navigation, navigationOptions }),
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setParams({title:'修改标题'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>二级页面</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

module.exports = XAppNavigationScreen;