//
//  UIImage+Module.m
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "UIImage+Module.h"
#import "XAppThemeManager.h"

@implementation UIImage (Module)

+ (UIImage *)imageForKey:(NSString *)name moduleId:(NSString *)moduleId {
  return [[XAppThemeManager shareInstance] imageForKey:name moduleId:moduleId];
}

@end
