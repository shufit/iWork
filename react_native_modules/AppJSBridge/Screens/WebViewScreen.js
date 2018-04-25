/**
 * Created by shixiaohui on 25/4/18.
 */

import {
    XAppBaseScreen
} from 'AppHomePage';

class WebViewScreen extends XAppBaseScreen {
    static navigationOptions={
        ..._navigationOptions,
        header:null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (<View/>);
    }


}

module.exports = WebViewScreen;