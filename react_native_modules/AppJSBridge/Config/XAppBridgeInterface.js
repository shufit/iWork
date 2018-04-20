/**
 * Created by shixiaohui on 20/4/18.
 */

var TempData = {};

class XAppBridgeInterface {

    /*
    *
    *用于注册给
    * */
    static registerHandlers = {
        //存储

        setData: async (navigator,data,responseCallback) => {
            TempData[data.key] = data.value;
            responseCallback({
                status : 0
            });
        },
        getData: async (navigator,data,responseCallback) => {
            responseCallback({
                status : 0,
                data : {
                    value : TempData[data.key]
                }
            });
        },

        removeData: async(navigator,data,responseCallback) => {
            delete TempData[data.key];
            responseCallback({
                status : 0
            });
        }
    }


}

module.exports = XAppBridgeInterface;

