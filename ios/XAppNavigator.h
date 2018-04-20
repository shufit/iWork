//
//  XAppNavigator.h
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XAppNavigatorProtocol.h"
#import "XAppModuleManager.h"


#define XApp_Navigator           ((XAppNavigator *)([XAppModuleManager shareInstance].navigator))

@interface XAppNavigator : NSObject <XAppNavigatorProtocol>

@property (nonatomic, strong ,readonly) UINavigationController *navigationController;
@property (nonatomic, strong ,readonly) UIViewController *rootViewController;
@property (nonatomic, assign) BOOL waitNavigation;

//打开rootController
- (void)openRootViewController;

- (UIViewController*)visibleViewController;

@end
