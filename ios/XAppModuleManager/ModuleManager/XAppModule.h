//
//  XAppModule.h
//  RNProject
//
//  Created by ShiXiaoHui on 11/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XAppModuleManager.h"
#import "XAppModuleMacros.h"

@interface XAppModule : NSObject

@property(nonatomic, assign) NSUInteger moduleRetainCount;
@property(nonatomic, copy) NSString * parameterJson;


#pragma mark - Property
/**
 *  @brief  当前模块的id，是模块唯一标示，默认是模块名
 *
 *  @return  返回模块id
 */
- (NSString *)moduleId;

/**
 *  @brief  是否已经配置
 *
 *  @return  返回是否已经配置
 */
- (BOOL)hasConfig;
/**
 *  @brief  调用相关方法,可以通过这个方法反射需要的方法。
 *
 *  @return 返回方法调用值，如果不支持，返回erro
 */
- (id)callMethod:(NSString *)method params:(NSArray *)params erro:(NSError **)erro;

/**
 *  @brief  调用静态方法，如果不支持返回NSErro
 *
 *  @param   method   方法名
 *  @param   params   参数列表
 *
 *  @return  返回方法调用值，如果不支持，返回erro
 */
+ (id)callInstancesMethod:(NSString *)method params:(NSArray *)params erro:(NSError **)erro;

/**
 *  @brief  //加载此模块，需要在调用前调用
 */
- (void)require;

/**
 *  @brief  模块结束时调用
 */
- (void)finished;

/**
 *  @brief  模块的配置方法，系统会默认使用配置文件中的默认配置配置一次
 *
 *  @param   dic   配置数据
 */
- (void)config:(NSDictionary *)dic;

#pragma mark - Class Method
/**
 *  @brief  模块名字，底层需要通过这个名字找到相应的配置文件
 *
 *  @return  然会模块名字，子类需要实现
 */
+ (NSString *)moduleName;

/**
 *  @brief  模块初始化的参数，子类通常不需要复写，需要在配置文件中写入默认配置参数
 *
 *  @return  返回配置参数
 */
+ (NSDictionary *)defaultConfig;

/**
 *  @brief  模块的唯一标示，默认是模块名，子类通常不需要复写
 *
 *  @return  返回当前url
 */
+ (NSString *)url;

/**
 *  @brief  模块当前版本号，需要子类复写，需要在配置文件中写入版本号
 *
 *  @return  返回当前模块版本号
 */
+ (NSString *)version;


/**
 *  判断是否自定义跳转逻辑
 *
 *  @param pageId           页面Id
 *  @param pageConfigString 页面数据
 *  @param callback         回调处理
 *
 *  @return 判断是否自定义跳转逻辑
 */
- (BOOL)startPageId:(NSString *)pageId
   pageConfigString:(NSString *)pageConfigString
     nativeCallback:(NativeJumpCallBackBlock)callback;


/**
 *  @brief  模块默认是否有效，子类需要复写此方法决定模块默认是否有效
 *  模块是否有效优先级：build.cfg > isDefaultModuleEnable
 *  即优先以build.cfg中配置的模块最优先，build.cfg中没有配置时以本方法为准
 *
 *  @return  是否支持此服务
 */
+ (BOOL)isDefaultModuleEnable;

@end
