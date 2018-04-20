/**
 * Created by shixiaohui on 19/3/18.
 */
import React, {Component, PropTypes} from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform
} from "react-native";

const iOS = Platform.OS === 'ios';

class AppTabBar extends Component {

    constructor(props) {
        super(props);
        this.waitChangeIndex = false;
        this.changeIndex = undefined;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeTab === this.props.activeTab && prevProps.config.items.length === this.props.config.items.length) {
            return;
        }

        let preActiveTab = prevProps.activeTab;
        let preConfigItems = prevProps.config.items;
        if (this.waitChangeIndex) {
            return;
        }

        if (preActiveTab >= preConfigItems.length) {
            return;
        }

        let preActiveTabId = preConfigItems[preActiveTab].identifier;
        for (let index = 0; index < this.props.config.items.length; index ++) {
            let item = this.props.config.items[index];
            let id = item.identifier;
            if (id === preActiveTabId) {
                if (index !== preActiveTab) {
                    if (iOS) {
                        this.props.goToPage && this.props.goToPage(index);
                    } else {
                        setTimeout(() => {
                                this.props.goToPage && this.props.goToPage(index);
                            }, 1
                        )
                    }
                } else {
                    return;
                }

            }
        }
    }

    render() {

        let containerConfigStyle = {
            height: this.props.config.height,
            flexDirection: 'row',
        };

        return (
            <View style={[containerConfigStyle]}>
                {this._renderItems()}
                <Image
                    style={
                        {
                            position:'absolute',
                            top:0,
                            right:0,
                            left:0,
                            height:1,
                            width:this.props.width
                        }
                    }
                    resizeMode='stretch'
                    source={require('../image/line_h_top.png')}
                />
            </View>
        );
    }

    _renderItems() {
        let textDefaultStyle = {color: this.props.config.defaultColor};
        let  textSelectedStyle = {color: this.props.config.selectedColor};
        return this.props.config.items.map(
            (item, index) => {
                let textFontSize = {
                    fontSize:(this.props.activeTab === index ? this.props.config.selectedFontSize : this.props.config.defaultFontSize) || 11
                };
                let image = this.props.activeTab === index ? require('') : require('');
                return (
                    <View
                        key={item.id + item.pageName}
                        style={
                            [
                                styles.tabItemContainer,
                                {
                                    backgroundColor: this.props.activeTab === index ? this.props.config.selectedBgColor : this.props.config.defaultBgColor,
                                }
                            ]
                        }
                    >
                        <TouchableOpacity
                            style={
                                styles.tabButton
                            }
                            activeOpacity={1}
                            onPress={
                                ()=>{
                                    this._goIndex(index);
                                }
                            }
                        >
                            {image ? (<View style={{flex:3}} />) : null}
                            {image ? (<Image style={{width:20,height:20}} source={image} />) : null}
                            {image ? (<View style={{flex:2}} />) : null}
                            <Text style={[
                                    this.props.activeTab === index ? textSelectedStyle : textDefaultStyle,
                                    textFontSize
                                ]}
                            >
                                {item.title}
                            </Text>
                            {image ? (<View style={{flex:6}} />) : null}
                        </TouchableOpacity>
                    </View>
                );
            }
        );
    }

    _goIndex(index){
        let item = this.props.config.items[index];
        if (index != this.props.activeTab) {
            if (item.needLogin === 'true') {
                //需要登录,分已经登录了和未登录两种情况
            } else {
                this.waitChangeIndex = false;
                this.props.goToPage && this.props.goToPage(index);
            }
        }
    }



}

var styles = StyleSheet.create({
    container: {
        height: 100
    },
    tabItemContainer: {
        flex:1,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    }
});

module.exports = AppTabBar;