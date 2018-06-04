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

class ITServiceScreen extends XAppBaseScreen {

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
                <TouchableOpacity onPress={()=>{

                    this.push('computerPermit', {
                        title:'笔记本电脑通行证',
                        showBackTitle: false,
                        onBackPress:()=>{
                            this.pop();
                        }
                    }, null);

                }}>
                    <View style={styles.subView}>
                        <Text style={styles.cellTitle}>
                            {'1.笔记本电脑通行证办理'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.dividingLine}/>
                <TouchableOpacity onPress={()=>{

                    this.push('computerMaintain', {
                        title:'电脑维修流程',
                        showBackTitle: false,
                        onBackPress:()=>{
                            this.pop();
                        }
                    }, null);
                }}>
                    <View style={styles.subView}>
                        <Text style={styles.cellTitle}>
                            {'2.电脑维修流程'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.dividingLine}/>
                <TouchableOpacity onPress={()=>{
                    this.push('computerPurchase', {
                        title:'电脑申请流程',
                        showBackTitle: false,
                        onBackPress:()=>{
                            this.pop();
                        }
                    }, null);
                }}>
                    <View style={styles.subView}>
                        <Text style={styles.cellTitle}>
                            {'3.电脑申请流程'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.dividingLine}/>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'#fff',
        flexDirection:'column',
    },
    subView: {
        height: 6 * a,
        width: 60 * a,
        paddingHorizontal: 3 * a,
        alignItems:'center',
        backgroundColor:'#fff',
        flexDirection:'row'
    },
    cellTitle: {
        fontSize: 16,
        color:'#0079d7',
    },
    dividingLine: {
        backgroundColor: 'lightgray',
        height: StyleSheet.hairlineWidth,
        width: 60 * a
    },
});




export default ITServiceScreen;