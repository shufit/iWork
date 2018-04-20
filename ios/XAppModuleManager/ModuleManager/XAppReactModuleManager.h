//
//  XAppReactModuleManager.h
//  RNProject
//
//  Created by ShiXiaoHui on 13/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface XAppReactModuleManager : NSObject <RCTBridgeModule>

@property (nonatomic, weak, readonly) RCTBridge *bridge;

@end
