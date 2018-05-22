
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

class HomeItem extends Component {

    constructor(props) {
        super(props);
        this.style = props.style;
        this.title = props.title;
        this.iconSource = props.iconSource;
        this.onClick = props.onClick;
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.onClick && this.onClick();
            }}>
                <View style={[styles.itemContainer, this.style]}>
                    <View style={styles.itemSubContainer}>
                        <Image
                            style={styles.itemIcon}
                            source={this.iconSource}
                        />
                        <Text style={styles.itemTitle}>{this.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class OfilmHomeTabScreen extends XAppBaseScreen {

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        headerTitle:'首页',
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
                        {this._renderHeaderSwiper()}
                        {this._renderItems()}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _renderHeaderSwiper() {
        return (
            <Swiper
                height={25 * a}
                autoplay={true}
                autoplayTimeout={5}
            >
                <View style={styles.slide1}>
                    <Text style={styles.slideText}>Hello</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.slideText}>O-Film</Text>
                </View>
            </Swiper>
        );
    }

    _renderItems() {
        return (
            <View style={{width: 60 * a,height:40 * a, flexDirection:'row'}}>
                <HomeItem
                    style={{width: 20 * a, height: 40 * a, backgroundColor:'#98F5FF'}}
                    title={'通知公告'}
                    iconSource={require('../../Images/Home/home_item_icon.png')}
                    onClick={()=>{

                        this._testRealmDB();

                    }}
                />
                <View style={{width:40 * a,height:40 * a,backgroundColor:'transparent', flexDirection:'column'}}>
                    <View style={{width: 40 * a, height: 20 * a, flexDirection:'row'}}>
                        <HomeItem
                            style={{width: 20 * a, height: 20 * a, backgroundColor:'#EEB4B4'}}
                            title={'企业风采'}
                            iconSource={require('../../Images/Home/home_item_icon.png')}
                            onClick={()=>{

                            }}
                        />
                        <HomeItem
                            style={{width: 20 * a, height: 20 * a, backgroundColor:'#C1FFC1'}}
                            title={'学习园地'}
                            iconSource={require('../../Images/Home/home_item_icon.png')}
                            onClick={()=>{

                            }}
                        />
                    </View>
                    <HomeItem
                        style={{width: 40 * a, height: 20 * a, backgroundColor:'#FFC125'}}
                        title={'联系我们'}
                        iconSource={require('../../Images/Home/home_item_icon.png')}
                        onClick={()=>{

                        }}
                    />

                </View>
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
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slideText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    itemContainer: {
        flexDirection:'column',
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor:'#97CAE5',
        alignItems:'center',
        justifyContent:'center',
    },
    itemSubContainer: {
        flexDirection:'column',
        width: 12 * a,
        height: 13 * a,
        alignItems:'center',
        backgroundColor:'transparent',
        justifyContent:'space-between',
    },
    itemIcon:{
        width: 6 * a,
        height: 6 * a,
    },
    itemTitle: {
        fontSize: 16,
        color: '#fff',
        textAlign:'center',
    }



});

export  default  OfilmHomeTabScreen ;