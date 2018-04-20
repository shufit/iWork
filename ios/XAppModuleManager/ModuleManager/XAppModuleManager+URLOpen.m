//
//  XAppModuleManager+URLOpen.m
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModuleManager+URLOpen.h"
#import "XAppBaseViewController.h"
#import "XAppBaseWebViewController.h"
#import "XAppModuleManager+ModuleJump.h"
#import "XAppRNRootViewController.h"
#import "XAppNavigator.h"
#import "XAppNavigationController.h"
#import "NSDictionary+UrlEncoding.h"
#import "JSONKit.h"
#import <React/RCTConvert.h>

@implementation XAppModuleManager (URLOpen)


- (void)openPageWithUrl:(NSString *)url options:(NSDictionary *)option {
  if(!url){
    return;
  }
  // 打开一个webView
  if([self isNetworkRequestUrl:url]){
    XAppBaseWebViewController *vc = [[XAppBaseWebViewController alloc] init];
    vc.closeButtonHidden = NO;
    NSMutableDictionary *mutableOptions = [[NSMutableDictionary alloc] initWithDictionary:option];
    mutableOptions[@"url"] = url;
    mutableOptions[@"type"] = @2;
    if (mutableOptions) {
      
      NSData *parametersData = [NSJSONSerialization dataWithJSONObject:mutableOptions
                                                               options:NSJSONWritingPrettyPrinted
                                                                 error:nil];
      NSString *parametersString = [[NSString alloc] initWithData:parametersData
                                                         encoding:NSUTF8StringEncoding];
      [vc setParameter:parametersString];
    }
    UIViewController *currentVisibleController = [XApp_Navigator visibleViewController];
    [currentVisibleController.navigationController pushViewController:vc
                                                             animated:YES];
    return;
  }
  
  if(![self isCustomProtocalUrl:url]){
    return;
  }
  
  // 三端统一跳转
  NSArray *urlItems = [url componentsSeparatedByCharactersInSet:[NSCharacterSet
                                                                 characterSetWithCharactersInString:@"/?"]];
  NSString *moduleId = urlItems[3];
  NSString *pageId = urlItems[4];
  NSString *parmeterString = nil;
  if(urlItems.count >= 6){
    parmeterString = urlItems[5];
  }
  
  if(!moduleId || !pageId){
    return;
  }
  
  NSArray *parmetersArray = [parmeterString componentsSeparatedByCharactersInSet:[NSCharacterSet
                                                                                  characterSetWithCharactersInString:@"&="]];
  NSMutableDictionary *parmetersDic = [NSMutableDictionary dictionary];
  
  for(int i = 0;i < parmetersArray.count;i += 2){
    NSString *key = parmetersArray[i];
    NSString *value = parmetersArray[i + 1];
    [parmetersDic setValue:value
                    forKey:key];
  }
  
  [XApp_ModuleManager startModulePage:moduleId
                              pageId:pageId
                          pageConfig:[parmetersDic copy]
                      nativeCallback:nil];
}

- (void)openPageWithUrl:(NSString *)url
{
  [self openPageWithUrl:url options:nil];
}

- (BOOL)isNetworkRequestUrl:(NSString *)url
{
  return [url hasPrefix:@"http://"] || [url hasPrefix:@"https://"];
}

- (BOOL)isCustomProtocalUrl:(NSString *)url
{
  return [url hasPrefix:@"xapp://navigator/"];
}


RCT_EXPORT_METHOD(openPageWithOption:(NSDictionary *)option) {
  NSString *url = [RCTConvert NSString:option[@"url"]];
  if (url) {
    [self openPageWithUrl:url options:option];
  }
}

#pragma mark - 自实现跳转方式
+ (void)startH5ModulePage:(NSString *)moduleId
                   pageId:(NSString *)pageId
               callbackId:(NSString *)callbackId
           nativeCallback:callback
               pageConfig:(NSDictionary *)pageConfig{
  
  NSMutableDictionary *mutablePageConfig = [[NSMutableDictionary alloc] init];
  // 1.添加传递的参数(存在重复数据以参数传递过来的为主)
  if(mutablePageConfig){
    [mutablePageConfig addEntriesFromDictionary:pageConfig];
  }
  
  // 2.重组url
  NSDictionary *dataParmeters = nil;
  if(mutablePageConfig && mutablePageConfig[@"params"]){
    NSString *dataParmetersString = mutablePageConfig[@"params"];
    dataParmeters = [dataParmetersString objectFromJSONString];
  }
  
  NSMutableString *path = [NSMutableString stringWithString:mutablePageConfig[@"url"]];
  if (dataParmeters && [dataParmeters count] > 0) {
    if (![path containsString:@"?"]) {
      [path appendString:@"?"];
    }else {
      [path appendString:@"&"];
    }
    
    NSString *urlStr = [dataParmeters urlEncodedString];
    [path appendString:urlStr];
  }
  
  if(callbackId){
    if(![path containsString:@"?"]){
      [path appendString:@"?"];
    }
    [path appendFormat:@"&%@=%@",@"module_callback_id",callbackId];
  }
  [mutablePageConfig setValue:path
                       forKey:@"url"];
  
  XAppBaseWebViewController *newWebViewController = [[XAppBaseWebViewController alloc] init];
  NSData *parametersData = [NSJSONSerialization dataWithJSONObject:mutablePageConfig
                                                           options:NSJSONWritingPrettyPrinted
                                                             error:nil];
  NSString *parametersString = [[NSString alloc] initWithData:parametersData
                                                     encoding:NSUTF8StringEncoding];
  newWebViewController.hidesBottomBarWhenPushed = YES;
  [newWebViewController setParameter:parametersString];
  UIViewController *currentVisibleController = [XApp_Navigator visibleViewController];
  [currentVisibleController.navigationController
   pushViewController:newWebViewController
   animated:YES];
  
  ((XAppBaseWebViewController *)newWebViewController).callbackId = callbackId;
}

