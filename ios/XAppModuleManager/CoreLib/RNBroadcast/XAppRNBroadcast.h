//
//  XAppRNBroadcast.h
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTLog.h"

@interface XAppRNBroadcast : NSObject <RCTBridgeModule>


+ (XAppRNBroadcast *)instance;

@property(nonatomic, strong) RCTBridge *bridge;


/*!
 *
 *  @brief 向RN发送一个广播事件
 *
 *  @param aAction  事件名 action , 规范：[XApp-RNAction-模块—事件]
 *  @param aBodyDic 所带参数
 */
-(void)sendEvent:(NSString *)aAction withBody:(NSDictionary *)aBodyDic;

@end
