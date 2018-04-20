//
//  XAppThemeManager.m
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppThemeManager.h"

#define kPAFFStandardTheme @"XAPPStandardTheme.plist"
#define kPAFFCustomTheme   @"XAPPCustomTheme.plist"
#define kCommonThemeModule @"XAppThemeManager"

@interface  XAppThemeManager()
@property (strong, nonatomic) NSDictionary *appStandardThemeInfo;
@property (strong, nonatomic) NSDictionary *appCustomThemeInfo;
@end

@implementation XAppThemeManager

+ (XAppThemeManager *)shareInstance {
  static XAppThemeManager *sInstance;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sInstance = [[XAppThemeManager alloc] init];
    sInstance.defaultTheme = kCommonThemeModule;
    [sInstance setUpAppThemeInfo];
  });
  return sInstance;
}

- (void)setUpAppThemeInfo{
  if(_appCustomThemeInfo){
    return;
  }
  
  // 1.首先读取主工程中的相关配置（自定义）
  NSString *customThemeFilePath = [[NSBundle mainBundle] pathForResource:kPAFFCustomTheme
                                                                  ofType:nil];
  self.appCustomThemeInfo = [self fetchAppThemeInfoFromFilePath:customThemeFilePath];
  
  // 2.然后再读取PAFFAppTheme中的配置（标板）
  NSBundle *defaultBundle = [self bundleForModuleId:self.defaultTheme];
  NSString *standardThemeFilePath = [defaultBundle pathForResource:kPAFFStandardTheme
                                                            ofType:nil];
  self.appStandardThemeInfo = [self fetchAppThemeInfoFromFilePath:standardThemeFilePath];
}

- (NSDictionary *)fetchAppThemeInfoFromFilePath:(NSString *)filePath{
  NSDictionary *appThemeInfo = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  if([appThemeInfo count] <= 0){
    return nil;
  }
  NSMutableDictionary *resultAppThemeInfo = [[NSMutableDictionary alloc] init];
  NSArray *allComponentsKey = [appThemeInfo allKeys];
  for(NSString *componentKey in allComponentsKey){
    NSDictionary *componentThemeInfo = [appThemeInfo valueForKey:componentKey];
    [resultAppThemeInfo addEntriesFromDictionary:componentThemeInfo];
  }
  
  return [resultAppThemeInfo copy];
}

#pragma mark - Image
- (UIImage *)imageForKey:(NSString *)name
                moduleId:(NSString *)moduleId {
  UIImage *image = nil;
  
  if ([name length] == 0) {
    return image;
  }
  
  // 1.首先从主工程中取图片
  image = [self imageName:name
                   bundle:[NSBundle mainBundle]];
  if (image) {
    return image;
  }
  
  // 2.从默认主题中取出来
  image = [self imageName:name moduleId:self.defaultTheme];
  if (image) {
    return image;
  }
  
  image = [UIImage imageNamed:name];
  
  if (image == nil) {
    image = [self imageName:name moduleId:moduleId];
  }
  
  if (image == nil) {
    NSLog(@"[主题配置]未找到相关的主题配置图片，图片名:%@ 模块名:%@",name,moduleId);
  }
  
  return image;
}

- (NSBundle *)bundleForModuleId:(NSString *)moduleId {
  NSBundle *bundle = [NSBundle bundleForClass:self.class];
  NSURL *url = [bundle URLForResource:moduleId withExtension:@"bundle"];
  NSBundle *result = nil;
  if (url != nil) {
    result  = [NSBundle bundleWithURL:url];
  }
  
  return result == nil ? [NSBundle mainBundle] : result;
}

- (UIImage *)imageName:(NSString *)name moduleId:(NSString *)moduleId {
  NSBundle *bundle = [self bundleForModuleId:moduleId];
  return [self imageName:name
                  bundle:bundle];
}

- (UIImage *)imageName:(NSString *)name
                bundle:(NSBundle *)bundle{
  UIImage *image = nil;
  CGFloat scale = [UIScreen mainScreen].scale;
  if (scale >= 3.0) {
    image = [UIImage imageWithContentsOfFile:[bundle pathForResource:[NSString stringWithFormat:@"%@@3x", name]
                                                              ofType:@"png"]];
  }
  
  if (image == nil && scale >= 2.0) {
    image = [UIImage imageWithContentsOfFile:[bundle pathForResource:[NSString stringWithFormat:@"%@@2x", name]
                                                              ofType:@"png"]];
  }
  
  if (image == nil) {
    image = [UIImage
             imageWithContentsOfFile:[bundle pathForResource:[NSString stringWithFormat:@"%@", name] ofType:@"png"]];
  }
  return image;
}

#pragma mark - Others
- (id)appThemeValueForKey:(NSString *)name{
  // 1.首先读取主工程中的相关配置（自定义）
  if(_appCustomThemeInfo && [_appCustomThemeInfo valueForKey:name]){
    return [_appCustomThemeInfo valueForKey:name];
  }
  
  // 2.然后再读取XAppThemeManager中的配置（标板）
  if(_appStandardThemeInfo && [_appStandardThemeInfo valueForKey:name]){
    return [_appStandardThemeInfo valueForKey:name];
  }
  return nil;
}

@end
