//
//  XAppPageViewModuleManager.m
//  RNProject
//
//  Created by ShiXiaoHui on 12/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppPageViewModuleManager.h"

@implementation XAppPageViewModuleManager

- (UIView *)rootView {
  UIView *view = self.rootViewController.view;
  return view;
}

- (UIViewController *)rootViewController {
  return [[UIViewController alloc] init];
}

- (UIViewController *)rootViewControllerWithConfig:(NSString *)parameterJson {
  if (parameterJson) {
    self.parameterJson = parameterJson;
  }
  return [self rootViewController];
}

@end
