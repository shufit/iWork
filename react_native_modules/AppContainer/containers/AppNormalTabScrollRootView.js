/**
 * Created by shixiaohui on 29/3/18.
 */
import React, {Component, PropTypes} from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Platform,
    NativeAppEventEmitter,
    StatusBar
} from 'react-native';
import AppTabBar from '../components/AppTabBar';
import ScrollableTabView from '../components/ScrollableTabView';
import NativeAppEventEmitter from "RCTNativeAppEventEmitter";

let iOS = Platform.OS === 'ios';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
class AppNormalTabScrollRootView extends Component {

    constructor(props) {
        super(props);

        this.currentPage = 0;
        this.visible = true;
        this.state = {
            viewHeight: screenHeight,
        }


    }

    componentDidMount() {
        if (iOS) {
            let tabItem = this.props.config.tab[0];
            StatusBar.setBarStyle(tabItem.statusBarStyle || 'default', true);
        }
    }

    render() {
        return (
            <View
                style={{flex:1, backgroundColor: this.props.config.style.backgroundColor || '#f9f9f9'}}
                onLayout={
                    (e) => {
                        if (this.state.viewHeight !== e.nativeEvent.layout.height) {
                            this.setState({
                                viewHeight:e.nativeEvent.layout.height
                            });
                        }
                    }
                }
            >
                <ScrollableTabView
                    ref='tabView'
                    style={{flex: 1, height: this.state.viewHeight - parseInt(this.props.config.style.tabBarHeight)}}
                    initialPage={0}
                    renderTabBar={() => <AppTabBar navigator={this.props.navigator}/>}
                    contentProps={
                        {
                        style: {
                            overflow: 'visible',
                            flex: 1, height: this.state.viewHeight - parseInt(this.props.config.style.tabBarHeight),
                            backgroundColor: '#fff0'
                        }
                        }
                    }
                    scrollWithoutAnimation={true}

                    tabBarConfig={
                    {
                        height: parseInt(this.props.config.style.tabBarHeight),
                        backgroundColor: this.props.config.style.themeColor,
                        defaultColor: this.props.config.style.default.color,
                        selectedColor: this.props.config.style.active.color,
                        defaultBgColor: this.props.config.style.default.bgColor,
                        selectedBgColor: this.props.config.style.active.bgColor,
                        defaultFontSize: this.props.config.style.default.fontSize,
                        selectedFontSize: this.props.config.style.active.fontSize,
                        items: this.props.config.tab
                    }
                    }
                    onChangeTab={
                        (current) => {
                            if (iOS && this.visible) {
                                this._barStyleWithStyle();
                            }
                        }
                    }
                    locked={true}
                    leftMargin={0}
                    rightMargin={0}
                    tabBarPosition='bottom'

                >
                    {this._renderScrollChildView()}
                </ScrollableTabView>
            </View>
        );
    }

    _renderScrollChildView() {
        return this.props.config.tab.map(
            (item, index) => {
                let Screen = <View/>;
                return (
                    <View
                        key={item.id + item.pageName}
                        tabLabel={item.id + item.pageName}
                        style={
                            [
                                styles.tabView,
                                {
                                    height:this.state.viewHeight - parseInt(this.props.config.style.tabBarHeight)
                                }
                            ]
                        }
                    >
                        {
                            Screen === undefined ? (<Text>没有找到该页面</Text>) : (<Screen
                                navigator={this.props.navigator}
                                pageNavigator={this.props.pageNavigator}
                            />)
                        }
                    </View>
                );
            }
        );
    }

    _barStyleWithStyle() {
        if (!iOS) {
            return;
        }
        let tabItem = this.props.config.tab[this.currentPage];
        let tabIdentifier = tabItem.identifier;
        if (typeof tabIdentifier === 'string') {
            StatusBar.setBarStyle(tabItem.statusBarStyle || 'light-content', true)
        }
    }

}

const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        overflow: 'hidden',
        alignItems: 'stretch',
        justifyContent: 'center',
    },

});

module.exports = AppNormalTabScrollRootView;