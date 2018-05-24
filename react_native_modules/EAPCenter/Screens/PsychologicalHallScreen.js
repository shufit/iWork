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

class PsychologicalHallItem extends Component {


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

class PsychologicalHallScreen extends XAppBaseScreen {

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
            <View
                style={styles.container}
            >
                <PsychologicalHallItem
                    title={'1分钟测出你属于哪一种生活风格'}
                    description={'就像世界上找不出任何一个与自己完全相同的人一样，每个人的就像世界上找不出任何一个与自己完全相同的人一样，每个人的...'}
                    imgSource={require('../Images/eap_psycho_icon1.png')}
                    onClick={()=>{

                    }}
                />
                <PsychologicalHallItem
                    title={'1分钟测出你属于哪一种生活风格'}
                    description={'就像世界上找不出任何一个与自己完全相同的人一样，每个人的就像世界上找不出任何一个与自己完全相同的人一样，每个人的...'}
                    imgSource={require('../Images/eap_psycho_icon1.png')}
                    onClick={()=>{

                    }}
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
        height: 22 * a,
    },
    itemSubContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderWidth: 1,
        borderColor:'#ff9600',
        borderRadius: 6,
    },
    itemTitle: {
        fontSize:14,
        color:'#ff9600'
    },
    itemDescription:{
        fontSize:12,
        color:'#808080',
        marginTop: a,
    }
});

export default PsychologicalHallScreen