//
//  XAppPageViewModuleManager.h
//  RNProject
//
//  Created by ShiXiaoHui on 12/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModule.h"

@interface XAppPageViewModuleManager : XAppModule

- (UIView *)rootView;

- (UIViewController *)rootViewController;

- (UIViewController *)rootViewControllerWithConfig:(NSString *)parameterJson;

@end
