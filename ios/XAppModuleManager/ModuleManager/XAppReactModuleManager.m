//
//  XAppReactModuleManager.m
//  RNProject
//
//  Created by ShiXiaoHui on 13/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppReactModuleManager.h"
#import "XAppModuleManager.h"
#import "XAppModuleManager+ModuleJump.h"
#import "JSONKit.h"
#import <React/RCTBridge.h>

@implementation XAppReactModuleManager

static BOOL isAlreadySetup;

@synthesize bridge = _bridge;


RCT_EXPORT_MODULE(ReactModuleManager)

- (instancetype)init {
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(javaScriptDidLoad) name:RCTJavaScriptDidLoadNotification object:nil];
  }
  return self;
}


RCT_EXPORT_METHOD(popTo:(NSDictionary *)pageInfoDic
                  resolver:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    NSArray *pageArray = [pageInfoDic objectForKey:@"stack"];   //包含Native和RN页面的页面栈
    NSNumber *pageIndex = [pageInfoDic objectForKey:@"index"];  //需要pop到页面在pageArray中的index
    NSInteger count = 0;   //需要pop出的native页面个数
    for (NSInteger i = pageArray.count - 1; i > [pageIndex intValue]; i--) {
      
      NSDictionary *page = [pageArray objectAtIndex:i];
      NSInteger pageType = [[page objectForKey:@"type"] intValue];
      //0代表native页面，1代码PAFFRNRootViewController，2代表H5页面
      if (pageType == 0 || pageType == 1) {
        
        count++;
      }
    }
    
    NSArray *controllerArray = XApp_ModuleManager.navigator.navigationController.viewControllers;
    if (count > controllerArray.count - 1) {
      count = controllerArray.count - 1;
    }
    UIViewController *popToViewController = [controllerArray objectAtIndex:controllerArray.count - 1 - count];
    
    [self safeNavigateOption:^{
      [XApp_ModuleManager.navigator.navigationController popToViewController:popToViewController animated:YES];
    }];
    callback(@[@(YES)]);
  });
}

RCT_EXPORT_METHOD(setupReactModules:(NSArray *)reactModules) {
  if(isAlreadySetup)
    return;
  [XAppModuleManager registerRNModulePage:reactModules];
  isAlreadySetup = YES;
}

/**
 *  启动模块页面
 *
 *  @param modulePageInfo   模块页面信息
 *  @param callback         回调
 */
RCT_EXPORT_METHOD(startModulePage:(NSDictionary *)modulePageInfo
                  resolver:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    if(modulePageInfo){
      if(!modulePageInfo[@"module"] || !modulePageInfo[@"page"]){
        NSLog(@"三端跳转:module 或者 page 不能为空");
        callback(@[@(NO),@""]);
        return;
      }
      
      // 如果不是h5直接传递下层中的参数
      [XApp_ModuleManager startModulePage:modulePageInfo[@"module"] ? modulePageInfo[@"module"] : @""
                                  pageId:modulePageInfo[@"page"] ? modulePageInfo[@"page"] : @""
                              pageConfig:modulePageInfo[@"params"]
                          nativeCallback:^(NSDictionary *response,BOOL success) {
                            if(callback)
                            {
                              NSString *responseString;
                              if(response){
                                NSData *responseData = [NSJSONSerialization dataWithJSONObject:response
                                                                                       options:NSJSONWritingPrettyPrinted
                                                                                         error:nil];
                                responseString = [[NSString alloc] initWithData:responseData
                                                                       encoding:NSUTF8StringEncoding];
                              }
                              callback(@[@(success),responseString ? responseString : @""]);
                            }
                          }];
    }
  });
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

- (void)safeNavigateOption:(void(^)())navigateOption {
  if ([[[UIDevice currentDevice] systemVersion] floatValue] < 8.0) {
    if ([XApp_ModuleManager.navigator respondsToSelector:@selector(waitNavigation)] && !XApp_ModuleManager.navigator.waitNavigation) {
      if (navigateOption) {
        navigateOption();
      }
    }else {
      dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (navigateOption) {
          navigateOption();
        }
      });
    }
  } else {
    if (navigateOption) {
      navigateOption();
    }
  }
}



- (void)javaScriptDidLoad {
  NSDictionary *jsDic = @{@"type": @"",
                          @"data": @"native"};
//  [_bridge enqueueJSCall:@"HFModuleManager.nativeGetModules"
//                    args:@[jsDic]];
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self name:RCTJavaScriptDidLoadNotification object:nil];
}

@end
