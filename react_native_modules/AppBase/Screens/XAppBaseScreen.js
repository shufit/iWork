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
    TouchableOpacity
} from 'react-native';

const NormalNavigationOptions = ({navigation, navigationOptions})=>{
    let {
        title,
        showBackTitle,          //设置是否显示返回按钮的标题
        showCloseButton,        //设置是否显示关闭按钮
        showMoreButton,         //设置是否显示右边更多按钮
        onBackPress,            //点击返回按钮callback
        onClosePress,           //点击关闭按钮callback
        onMorePress,            //点击更多按钮callback

    } = navigation.state.params;
    return {
        headerTitle:title || '',
        headerTitleStyle:{
            fontSize:18,
            color:'black',
            fontWeight:'500',
        },
        headerStyle: {
            backgroundColor:'white',
        },
        headerLeft:(
            <View style={styles.headerLeftView}>
                <TouchableOpacity onPress={()=>{
                    if (onBackPress && typeof onBackPress === 'function'){
                        onBackPress();
                    } else {
                        navigation.goBack && navigation.goBack();
                    }

                }}>
                    <View style={styles.headerLeftView}>
                        <Image
                            source={require('../Images/back.png')}
                            style={styles.headerBackIcon}
                        />
                        {showBackTitle ? <Text style={styles.headerBackTitle}>{'返回'}</Text> : null}
                    </View>
                </TouchableOpacity>
                {showCloseButton ?
                    <TouchableOpacity onPress={()=>{
                        if (onClosePress && typeof onClosePress === 'function') {
                            onClosePress();
                        } else {
                            navigation.goBack && navigation.goBack();
                        }
                    }}>
                        <Text style={styles.headerCloseTitle}>{'关闭'}</Text>
                    </TouchableOpacity> : null}
            </View>

        ),
        headerRight:(
            showMoreButton ?
            <View>
                <TouchableOpacity onPress={()=>{

                    if (onMorePress && typeof onMorePress === 'function') {
                        onMorePress();
                    }
                }}>
                    <View style={styles.headerRightView}>
                        <Image
                            source={require('../Images/menuicon.png')}
                            style={styles.headerRightIcon}
                            resizeMode={'contain'}
                        />
                    </View>

                </TouchableOpacity>
            </View> : null
        ),
    };

};

class XAppBaseScreen extends Component {


    //static navigationOptions={
        // title:'',                             //标题，如果设置了这个导航栏和标签栏的title就会变成一样的，所以不推荐使用这个方法。
        // header:null,                            //可以设置一些导航的属性，当然如果想隐藏顶部导航条只要将这个属性设置为null就可以了
        // headerTitle:'首页',                    //设置导航栏标题，推荐用这个方法。
        //headerTitleAllowFontScaling:true,     //是否允许标题字体大小自动缩放
        // headerBackTitle:null,                   //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
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

    //};

    static navigationOptions = ({ navigation, navigationOptions }) => ({
        ...navigationOptions,
        ...NormalNavigationOptions({ navigation, navigationOptions }),

    });

    constructor(props){
        super(props);
        let {
            navigate,           //function: go to another screen, figures out the action it needs to take to do it
            goBack,             //function: close active screen and move back in the stack
            addListener,        //subscribe to updates to navigation lifecycle
            isFocused,          //function: function that returns true if the screen is focused and false otherwise
            setParams,          //function:  make changes to route's params
            getParam,           //function: get a specific param with fallback
            dispatch,           //
            push,               //function: push will move you forward to a new route in the stack
            pop,                //function: Take you to the previous screen in the stack. If you provide a number, "n", it will specify how many screens to take you back within the stack
            popToTop,           //function: Call this to jump back to the top route in the stack, dismissing all other screens.
            replace,            //function: Call this to replace the current screen with the given route, with params and sub-action
            state,              //Object: { routeName: 'profile',key: 'main0',params: { hello: 'world' }}

        } = props.navigation;
        this._navigate = navigate || undefined;
        this._goBack = goBack || undefined;
        this._addListener = addListener || undefined;
        this._isFocused = isFocused || undefined;
        this._setParams = setParams || undefined;
        this._getParam = getParam || undefined;
        this._dispatch = dispatch || undefined;
        this._push = push || undefined;
        this._pop = pop || undefined;
        this._popToTop = popToTop || undefined;
        this._replace = replace || undefined;
        this._routeState = state || undefined;

    }


    //app跳转至根页面
    popToTop() {

        if (this._popToTop && (typeof this._popToTop === 'function')) {
            this._popToTop();
        }
    }

    //push一个新的页面
    /*
    *routeName:在StackNavigation中注册的页面的key
    *
    * params:{
    *           title,                  //设置导航栏标题
    *           showBackTitle,          //设置是否显示返回按钮的标题
                showCloseButton,        //设置是否显示关闭按钮
                showMoreButton,         //设置是否显示右边更多按钮
                onBackPress,            //点击返回按钮callback
                onClosePress,           //点击关闭按钮callback
                onMorePress,            //点击更多按钮callback
                ...
    * }
    *
    *action:传给页面的function
     */
    push(routeName:String, params:Object, action:Function) {

        if (this._push && (typeof this._push === 'function')) {
            this._push(routeName, params, action);
        }
    }

    //替换当前的页面

    replace(routeName:String, params:Object, action:Function) {
        if (this._replace && (typeof this._replace === 'function')) {
            this._replace(routeName, params, action);
        }
    }

    //pop页面
    pop(){
        let param0 = arguments[0] ? arguments[0] : undefined;
        if (this._pop && (typeof this._pop === 'function')) {
            if (param0 && (typeof param0 === 'number')) {
                this._pop(param0);

            } else if (param0 == undefined) {
                this._pop();
            }
        }

    }


    //获取上一个页面传入的参数
    getParam(keyName, defaultValue) {
        if (this._getParam && (typeof this._getParam === 'function')) {
            this._getParam(keyName, defaultValue);
        }
    }

    //设置页面的参数
    setParams(params:Object) {
        if (this._setParams && (typeof this._setParams === 'function')) {
            this._setParams(params);
        }
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
    headerLeftView:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerRightView:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerBackIcon:{
        width:15,
        height:20,
        marginLeft:13,
    },
    headerRightIcon:{
        width:25,
        height:5,
        marginRight:13,
    },
    headerBackTitle:{
        fontSize:16,
        color:'black',
    },
    headerCloseTitle:{
        fontSize:16,
        color:'black',
        marginLeft: 3,
    }
});

module.exports ={
    XAppBaseScreen:XAppBaseScreen,
    NormalNavigationOptions:NormalNavigationOptions,
} ;