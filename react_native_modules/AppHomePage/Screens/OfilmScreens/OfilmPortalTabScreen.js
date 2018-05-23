

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
    Alert,
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

class PortalCellItem extends Component {

    constructor(props) {
        super(props);
        this.iconSource = props.iconSource || undefined;
        this.title = props.title || undefined;
        this.onClick = props.onClick || undefined;
    }

    render() {
        return (

            <View style={styles.portalCellItem}>
                <TouchableOpacity onPress={() => {
                    // Alert.alert(
                    //     '提示',
                    //     '功能开发中',
                    //     [
                    //         {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    //     ]
                    // );
                    this.onClick && this.onClick();
                }}>
                    <View style={styles.portalSubCellItem}>
                        <Image
                            source={this.iconSource}
                            style={styles.cellItemIcon}
                        />
                        <Text style={styles.cellItemText}>{this.title}</Text>
                        <Image
                            source={require('../../Images/Portal/menhu_07.png')}
                            style={styles.leftArrowIcon}
                        />

                    </View>
                </TouchableOpacity>
                <View style={styles.dividingLine}/>
            </View>
        );
    }
}

class OfilmPortalTabScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        headerTitle:'门户',
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
                        <PortalCellItem
                            title={'办公中心'}
                            iconSource={require('../../Images/Portal/menhu_01.png')}
                            onClick={()=>{

                            }}
                        />
                        <PortalCellItem
                            title={'生产管理'}
                            iconSource={require('../../Images/Portal/menhu_02.png')}
                            onClick={()=>{

                            }}
                        />
                        <PortalCellItem
                            title={'人事中心'}
                            iconSource={require('../../Images/Portal/menhu_03.png')}
                            onClick={()=>{

                            }}
                        />
                        <PortalCellItem
                            title={'财务中心'}
                            iconSource={require('../../Images/Portal/menhu_04.png')}
                            onClick={()=>{

                            }}
                        />
                        <PortalCellItem
                            title={'EAP中心'}
                            iconSource={require('../../Images/Portal/menhu_05.png')}
                            onClick={()=>{
                                this._gotoEAPCenter();

                            }}
                        />
                        <PortalCellItem
                            title={'论坛中心'}
                            iconSource={require('../../Images/Portal/menhu_06.png')}
                            onClick={()=>{

                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    _gotoEAPCenter() {
        this.push('EAPCenter',{
            title:'EAP心灵家园',
            showBackTitle: false,
            onBackPress:()=>{
                this.pop();
            }
        },null);
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
    },
    portalCellItem:{
        width: 60 * a,
        height: 12 * a,
        flexDirection:'column',
    },
    portalSubCellItem:{
        width: 60 * a,
        height:(12 * a -1),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 3 * a,
        paddingRight: 3 * a,
    },
    //分割横线
    dividingLine: {
        backgroundColor: 'lightgray',
        height: 1,
        width: 60 * a
    },
    cellItemIcon:{
        width: 4 * a,
        height: 5 * a,
        marginRight: 2 * a,
    },
    cellItemText:{
        fontSize:16,
        color:'gray',
        width: 44 * a,
    },
    leftArrowIcon:{
        width: 4 * a,
        height: 3.5* a,
    }

});

export default OfilmPortalTabScreen;