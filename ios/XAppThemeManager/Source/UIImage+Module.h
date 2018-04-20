//
//  UIImage+Module.h
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#define XAPP_MODULE_IMAGE(__NAME__,__MODULEID__) [UIImage imageForKey:__NAME__ moduleId:__MODULEID__]

@interface UIImage (Module)

+ (UIImage *)imageForKey:(NSString *)name moduleId:(NSString *)moduleId;

@end
