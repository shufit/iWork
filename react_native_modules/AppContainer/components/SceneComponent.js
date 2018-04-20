/**
 * Created by shixiaohui on 19/3/18.
 */

import React ,{Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

const SceneComponent = (Props) => {
    const {shouldUpdated, ...props} = Props;
    return <View {...props}>
        <StaticContainer shouldUpdated={shouldUpdated}>
            {props.children}
        </StaticContainer>

    </View>
};

class StaticContainer extends Component {
    render() {
        var child = this.props.children;
        if (child === null || child === false) {
            return null;
        }
        return React.Children.only(child);
    }
}