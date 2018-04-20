//
//  XAppContext.h
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XAppConfigProtocol.h"
#import "React/RCTBridge.h"
#import "React/RCTBridgeModule.h"
#import "XAppRNBroadcast.h"

/**
 *  @brief  打包类型参数,请勿修改相关参数
 *  XAppPackageTypeDevelop:测试包，qa平时测试使用，（日志开，RN调试开，测试环境）
 *  XAppPackageTypeDistribution:市场发布包，用于发布市场，（（日志关，RN调试关，生产环境）
 *  XAppPackageTypeUAT:行方测试包，供行方测试使用，（日志开，RN调试关，测试环境）
 *  XAppPackageTypeProduct:生产测试包，供在生产环境中测试使用，（日志开，RN调试关，生产环境）
 *  XAppPackageTypeSecury:安全测试包，供在测试环境中测试使用，（日志关，RN调试关，测试环境）
 *  XAppPackageTypeMonkey：自动化测试包，用于做monkey测试，（日志开，RN调试关，测试环境）
 
 */
typedef enum : NSUInteger
{
  XAppPackageTypeDevelop = 0,
  XAppPackageTypeDistribution,
  XAppPackageTypeUAT,
  XAppPackageTypeProduct,
  XAppPackageTypeSecury,
  XAppPackageTypeMonkey,
} XAppPackageType;

#define XApp_Context  [XAppContext instance]
#define XApp_Config   [XAppContext instance].config

@interface XAppContext : NSObject<RCTBridgeModule>

@property (nonatomic, strong) id<XAppConfigProtocol> config;

@property(nonatomic, copy) NSString * serverTimeStamp;
@property(nonatomic, assign) NSTimeInterval requestTimeStamp;

@property(nonatomic, strong,readonly) RCTBridge *localBridge;

@property(nonatomic, strong) RCTBridge *bridge;

@property(nonatomic, strong) XAppRNBroadcast * rnBroadcast;

@property (nonatomic, assign) XAppPackageType packageType;


+ (XAppContext *)instance;

@end
