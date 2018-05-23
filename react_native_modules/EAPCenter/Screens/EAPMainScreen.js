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
    Swiper,

} from 'AppBase';

import {
    Loading,
    HUD,
} from 'react-native-global-ui'

const {A, a} = Grid;


class EAPMainItem extends Component {

    constructor(props) {
        super(props);
        this.title = props.title || undefined;
        this.imgSource = props.imgSource || undefined;
        this.onClick = props.onClick || undefined;

    }


    render() {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.onClick && this.onClick();
                }}
            >
                <ImageBackground
                    style={{
                        width: 18 * a,
                        height: 18 * a,
                        flexDirection:'column',
                        alignItems:'center',
                    }}
                    resizeMode={'stretch'}
                    source={this.imgSource}

                >
                    <Text
                        style={{
                            color:'#fff',
                            fontSize: 14,
                            marginTop: 11 * a,
                        }}
                    >
                        {this.title}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }


}


class EAPMainScreen extends XAppBaseScreen {

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
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImg}
                    source={require('../Images/EAP_main_background.png')}
                    resizeMode={'cover'}
                >
                    <View style={styles.subContainer1}>
                        <EAPMainItem
                            title={'心理讲堂'}
                            imgSource={require('../Images/eap_main_icon1.png')}
                            onClick={()=>{

                            }}
                        >
                        </EAPMainItem>
                        <EAPMainItem
                            title={'预约'}
                            imgSource={require('../Images/eap_main_icon2.png')}
                            onClick={()=>{

                            }}
                        >
                        </EAPMainItem>
                        <EAPMainItem
                            title={'健康生活'}
                            imgSource={require('../Images/eap_main_icon3.png')}
                            onClick={()=>{

                            }}
                        >
                        </EAPMainItem>
                    </View>
                    <View
                        style={styles.subContainer2}
                    >
                        <EAPMainItem
                            title={'个人中心'}
                            imgSource={require('../Images/eap_main_icon4.png')}
                            onClick={()=>{

                            }}
                        >
                        </EAPMainItem>
                        <EAPMainItem
                            title={'趣味测试'}
                            imgSource={require('../Images/eap_main_icon5.png')}
                            onClick={()=>{

                            }}
                        >
                        </EAPMainItem>
                    </View>
                </ImageBackground>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    backgroundImg: {
        flex:1,
        width:60 * a,
        flexDirection:'column',
        alignItems:'center',
        paddingTop: 15 * a,
    },
    subContainer1:{
        width: 60 * a,
        height: 20 * a,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    subContainer2:{
        width: 60 * a,
        height: 20 * a,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        paddingLeft: 10 * a,
        paddingRight: 10 * a,
        marginTop: 4 * a,


    }

});

export default EAPMainScreen;