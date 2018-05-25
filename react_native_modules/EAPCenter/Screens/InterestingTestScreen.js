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
    TextInput
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

class InterestingTestItem extends Component {

    constructor(props) {
        super(props);
        this.title = props.title;
        this.style = props.style;
        this.onClick = props.onClick;
        this.imgSource = props.imgSource;

    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.onClick && this.onClick();
            }}>
                <View style={[{
                    height: 8 * a,
                    width: 16 * a,
                    flexDirection:'row',
                    alignItems:'center',
                },this.style]}>

                    <Image
                        style={{height: 5 * a, width: 5 * a, }}
                        source={this.imgSource}
                    />
                    <Text
                        style={{color:'#707070', fontSize:12, marginLeft: a}}
                    >{this.title}
                    </Text>

                </View>

            </TouchableOpacity>
        );
    }
}

class InterestingTestScreen extends XAppBaseScreen {

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
                <ScrollView>
                    {this._renderSearchBar()}
                    {this._renderBanner()}
                    {this._renderItems()}
                    {this._renderIndexLabel()}
                </ScrollView>

            </View>
        );
    }

    _renderSearchBar() {
        return (
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBarTextInputView}>
                    <TextInput
                        style={{
                            height:5 * a,
                            width: 45 * a,
                            backgroundColor:'transparent',
                            borderWidth:0,
                            marginLeft: 1.5 * a,}}
                        placeholder={''}
                        padding={0}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=>{

                        }}
                    />
                </View>

                <TouchableOpacity onPress={()=>{

                }}>
                    <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                        height: 5 * a,
                        width: 9 * a,
                        marginLeft: 2 * a,
                        backgroundColor:'#ff9600',
                        borderRadius:3
                    }}>
                        <Text style={{color:'#fff',fontSize:16, textAlign:'center'}}>{'搜索'}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    _renderBanner() {
        return (
            <Image
                source={require('../Images/eap_health_banner.png')}
                style={{
                    width:56 * a,
                    height: 15 * a,
                }}
                resizeMode={'stretch'}
            />
        );
    }

    _renderItems() {
        return (
            <View style={{
                height: 16 * a,
                width: 56 * a,
                flexWrap:'wrap',
                flexDirection:'row',
                justifyContent:'space-between',
            }}>

                <InterestingTestItem
                    title={'专业测试'}
                    imgSource={require('../Images/eap_interest_icon1.png')}
                    onClick={()=>{

                    }}
                />

                <InterestingTestItem
                    title={'事业&性格'}
                    imgSource={require('../Images/eap_interest_icon7.png')}
                    onClick={()=>{

                    }}
                />
                <InterestingTestItem
                    title={'智商&情商'}
                    imgSource={require('../Images/eap_interest_icon4.png')}
                    onClick={()=>{

                    }}
                />
                <InterestingTestItem
                    title={'情感&婚姻'}
                    imgSource={require('../Images/eap_interest_icon2.png')}
                    onClick={()=>{

                    }}
                />
                <InterestingTestItem
                    title={'星座&生肖'}
                    imgSource={require('../Images/eap_interest_icon3.png')}
                    onClick={()=>{

                    }}
                />
                <InterestingTestItem
                    title={'全部'}
                    imgSource={require('../Images/eap_interest_icon8.png')}
                    onClick={()=>{

                    }}
                />

            </View>
        );
    }

    _renderIndexLabel() {
        return (
            <Text
                style={{
                    color:'#808080',
                    fontSize: 14,
                    marginTop: 2 * a,
                    marginBottom: 2 * a,
                }}
            >
                {'当前分类'}
            </Text>
        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal: 2 * a,
        flexDirection:'column',
    },
    searchBarContainer:{
        width: 56 * a,
        height: 8 * a,
        paddingTop: a,
        paddingBottom: 2 * a,
        flexDirection:'row',

    },
    searchBarTextInputView:{
        height: 5 * a,
        width: 45 * a,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#ff9600',

    }

});



export default InterestingTestScreen;