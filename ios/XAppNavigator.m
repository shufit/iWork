//
//  XAppNavigator.m
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppNavigator.h"
#import "AppDelegate.h"
#import "XAppModuleManager.h"

@interface XAppNavigator ()<UINavigationControllerDelegate>

@end


@implementation XAppNavigator

- (void)openRootViewController {
  //打开app的根控制器
  [XApp_ModuleManager requireModuleWithId:@"XAppContainer"];
  NSError * tabbarError = nil;;
  _rootViewController = [XApp_ModuleManager rootViewControllerWithModuleId:@"XAppContainer" erro:&tabbarError];
  if (tabbarError) {
    NSLog(@"初始化根控制器模块出错: %@",tabbarError);
  }
  AppDelegate *delegete = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  delegete.window.rootViewController = _rootViewController;
  self.navigationController.delegate = self;
}


- (UIViewController *)visibleViewController {
  AppDelegate *delegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  UIViewController *root = delegate.window.rootViewController;
  
  if ([root isKindOfClass:[UITabBarController class]]) {
    UITabBarController *tab = (UITabBarController *)root;
    if (tab.presentedViewController != nil) {
      UIViewController *preController = tab.presentedViewController;
      if ([preController isKindOfClass:[UINavigationController class]]) {
        return [(UINavigationController *)preController visibleViewController];
      } else {
        return preController;
      }
    } else {
      UIViewController *con = tab.selectedViewController;
      if ([con isKindOfClass:[UINavigationController class]]) {
        return [(UINavigationController *)con visibleViewController];
      }
      return con;
    }
  }
  
  else if ([root isKindOfClass:[UINavigationController class]]) {
    return [(UINavigationController *)root visibleViewController];
  }
  
  return root;
}


#pragma - mark Property
- (UINavigationController *)navigationController {
  return self.visibleViewController.navigationController;
}


#pragma mark - UINavigationControllerDelegate
- (void)navigationController:(UINavigationController *)navigationController willShowViewController:(UIViewController *)viewController animated:(BOOL)animated {
  _waitNavigation = YES; //http://qa.helplib.com/448813 解决ios7 有时候push不进去的问题
}
- (void)navigationController:(UINavigationController *)navigationController didShowViewController:(UIViewController *)viewController animated:(BOOL)animated {
  _waitNavigation = NO;
}
@end
