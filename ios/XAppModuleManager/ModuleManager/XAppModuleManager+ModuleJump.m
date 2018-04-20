//
//  XAppModuleManager+ModuleJump.m
//  RNProject
//
//  Created by ShiXiaoHui on 13/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModuleManager+ModuleJump.h"
#import "XAppReactModuleManager.h"
#import "JSONKit.h"


static NSMutableDictionary *jumpCallbackDictionary;
static NSMutableDictionary *sH5RegisterModulePages;
static ModuleJumperCallback singleH5ModuleJumper;
static ModuleJumperCallback singleNativeModuleJumper;
static ModuleJumperCallback singleRNModuleJumper;

static NSMutableArray *sRnRegisterModulePages;
static XAppReactModuleManager *reactModuleManager;

@implementation XAppModuleManager (ModuleJump)

+ (void)registerH5ModuleJumper:(ModuleJumperCallback)h5ModuleJumper{
  if(h5ModuleJumper){
    singleH5ModuleJumper = h5ModuleJumper;
  }
}

+ (void)registerH5Module:(NSString *)moduleId
                    page:(NSString *)pageId{
  if(!sH5RegisterModulePages){
    sH5RegisterModulePages = [NSMutableDictionary dictionary];
  }
  NSString *modulePage = [NSString stringWithFormat:@"%@/%@",moduleId,pageId];
  [sH5RegisterModulePages setValue:[NSDictionary dictionary]
                            forKey:[NSString stringWithFormat:@"dictionary_%@",modulePage]];
}

+ (void)registerH5Module:(NSString *)moduleId
                    page:(NSString *)pageId
            uiParameters:(NSDictionary *)uiParmeters{
  [self registerH5Module:moduleId
                    page:pageId];
}

+ (void)registerH5Module:(NSString *)moduleId
                    page:(NSString *)pageId
                callBack:(InvokeCallBack)callback
{
  if(!sH5RegisterModulePages){
    sH5RegisterModulePages = [NSMutableDictionary dictionary];
  }
  NSString *modulePage = [NSString stringWithFormat:@"%@/%@",moduleId,pageId];
  [sH5RegisterModulePages setValue:callback
                            forKey:[NSString stringWithFormat:@"block_%@",modulePage]];
}

- (BOOL)startH5ModulePage:(NSString *)moduleId
                   pageId:(NSString *)pageId
               callbackId:(NSString *)callbackId
                 callback:(NativeJumpCallBackBlock)callback
               pageConfig:(NSDictionary *)pageConfig
{
  NSString *modulePage = [NSString stringWithFormat:@"%@/%@",moduleId,pageId];
  id obj;
  // 如果跳转方式不统一
  if([sH5RegisterModulePages valueForKey:[NSString stringWithFormat:@"block_%@",modulePage]]){
    obj = [sH5RegisterModulePages valueForKey:[NSString stringWithFormat:@"block_%@",modulePage]];
    InvokeCallBack invokedBlock = (InvokeCallBack)obj;
    if(invokedBlock){
      invokedBlock();
    }
    return YES;
  }
  
  // 如果跳转的方式统一
  if([sH5RegisterModulePages valueForKey:[NSString stringWithFormat:@"dictionary_%@",modulePage]]){
    obj = [sH5RegisterModulePages valueForKey:[NSString stringWithFormat:@"dictionary_%@",modulePage]];
    if(singleH5ModuleJumper){
      singleH5ModuleJumper(moduleId,pageId,callbackId,callback,pageConfig);
    }
    return YES;
  }
  return NO;
}


#pragma mark - NativeModuleJumper

+ (void)registerNativeModuleJumper:(ModuleJumperCallback)nativeModuleJumper{
  if(nativeModuleJumper){
    singleNativeModuleJumper = nativeModuleJumper;
  }
}

