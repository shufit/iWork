//
//  XAppTabbarModuleManager.m
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppTabbarModuleManager.h"
#import "XAppTabbarModuleMacros.h"
#import "XAppNavigationController.h"
#import "XAppRNHCRootViewController.h"
#import "DeviceMacros.h"


@interface XAppTabbarModuleManager()

@property(nonatomic, strong) UIViewController *rootViewController;

@end

@implementation XAppTabbarModuleManager

+ (NSString *)moduleName {
  return kXAppTabbarModuleId;
}



#pragma mark - Override
- (UIViewController *)rootViewController {
  
  if (_rootViewController == nil) {
    XAppRNHCRootViewController * ctl = [[XAppRNHCRootViewController alloc] initWithModuleName:@"AppContainer" initialProperties:@{} WithPlaceHolderImage:[self getDeviceLaunchImage]];
    _rootViewController = [[XAppNavigationController alloc] initWithRootViewController:ctl];
  }
  
  return _rootViewController;
  
}

-(UIImage*)getDeviceLaunchImage
{
  NSInteger height = SCREEN_HEIGHT;
  switch (height) {
    case 480:
      return [UIImage imageNamed:@"LaunchImage-700"];
    case 568:
      return [UIImage imageNamed:@"LaunchImage-700-568h"];
    case 667:
      return [UIImage imageNamed:@"LaunchImage-800-667h"];
    case 736:
      return [UIImage imageNamed:@"LaunchImage-800-Portrait-736h"];
    case 812:
      return [UIImage imageNamed:@"LaunchImage-1100-Portrait-2436h"];
    default:
      break;
  }
  
  return [UIImage imageNamed:@"LaunchImage-700"];
}

@end
