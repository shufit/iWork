//
//  XAppModuleConfig.h
//  RNProject
//
//  Created by ShiXiaoHui on 3/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface XAppModuleConfig : NSObject
@property (nonatomic, copy) NSString *moduleName; //模块名称
@property (nonatomic, copy) NSString *version;
@property (nonatomic, assign) BOOL isEnable; //模块是否可用
@property (nonatomic, strong) NSArray *unAvailableServiceList;//关闭的服务列表
@property (nonatomic, strong) NSArray *serviceList; //提供的所有服务列表

- (id) initWithDic:(NSDictionary *)dic;

- (BOOL)isServiceAvilible:(NSString *)serviceId;

- (BOOL)isServiceAvilible:(NSString *)serviceId defaultValue:(BOOL)defaultValue; //如果没有配置，返回默认的值

@end