+ (void)startRNModulePage:(NSString *)moduleId
                   pageId:(NSString *)pageId
               callbackId:(NSString *)callbackId
           nativeCallback:callback
               pageConfig:(NSDictionary *)pageConfig{
  NSMutableDictionary *mutablePageConfig = [[NSMutableDictionary alloc] initWithDictionary:pageConfig];
  if(callbackId){
    [mutablePageConfig setValue:callbackId
                         forKey:@"module_callback_id"];
  }
  NSString *modulePageName = [NSString stringWithFormat:@"%@.%@",moduleId,pageId];
  UIViewController *targetController = [[XAppRNRootViewController alloc]  initWithModuleName:modulePageName
                                                                           initialProperties:[mutablePageConfig copy]];
  targetController.hidesBottomBarWhenPushed = YES;
  ((XAppBaseViewController *)targetController).callbackId = callbackId;
  if([pageConfig[@"isPresent"] boolValue]){
    XAppNavigationController *newNavigationController = [[XAppNavigationController alloc] initWithRootViewController:targetController];
    [[XApp_Navigator visibleViewController] presentViewController:newNavigationController
                                                        animated:YES
                                                      completion:nil];
  }else{
    [XApp_Navigator.navigationController
     pushViewController:targetController
     animated:YES];
  }
}

+ (void)startNativeModulePage:(NSString *)moduleId
                       pageId:(NSString *)pageId
                   callbackId:(NSString *)callbackId
               nativeCallback:(NativeJumpCallBackBlock)callback
                   pageConfig:(NSDictionary *)pageConfig{
  
  UIViewController *targetController = nil;
  NSError *error;
  id obj = callback;
  if (obj == nil) {
    obj = [NSNull null];
  }
  // 1.首先需要判断相应的module是否实现了startPageId的方法且存在自定义处理
  NSString *method = @"startPageId:pageConfigString:nativeCallback:";
  NSArray *params;
  params = @[pageId,pageConfig ? [pageConfig JSONString] :  @"",obj];
  id result = [XApp_ModuleManager callMethod:method
                                   moduleId:moduleId
                                     params:params
                                       erro:&error];
  // 此处不需要回调，回调传到业务层具体处理
  if(!error && [result boolValue]){
    return;
  }
  
  // 2.没有实现相应的页面跳转的方法，就索引反射构建
  error = nil;
  targetController = [XApp_ModuleManager rootViewControllerWithModuleId:moduleId
                                                                pageId:pageId
                                                                config:pageConfig
                                                                  erro:&error];
  ((XAppBaseViewController *)targetController).callbackId = callbackId;
  if(error){
    if(callback){
      callback(nil,NO);
    }
    return;
  }
  targetController.hidesBottomBarWhenPushed = YES;
  [[XApp_Navigator visibleViewController].navigationController pushViewController:targetController
                                                                        animated:YES];
}


+ (void)load{
  [XAppModuleManager registerH5ModuleJumper:^(NSString *moduleId, NSString *pageId, NSString *callbackId,NativeJumpCallBackBlock callback,NSDictionary *pageConfig) {
    [self startH5ModulePage:moduleId
                     pageId:pageId
                 callbackId:callbackId
             nativeCallback:callback
                 pageConfig:pageConfig];
  }];
  
  [XAppModuleManager registerRNModuleJumper:^(NSString *moduleId, NSString *pageId, NSString *callBackId, NativeJumpCallBackBlock callback,NSDictionary *pageConfig) {
    [self startRNModulePage:moduleId
                     pageId:pageId
                 callbackId:callBackId
             nativeCallback:callback
                 pageConfig:pageConfig];
  }];
  
  [XAppModuleManager registerNativeModuleJumper:^(NSString *moduleId, NSString *pageId, NSString *callbackId, NativeJumpCallBackBlock callback,NSDictionary *pageConfig) {
    [self startNativeModulePage:moduleId
                         pageId:pageId
                     callbackId:callbackId
                 nativeCallback:callback
                     pageConfig:pageConfig];
  }];
}

@end
