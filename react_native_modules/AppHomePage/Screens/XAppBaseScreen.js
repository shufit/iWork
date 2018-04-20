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

class XAppBaseScreen extends Component {


    static navigationOptions={
        // title:'',                             //标题，如果设置了这个导航栏和标签栏的title就会变成一样的，所以不推荐使用这个方法。
        // header:null,                            //可以设置一些导航的属性，当然如果想隐藏顶部导航条只要将这个属性设置为null就可以了
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

    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
});

module.exports ={
    XAppBaseScreen:XAppBaseScreen,
    _navigationOptions:XAppBaseScreen.navigationOptions,
} ;