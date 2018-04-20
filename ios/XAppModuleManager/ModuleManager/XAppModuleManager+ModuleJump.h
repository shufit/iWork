//
//  XAppModuleManager+ModuleJump.h
//  RNProject
//
//  Created by ShiXiaoHui on 13/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModuleManager.h"

typedef void (^InvokeCallBack)();
typedef void (^ModuleJumperCallback)(NSString *moduleId, NSString *pageId, NSString *callBackId,NativeJumpCallBackBlock callback,NSDictionary *pageConfig);

@interface XAppModuleManager (ModuleJump)


#pragma mark - H5
/**
 *  注册外部实现的h5页面的跳转方式
 *
 *  @param h5ModuleJumper 跳转逻辑
 */
+ (void)registerH5ModuleJumper:(ModuleJumperCallback)h5ModuleJumper;

/**
 *  注册H5模块页面
 *
 *  @param moduleId       模块名
 *  @param pageId         页面名
 */
+ (void)registerH5Module:(NSString *)moduleId
                    page:(NSString *)pageId;


/**
 *  启动H5界面
 *
 *  @param moduleId   模块名
 *  @param pageId     页面名
 *  @param callbackId 回调函数的唯一标识
 *  @param callback   回调函数
 *  @param jsonParams 启动参数
 *
 *  @return 是否启动成功
 */
- (BOOL)startH5ModulePage:(NSString *)moduleId
                   pageId:(NSString *)pageId
               callbackId:(NSString *)callbackId
                 callback:(NativeJumpCallBackBlock)callback
               pageConfig:(NSDictionary *)pageConfig;

#pragma mark - Native

/**
 *  注册外部实现的Native页面的跳转方式
 *
 *  @param nativeModuleJumper 跳转逻辑
 */
+ (void)registerNativeModuleJumper:(ModuleJumperCallback)nativeModuleJumper;

/**
 *  跳转模块页面
 *
 *  @param moduleId         模块名
 *  @param pageId           页面名
 *  @param pageConfigString 参数字符串
 *  @param callback    回调数据
 */
- (void)startModulePage:(NSString *)moduleId
                 pageId:(NSString *)pageId
       pageConfigString:(NSString *)pageConfigString
         nativeCallback:(NativeJumpCallBackBlock)callback;

/**
 *  跳转模块页面
 *
 *  @param moduleId    模块名
 *  @param pageId      页面名
 *  @param pageConfig  参数
 *  @param callback    回调数据
 *
 *  @return 跳转是否成功
 */
- (void)startModulePage:(NSString *)moduleId
                 pageId:(NSString *)pageId
             pageConfig:(NSDictionary *)pageConfig
         nativeCallback:(NativeJumpCallBackBlock)callback;

#pragma mark - RN

/**
 *  注册外部实现的RN页面的跳转方式
 *
 *  @param RNModuleJumper 跳转逻辑
 */
+ (void)registerRNModuleJumper:(ModuleJumperCallback)RNModuleJumper;

/**
 *  注册RN模块页面
 *
 *  @param moduleInfo RN模块页面集合
 */
+ (void)registerRNModulePage:(NSArray *)moduleInfo;


/**
 *  启动RN界面
 *
 *  @param moduleId   模块名
 *  @param pageId     页面名
 *  @param callbackId 回调函数的唯一标识
 *  @param callback   回调函数
 *  @param jsonParams 启动参数
 *
 *  @return 是否启动成功
 */
- (BOOL)startRNModulePage:(NSString *)moduleId
                   pageId:(NSString *)pageId
               callbackId:(NSString *)callbackId
                 callback:(NativeJumpCallBackBlock)callback
               pageConfig:(NSDictionary *)pageConfig;
@end


@interface XAppModuleManager (HandleJumpCallback)

/**
 *  绑定callbackId,cakkback,目标页面
 *
 *  @param callbackId     唯一标识
 *  @param callback       回调block
 *  @param viewController 目标页面
 */
- (void)addJumpCallbackId:(NSString *)callbackId
                 callBack:(NativeJumpCallBackBlock)callback
           viewController:(UIViewController *)viewController;

/**
 *
 *
 *  @param viewController 目标页面
 */
- (void)removeCallbackFromViewController:(UIViewController *)viewController;


/**
 *  回调触发
 *
 *  @param callbackId 唯一标识
 *  @param data       回调数据
 */
- (void)postCallbackId:(NSString *)callbackId
                  data:(NSDictionary *)data;

@end
