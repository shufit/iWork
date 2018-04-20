//
//  XAppRNRootViewController.h
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppBaseViewController.h"

@interface XAppRNRootViewController : XAppBaseViewController

@property (nonatomic, assign) UIInterfaceOrientation uiInterfaceOrientation;

//native页面跳转到react native页面
- (instancetype)initWithModuleName:(NSString *)jsModuleName initialProperties:(NSDictionary *) initialProperties;

@end
