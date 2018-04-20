//
//  XAppModuleManager.h
//  RNProject
//
//  Created by ShiXiaoHui on 11/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <ReactiveCocoa/ReactiveCocoa.h>
#import "XAppModuleMacros.h"
#import "XAppNavigatorProtocol.h"
#import <React/RCTBridge.h>

@class XAppModule;

typedef void (^NativeJumpCallBackBlock)(NSDictionary *response,BOOL success);

#define XApp_ModuleManager        ([XAppModuleManager  shareInstance])

@interface XAppModuleManager : NSObject<RCTBridgeModule>

@property(nonatomic, strong) id<XAppNavigatorProtocol> navigator;  //导航类

+ (XAppModuleManager *) shareInstance;


/**
 *  @brief  设置需要的参数，配置会先读取本地配置文件，然后网上请求配置信息
 *
 *  @param   navigator   导航类
 *  @param   publicKey   解密的秘钥
 *  @param   appId   应用的id
 *  @param   deviceId   设备的id
 */
- (void)setUpWithNavigator:(id<XAppNavigatorProtocol>)navigator
                     appId:(NSString *)appId
                 publicKey:(NSString *)publicKey
                  deviceId:(NSString *)deviceId;



#pragma mark - Cirecle
/**
 *  @brief  将该模块加入到模块管理中，不需要的时候请使用finishModuleWithId
 *
 *  @param   moduleId   模块id
 *
 *  @return  如果改模块不支持，返回错误，成功返回nil
 */
- (NSError *)requireModuleWithId:(NSString *)moduleId;

/**
 *  @brief  和require成对出现，如果该模块没有被其他模块require，将会被移除
 *
 *  @param   moduleId   模块id
 *
 *  @return  如果改模块不支持，返回错误，成功返回nil
 */
- (NSError *)finishModuleWithId:(NSString *)moduleId;

/**
 *  @brief  私有方法，请勿调用
 *
 *  @param   module
 */
- (void)registModule:(XAppModule *)module;

/**
 *  @brief  私有方法，请勿调用
 *
 *  @param   module
 */
- (void)removeModule:(XAppModule *)module;

/**
 *  @brief  调用相关方法,可以通过这个方法反射需要的方法。
 *
 *  @return 返回方法调用值，如果不支持，返回erro
 */
- (id)callMethod:(NSString *)method moduleId:(NSString *)moduleId params:(NSArray *)params erro:(NSError **)error;

/**
 *  @brief  调用静态方法，如果不支持返回NSErro
 *
 *  @param   method   方法名
 *  @param   params   参数列表
 *
 *  @return  返回方法调用值，如果不支持，返回erro
 */
- (id)callInstancesMethod:(NSString *)method
                 moduleId:(NSString *)moduleId
                   params:(NSArray *)params
                     erro:(NSError **)error;

@end


@interface XAppModuleManager (Base)

/**
 *  @brief  模块是否可见
 *
 *  @param   moduleId   模块id
 *
 *  @return  返回是否模块可见
 */
- (BOOL)isModuleVisible:(NSString *)moduleId;

@end

@interface XAppModuleManager (module)

/**
 *  @brief  配置方法
 *
 *  @param   params   配置使用的参数
 */
- (id)config:(NSDictionary *)params moduleId:(NSString *)moduleId erro:(NSError **)erro;

/**
 *  @brief  获取模块版本号
 *
 *  @param   moduleId   模块id
 *
 *  @return  返回版本号
 */
- (NSString *)versionWithModuleId:(NSString *)moduleId erro:(NSError **)erro;

/**
 *  @brief  获取默认配置
 *
 *  @param   moduleId   模块id
 *
 *  @return  返回默认配置
 */
- (NSDictionary *)defaultConfigWithModuleId:(NSString *)moduleId erro:(NSError **)erro;

/**
 *  @brief  获取模块的根view，如果没有就返回erro
 *
 *  @param   moduleId   模块id
 *
 *  @return  如果有就返回，没有就返回erro
 */
- (UIView *)rootViewWithModuleId:(NSString *)moduleId erro:(NSError **)erro;

/**
 *  @brief  通过moduleId 获取根控制器
 *
 *  @param   moduleId   模块id
 *
 *  @return  如果有返回，否则返回空
 */
- (UIViewController *)rootViewControllerWithModuleId:(NSString *)moduleId erro:(NSError **)erro;

/**
 *  @brief 通过moduleId 获取根控制器
 *
 *  @param   moduleId   模块id
 *  @param   config   模块需要的配置信息,应该是一个json串
 *  @param   erro   如果模块不存在或方法不存在，返回erro
 *
 *  @return  如果有返回，否则返回空
 */
- (UIViewController *)rootViewControllerWithModuleId:(NSString *)moduleId config:(NSString *)configJson erro:(NSError **)erro;

@end


@interface XAppModuleManager (page)

- (UIViewController *)rootViewControllerWithModuleId:(NSString *)moduleId
                                              pageId:(NSString *)pageId
                                              config:(NSDictionary *)configJson
                                                erro:(NSError **)erro;
@end



@interface XAppModuleManager (navigator)

/**
 *  @brief  push一个模块
 *
 *  @param   moduleId   模块id
 *  @param   params   模块参数
 *  @param   erro 如果模块不存在或方法不存在，返回erro
 *
 *  @return  返回是否成功
 */
- (BOOL)pushViewControllerWithModuleId:(NSString *)moduleId
                                params:(NSString *)params
                                  erro:(NSError **)erro;
@end
