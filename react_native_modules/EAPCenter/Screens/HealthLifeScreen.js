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

class HealthLifeItem extends Component {

    constructor(props) {
        super(props);
        this.title = props.title;
        this.description = props.description;
        this.onClick = props.onClick;
        this.imgSource = props.imgSource;
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.onClick && this.onClick();
            }}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <Image
                            source={this.imgSource}
                            style={{width:15 * a, height:15 * a, marginLeft:2 * a}}
                        />
                        <View style={{flex:1, paddingLeft:2 * a, paddingRight:2 * a, flexDirection:'column'}}>
                            <Text style={styles.itemTitle}>
                                {this.title}
                            </Text>
                            <Text style={styles.itemDescription}>
                                {this.description}
                            </Text>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class HealthLifeScreen extends XAppBaseScreen {

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
                <HealthLifeItem
                    title={'性格健康危机测试'}
                    description={'美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学'}
                    imgSource={require('../Images/eap_health_icon1.png')}
                />
                <View style={styles.dividingLine}/>
                <HealthLifeItem
                    title={'性格健康危机测试'}
                    description={'美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学美国杜克大学'}
                    imgSource={require('../Images/eap_health_icon1.png')}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    itemContainer:{
        paddingVertical: a,
        paddingHorizontal: 2 * a,
        backgroundColor:'#fff',
        width: 60 * a,
        height: 20 * a,
    },
    itemSubContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    itemTitle: {
        fontSize:14,
        color:'#414141'
    },
    itemDescription:{
        fontSize:12,
        color:'#808080',
        marginTop: a,
        lineHeight: 1.5 * 12,
    },
    //分割横线
    dividingLine: {
        backgroundColor: 'lightgray',
        height: 1,
        width: 60 * a
    },

});

export  default HealthLifeScreen;