- (void)startModulePage:(NSString *)moduleId
                 pageId:(NSString *)pageId
       pageConfigString:(NSString *)pageConfigString
         nativeCallback:(NativeJumpCallBackBlock)callback
{
  NSData *jsonData = [pageConfigString dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *pageConfig = [NSJSONSerialization JSONObjectWithData:jsonData
                                                             options:NSJSONReadingMutableLeaves
                                                               error:nil];
  [self startModulePage:moduleId
                 pageId:pageId
             pageConfig:pageConfig
         nativeCallback:callback];
  
}

- (void)startModulePage:(NSString *)moduleId
                 pageId:(NSString *)pageId
             pageConfig:(NSDictionary *)pageConfig
         nativeCallback:(NativeJumpCallBackBlock)callback
{
  // 获取当前的界面
  UIViewController *currentVisibleController = [XApp_ModuleManager.navigator visibleViewController];
  NSString *callbackId = nil;
  NativeJumpCallBackBlock block;
  if(callback){
    block = [callback copy];
    callbackId = [NSString stringWithFormat:@"%ld",[block hash]];
    [XApp_ModuleManager addJumpCallbackId:callbackId
                                callBack:callback
                          viewController:currentVisibleController];
  }
  
  BOOL isRNPage = [XApp_ModuleManager startRNModulePage:moduleId
                                                pageId:pageId
                                            callbackId:callbackId
                                              callback:block
                                            pageConfig:pageConfig];
  
  if(isRNPage){
    return;
  }
  
  BOOL isH5Page = [XApp_ModuleManager startH5ModulePage:moduleId
                                                pageId:pageId
                                            callbackId:callbackId
                                              callback:block
                                            pageConfig:pageConfig];
  if(isH5Page){
    return;
  }
  
  if(singleNativeModuleJumper){
    singleNativeModuleJumper(moduleId,pageId,callbackId,callback,pageConfig);
  }
}


#pragma mark - RN
+ (void)load{
  if(!reactModuleManager){
    reactModuleManager = [[XAppReactModuleManager alloc] init];
  }
}

+ (void)registerRNModuleJumper:(ModuleJumperCallback)RNModuleJumper{
  if(RNModuleJumper){
    singleRNModuleJumper = RNModuleJumper;
  }
}

+ (void)registerRNModulePage:(NSArray *)moduleInfo{
  if(!sRnRegisterModulePages){
    sRnRegisterModulePages = [NSMutableArray array];
  }
  if(moduleInfo){
    [sRnRegisterModulePages addObjectsFromArray:moduleInfo];
  }
}

- (BOOL)startRNModulePage:(NSString *)moduleId
                   pageId:(NSString *)pageId
               callbackId:(NSString *)callbackId
                 callback:(NativeJumpCallBackBlock)callback
               pageConfig:(NSDictionary *)pageConfig{
  
  if([XAppModuleManager containModuleId:moduleId
                                 pageId:pageId]){
    if(singleRNModuleJumper){
      singleRNModuleJumper(moduleId,pageId,callbackId,callback,pageConfig);
    }
    return YES;
  }
  return NO;
}

+ (BOOL)containModuleId:(NSString *)moduleId
                 pageId:(NSString *)pageId{
  NSDictionary *moduleInfo;
  NSInteger index;
  for(index = 0;index < sRnRegisterModulePages.count;index++){
    moduleInfo = sRnRegisterModulePages[index];
    if([moduleInfo[@"module"] isEqualToString:moduleId]){
      break;
    }
  }
  
  if(index >= sRnRegisterModulePages.count){
    return NO;
  }
  
  NSArray *pages = moduleInfo[@"pages"];
  return [pages containsObject:pageId];
}

@end



@implementation XAppModuleManager (HandleJumpCallback)

#pragma mark - Custom JumpCallback
- (void)addJumpCallbackId:(NSString *)callbackId
                 callBack:(NativeJumpCallBackBlock)callback
           viewController:(UIViewController *)viewController
{
  if(!jumpCallbackDictionary){
    jumpCallbackDictionary = [[NSMutableDictionary alloc] init];
  }
  // 首先清除掉之前的暂存信息
  [self removeCallbackFromViewController:viewController];
  
  NSMutableDictionary *itemDictionary = [[NSMutableDictionary alloc] init];
  [itemDictionary setValue:@([viewController hash]) forKey:@"viewController"];
  [itemDictionary setValue:callback forKey:@"callback"];
  [jumpCallbackDictionary setValue:[itemDictionary copy]
                            forKey:callbackId];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(moduleManagerHandleNotification:)
                                               name:callbackId
                                             object:nil];
}

- (void)removeCallbackFromViewController:(UIViewController *)viewController
{
  NSArray *callbackIds = [jumpCallbackDictionary allKeys];
  NSDictionary *itemDictionary;
  NSString *callbackId;
  int i = 0;
  for(;i < [callbackIds count];i++){
    callbackId = callbackIds[i];
    itemDictionary = [jumpCallbackDictionary valueForKey:callbackId];
    if([itemDictionary[@"viewController"] integerValue] == (NSInteger)[viewController hash]){
      break;
    }
  }
  
  if(i < [callbackIds count] && [callbackId length] > 0){
    [jumpCallbackDictionary removeObjectForKey:callbackId];
  }
}

- (void)handleCustomCallbackId:(NSString *)callbackId
                          data:(NSDictionary *)data
{
  NSArray *callbackIds = [jumpCallbackDictionary allKeys];
  NSDictionary *itemDictionary;
  NSString *itemCallbackId;
  NativeJumpCallBackBlock callbackBlock;
  for(int i = 0;i < [callbackIds count];i++){
    itemCallbackId = callbackIds[i];
    itemDictionary = [jumpCallbackDictionary valueForKey:itemCallbackId];
    if([itemCallbackId isEqualToString:callbackId]){
      callbackBlock = itemDictionary[@"callback"];
      break;
    }
  }
  
  if(callbackBlock){
    callbackBlock(data,YES);
  }
}

- (void)moduleManagerHandleNotification:(NSNotification *)notification
{
  NSString *callbackId = notification.name;
  NSDictionary *data = notification.userInfo;
  [self handleCustomCallbackId:callbackId
                          data:data];
}

- (void)postCallbackId:(NSString *)callbackId
                  data:(NSDictionary *)data
{
  [[NSNotificationCenter defaultCenter] postNotificationName:callbackId
                                                      object:nil
                                                    userInfo:data];
}


/**
 *  启动模块页面
 *
 *  @param callbackId       回调唯一标识
 *  @param jsonDataString   回调数据
 */
RCT_EXPORT_METHOD(postModuleCallbackData:(NSString *)callbackId
                  jsonDataString:(NSString *)jsonDataString)
{
  NSDictionary *jsonData = [jsonDataString objectFromJSONString];
  [XApp_ModuleManager postCallbackId:callbackId
                               data:jsonData];
}
@end









