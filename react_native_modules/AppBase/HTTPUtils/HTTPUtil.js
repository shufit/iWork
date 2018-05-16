
import {
    Loading,
    HUD,
} from 'react-native-global-ui'

function httpGet(url, params, headers) {
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    Loading.show();
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status:response.status})
                    Loading.hide();
                }
            })
            .then((response) => {
                Loading.hide();
                resolve(response);
            })
            .catch((err)=> {
                Loading.hide();
                reject({status:-1});
            })
    })
}

function httpPost(url, params, headers) {
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    Loading.show();
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status:response.status})
                    Loading.hide();
                }
            })
            .then((response) => {
                Loading.hide();
                resolve(response);
            })
            .catch((err)=> {
                Loading.hide();
                reject({status:-1});
            })
    })
}

export {
    httpGet,
    httpPost,
};