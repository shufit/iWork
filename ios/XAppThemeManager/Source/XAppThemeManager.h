//
//  XAppThemeManager.h
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface XAppThemeManager : NSObject

@property (nonatomic, copy) NSString *defaultTheme;


+ (XAppThemeManager *)shareInstance;

/**
 *  图片主题适配
 *
 *  @param name     图片名
 *  @param moduleId 寻找的bundle
 *
 *  @return 图片
 */
- (UIImage *)imageForKey:(NSString *)name
                moduleId:(NSString *)moduleId;

/**
 *  颜色，数字等配置
 *
 *  @param name 名
 *
 *  @return 相关配置的值
 */
- (id)appThemeValueForKey:(NSString *)name;

@end
