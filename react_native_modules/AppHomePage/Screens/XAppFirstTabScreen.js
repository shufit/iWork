/**
 * Created by shixiaohui on 19/4/18.
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Image,
} from 'react-native';
import {
    XAppBaseScreen,
    NormalNavigationOptions,

} from './XAppBaseScreen';

class XAppFirstTabScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions })=>({
        ...navigationOptions,
        header:null,
    });


    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>第一个页面</Text>
                <Button
                    styles={{marginTop: 40}}
                    title="点击下一个页面"
                    onPress={()=>{
                    this.push('test', {
                        title:'二级测试页面',
                        visible:true,
                        showBackTitle:true,
                        showCloseButton:true,
                        showMoreButton:true,

                    }, null);
                }}>

                </Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

module.exports = XAppFirstTabScreen;
