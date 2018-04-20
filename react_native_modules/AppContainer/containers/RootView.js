/**
 * Created by shixiaohui on 19/3/18.
 */
import React, {Component} from 'react';
import  {
    Platform,
    View,
    Text,

} from 'react-native';
import AppNormalTabScrollRootView from '../containers/AppNormalTabScrollRootView';

let iOS = Platform.OS === 'ios';
let tabConfig = require('../config/tabconfig.json');
let UIManager = require('UIManager');
class RootView extends Component {

    constructor(props) {
        super(props);
        this.config = tabConfig;
        this.state = {
            config: this.config,
        };

        if (iOS === false) {
            if (this.state.config.navigator === undefined || this.state.config.navigator === '0') {
                UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <AppNormalTabScrollRootView
                config={this.state.config}
                navigator={this.props.navigator}
                pageNavigator={this.props.pageNavigator}
            />
        );
    }
}

module.exports = RootView;