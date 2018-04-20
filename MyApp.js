/**
 * Created by shixiaohui on 18/4/18.
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
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
import ChatScreen from './ChatScreen';
import  MinePage from './MinePage';
import  tab_finance_nor from './react_native_modules/AppContainer/image/tab_finance_nor.png';


class HomePage extends Component {
    static navigationOptions={
        title:'首页',                             //标题，如果设置了这个导航栏和标签栏的title就会变成一样的，所以不推荐使用这个方法。
        header:null,                            //可以设置一些导航的属性，当然如果想隐藏顶部导航条只要将这个属性设置为null就可以了
        // headerTitle:'首页',                    //设置导航栏标题，推荐用这个方法。
        //headerTitleAllowFontScaling:true,     //是否允许标题字体大小自动缩放
        headerBackTitle:null,                   //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
        //headerTruncatedBackTitle:'',          //设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。（上个页面的标题过长，导致显示不下，所以改成了短一些的。）
        //headerBackImage:null,                 //设置导航栏返回箭头图片
        //headerRight:null,                     //设置导航条右侧。可以是按钮或者其他
        //headerLeft:null,                      //设置导航条左侧。可以是按钮或者其他
        //headerStyle:{}                        //设置导航条的样式。背景色，宽高等。如果想去掉安卓导航条底部阴影可以添加elevation: 0，iOS下用shadowOpacity: 0
        //headerForceInset:null,                //Allows to pass forceInset object to internal SafeAreaView used in the header
        //headerTitleStyle:{}                   //Style object for the title component
        //headerBackTitleStyle:{},              //Style object for the back title
        //headerTintColor:'#fff'                //Tint color for the header
        //headerPressColorAndroid:'#fff'        //Color for material ripple (Android >= 5.0 only)
        //headerTransparent:false               //Defaults to false. If true, the header will not have a background unless you explicitly provide it with headerStyle or headerBackground
        // headerBackground:null,               //Use this with headerTransparent to provide a component to render in the background of the header. You can use this with a blur view, for example, to create a translucent header
        //gesturesEnabled:true,                 //Whether you can use gestures to dismiss this screen. Defaults to true on iOS, false on Android
        //gestureResponseDistance:{horizontal:20,vertical:20}       //Object to override the distance of touch start from the edge of the screen to recognize gestures
        //gestureDirection:'normal',            //String to override the direction for dismiss gesture. default for normal behaviour or inverted for right-to-left swipes

    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style>
                <Text style={{padding:10}}>Hello, Navigations!</Text>
                <Button
                    onPress={()=>navigate('User',{user:'Sybil'})}
                    title={"点击跳转"}
                />
                <Image source={require('./react_native_modules/AppContainer/image/tab_home_page_nor.png')}/>
            </View>
        );
    }
}

const MainScreenNavigator = TabNavigator({
    home: {
        screen:HomePage,
        navigationOptions:{
                tabBarlabel: '首页',
                tabBarIcon:({tintColor})=>(
                    <View/>
                ),
        },
    },

    Certificate:{
        screen:MinePage,
        navigationOptions:{
                tabBarLabel:'我的',
                tabBarIcon:({tintColor})=>(
                    <View/>
                ),
        },
    },

},{

    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#008AC9', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
    },

});

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    icon:{
        height:22,
        width:22,
        resizeMode:'contain'
    }
});

const MyApp = StackNavigator({
    Home: { screen: MainScreenNavigator },
    User: { screen: ChatScreen },
});

module.exports = MyApp;


