//
//  XAppConfig.h
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XAppConfigProtocol.h"

@interface XAppConfig : NSObject <XAppConfigProtocol>

#pragma - mark 通用，必填字段
// APP 渠道号 用来标示App的唯一ID
@property(nonatomic, copy) NSString *XAppID;
// Client version.建议直接取bundle值
@property(nonatomic, copy) NSString *version;

#pragma mark - Request，必填字段
//服务器前缀
@property(nonatomic, copy) NSString *apiHost; //远程接口host
//开发环境: 0  测试环境: 1 生产环境: 2
@property(nonatomic, assign) NSInteger apiType;
@property(nonatomic, copy) NSString *appName;

/////////////////////////////////////////////////////////////

/**
 //通用需要加密的私密字段
 这个字段用来指定接口哪些字段需要加密，数据结构为：
 
 {
 "common":["payeeAcName","payeeAcNo"]
 "api": {
 "btoa/portal/login" : "userId"
 
 }
 }
 **/
@property(nonatomic, strong) NSDictionary *apiEncodeFields;    //私密字段
@property(nonatomic, copy) NSString *XApiVersion;             //服务端版本兼容


#pragma mark - JS h5更新相关
//当前版本描述
@property(nonatomic, copy) NSString *jsResourcePath; // js 资源对应目录
// js 加密的key
@property(nonatomic, copy) NSString *jsEncryptKey;
// jsBundleID
@property(nonatomic, copy) NSString *jsBundleId;
// manifestURL
@property(nonatomic, copy) NSString *manifestURL;
#pragma mark - Hot update
// 下载处理完成是否立即运行脚本(async=YES ->
// 非立即执行，启动执行)
@property(nonatomic, assign) BOOL hotUpdaterRunAsynced;
#pragma mark - RN Hot update
// HotUpdater RN 热更新模块
// bundle地址
@property(nonatomic, copy) NSString *rnBundlePath;
@property(nonatomic, assign) BOOL rnReLaunchReloadJsbundle; // 下载处理完成是否重启运行脚本

#pragma mark - DEBUG
//用于开启是否读取本地未打包的文件
//只用于测试，请勿随意改此值
@property(nonatomic, assign) BOOL debugJsLocalEnable;

#pragma mark - share
// 分享
@property(nonatomic, copy) NSString *weixinShareAppKey;                    /**< 微信分享AppKey */
@property(nonatomic, copy) NSString *weiboShareAppKey;                     /**< 微博分享AppKey */
@property(nonatomic, copy) NSString *qqShareAppKey;                        /**< qq分享AppKey */


#pragma mark 方法参数
/**
 *  @brief  初始化方法
 */
- (void)initEnv;


/**
 *  @brief  返回对应api下的host地址
 *
 *  @param   apiType api类型
 *
 *  @return 返回对应api下的host地址
 */
- (NSString *)apiHostWithApiType:(NSInteger)apiType;

@end
