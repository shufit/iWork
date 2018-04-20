//
//  XAppModuleManager.m
//  RNProject
//
//  Created by ShiXiaoHui on 11/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModuleManager.h"
#import "XAppModule.h"
#import <UIKit/UIKit.h>
#import "XAppModuleErrorHelper.h"
#import "XAppModulePageProtocol.h"
#import <ReactiveCocoa/RACUnit.h>
#import <React/RCTConvert.h>

@interface XAppModuleManager ()

@property(nonatomic, strong) NSMutableDictionary *activeModulesMap;

@end

@implementation XAppModuleManager

RCT_EXPORT_MODULE(XAppModuleManager);

static NSMutableDictionary *sRegistModuleClasses; //当前注册的所有module
static NSMutableDictionary *sVisibleModuleClasses; //当前可见的所有module

void XAppRegisterModule(Class modulePageClass, NSString *modulePageId) {
  
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sRegistModuleClasses = [[NSMutableDictionary alloc] init];
    sVisibleModuleClasses = [[NSMutableDictionary alloc] init];
  });
  // Register module
  registerModuleOrPage(NSStringFromClass(modulePageClass), modulePageId);
}

/**
 *  通过meduleId+pageId的方式获取相应的页面
 *
 *  @param moduleId 模块＋页面/只有模块
 *
 *  sRegistModuleClasses 结构
 *  {
 *    moduleId:[module class],
 *    pages:{
 *        pageId1:[page class],
          pageId2:[page class],
          ...
 *     }
 *  }
 *  通过 moduleId 区分,页面:moduleId+pageId
 *                    模块:moduleId
 *
 */
void registerModuleOrPage(NSString *modulePageClass, NSString *modulePageId){
  // 1.通过判断是否包含:号区别是模块/模块中的页面
  BOOL isPage;
  NSString *moduleId;
  NSString *pageId;
  NSRange range = [modulePageId rangeOfString:@"/"];
  isPage = (range.location != NSNotFound);
  if(isPage){
    moduleId = [modulePageId substringToIndex:range.location];
    pageId = [modulePageId substringFromIndex:range.location + 1];
  }
  else
  {
    moduleId = modulePageId;
  }
  
  NSDictionary *moduleDictionary = [sRegistModuleClasses valueForKey:moduleId];
  NSMutableDictionary *mutableModuleDictionary;
  if(!moduleDictionary)
  {
    mutableModuleDictionary = [NSMutableDictionary dictionary];
  }
  else
  {
    mutableModuleDictionary = [NSMutableDictionary dictionaryWithDictionary:moduleDictionary];
  }
  
  // 2.注册module/page
  if(isPage)
  {
    NSDictionary *pages = mutableModuleDictionary[@"pages"];
    NSMutableDictionary *mutablePages = [NSMutableDictionary dictionaryWithDictionary:pages];
    [mutablePages setValue:modulePageClass forKey:pageId];
    [mutableModuleDictionary setValue:[mutablePages copy] forKey:@"pages"];
  }
  else
  {
    [mutableModuleDictionary setValue:modulePageClass forKey:moduleId];
  }
  
  [sRegistModuleClasses setValue:[mutableModuleDictionary copy] forKey:moduleId];
}

+ (XAppModuleManager *) shareInstance {
  static XAppModuleManager *instance;
  static dispatch_once_t onceToken1;
  dispatch_once(&onceToken1, ^{
    instance = [[XAppModuleManager alloc] init];
    
  });
  return instance;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    
  }
  return self;
}

- (void)setUp {
  self.activeModulesMap = [NSMutableDictionary dictionaryWithCapacity:5];
}

- (void)setUpWithNavigator:(id<XAppNavigatorProtocol>)navigator configId:(NSString *)configId publicKey:(NSString *)publicKey {
  self.navigator = navigator;
}

- (void)setUpWithNavigator:(id<XAppNavigatorProtocol>)navigator appId:(NSString *)appId publicKey:(NSString *)publicKey deviceId:(NSString *)deviceId {
  self.navigator = navigator;
}

#pragma mark - Module Circle Manage
- (void)registModule:(XAppModule *)module {
  if (module && [self.activeModulesMap objectForKey:module.moduleId] == nil) {
    [self.activeModulesMap setObject:module forKey:module.moduleId];
  }
}

- (void)removeModule:(XAppModule *)module {
  if (module) {
    [self.activeModulesMap removeObjectForKey:module.moduleId];
  }
}

- (XAppModule *)moduleWithModuleId:(NSString *)moduleId {
  if ([moduleId length] > 0) {
    return [self.activeModulesMap objectForKey:moduleId];
  }
  
  return nil;
}

- (XAppModule *)createModuleIfNeccesoryWithModuleId:(NSString *)moduleId {
  XAppModule *module = [self moduleWithModuleId:moduleId];
  if (module == nil) {
    NSDictionary *moduleDictionary = [sVisibleModuleClasses objectForKey:moduleId];
    NSString *className = moduleDictionary[moduleId];
    if ([className length] > 0) {
      Class myModule = NSClassFromString(className);
      module = [[myModule alloc] init];
      return module;
    }
  }
  return module;
}

- (NSString *)pageClassNameForModuleId:(NSString *)moduleId
                                pageId:(NSString *)pageId
{
  NSDictionary *moduleDictionary = [sRegistModuleClasses objectForKey:moduleId];
  if(!moduleDictionary)
  {
    return nil;
  }
  NSDictionary *modulePagesDictionary = moduleDictionary[@"pages"];
  NSString *pageClassName = modulePagesDictionary[pageId];
  return pageClassName;
}


- (UIViewController *)createPageIfNeccesoryWithModuleId:(NSString *)moduleId
                                                 pageId:(NSString *)pageId
{
  UIViewController *page;
  NSString *pageClassName = [self pageClassNameForModuleId:moduleId
                                                    pageId:pageId];
  if ([pageClassName length] > 0) {
    
    // 此处还需要判断页面是否以xib的方式加载的
    NSString *nibPath = [[NSBundle mainBundle] pathForResource:pageClassName ofType:@"nib"];
    Class myPage = NSClassFromString(pageClassName);
    
    if(nibPath)
    {
      page = [[myPage alloc] initWithNibName:pageClassName bundle:[NSBundle mainBundle]];
    }
    else
    {
      page = [[myPage alloc] init];
    }
    return page;
  }
  
  return page;
}


#pragma mark - Call Method

/**
 *  @brief  调用相关方法,可以通过这个方法反射需要的方法。
 *
 *  @return 返回方法调用值，如果不支持，返回nil
 */
- (id)callMethod:(NSString *)method moduleId:(NSString *)moduleId params:(NSArray *)params erro:(NSError **)error {
  XAppModule *module = [self createModuleIfNeccesoryWithModuleId:moduleId];
  
  if (module == nil) {
    if (error != NULL) {
      *error = [XAppModuleErrorHelper erroWithCode:kModuleErroCodeNoSupportModule];
    }
    return nil;
  }
  
  [module require]; // require 会注册进来
  id result = nil;
  result = [module callMethod:method params:params erro:error];
  [module finished];
  return result;
}

/**
 *  @brief  调用静态方法，如果不支持返回NSErro
 *
 *  @param   method   方法名
 *  @param   params   参数列表
 *
 *  @return  返回方法调用值，如果不支持，返回erro
 */
- (id)callInstancesMethod:(NSString *)method
                 moduleId:(NSString *)moduleId
                   params:(NSArray *)params
                     erro:(NSError **)error {
  XAppModule *module = [self createModuleIfNeccesoryWithModuleId:moduleId];
  
  if (module == nil) {
    if (error != NULL) {
      *error = [XAppModuleErrorHelper erroWithCode:kModuleErroCodeNoSupportModule];
    }
    return nil;
  }
  
  [module require]; // require 会注册进来
  id result = nil;
  result = [[module class] callInstancesMethod:method params:params erro:error];
  [module finished];
  return result;
}

/**
 *  @brief  调用相关方法,可以通过这个方法反射需要的方法。
 *
 *  @return 返回方法调用值，如果不支持，返回nil
 */
- (id)callMethod:(NSString *)method
        moduleId:(NSString *)moduleId
          pageId:(NSString *)pageId
          params:(NSDictionary *)params
            erro:(NSError **)error
{
  UIViewController *page = [self createPageIfNeccesoryWithModuleId:moduleId
                                                            pageId:pageId];
  if (page == nil) {
    if (error != NULL) {
      *error = [XAppModuleErrorHelper erroWithCode:kModuleErroCodeNoSupportPage];
    }
    return nil;
  }
  
  if([page  conformsToProtocol:@protocol(XAppModulePageProtocol)])
  {
    if([(id<XAppModulePageProtocol>)page respondsToSelector:NSSelectorFromString(method)])
    {
      [(id<XAppModulePageProtocol>)page setPageConfig:params];
    }
  }
  return (id<XAppModulePageProtocol>)page;
}

#pragma Require &&Finish
- (NSError *)requireModuleWithId:(NSString *)moduleId {
  XAppModule *module = [self createModuleIfNeccesoryWithModuleId:moduleId];
  if (moduleId == nil) {
    return [XAppModuleErrorHelper erroWithCode:kModuleErroCodeNoSupportModule];
  }
  
  [module require];
  
  return nil;
}

- (NSError *)finishModuleWithId:(NSString *)moduleId {
  XAppModule *module = [self createModuleIfNeccesoryWithModuleId:moduleId];
  if (moduleId == nil) {
    return [XAppModuleErrorHelper erroWithCode:kModuleErroCodeNoSupportModule];
  }
  
  [module finished];
  
  return nil;
}

- (void)addVisiableModule:(NSString *)key {
  
  id objct = [sRegistModuleClasses objectForKey:key];
  if (objct) {
    [sVisibleModuleClasses setObject:objct forKey:key];
  }
}

#pragma mark - RN

RCT_EXPORT_METHOD(callMethod:(NSString *)method moduleId:(NSString *)moduleId params:(NSArray *)params resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *erro = nil;
  if ([method containsString:@":"] && ![method hasSuffix:@":"]) {
    method = [method stringByAppendingString:@":"];
  }
  id object = [[XAppModuleManager shareInstance] callMethod:method moduleId:moduleId params:params erro:&erro];
  if (erro != nil) {
    if (reject) {
      reject(@"", @"", erro);
    }
  }else {
    if (resolve) {
      resolve(([object isKindOfClass:[RACUnit class]])?nil:object);
    }
  }
}

@end

@implementation XAppModuleManager (Base)

- (BOOL)isModuleVisible:(NSString *)moduleId {
  if ([moduleId length] > 0) {
    NSDictionary *moduleDictionary = [sVisibleModuleClasses objectForKey:moduleId];
    NSString *className = moduleDictionary[moduleId];
    return [className length] > 0;
  }
  return NO;
}

RCT_EXPORT_METHOD(isModuleVisible:(NSString *)moduleId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  BOOL isVisible = [[XAppModuleManager shareInstance] isModuleVisible:moduleId];
  if (resolve) {
    resolve(@(isVisible));
  }
}
@end




@implementation XAppModuleManager (module)


/**
 *  @brief  配置方法
 *
 *  @param   params   配置使用的参数
 */
- (id)config:(NSDictionary *)params moduleId:(NSString *)moduleId erro:(NSError **)erro {
  return [self callMethod:NSStringFromSelector(@selector(config:)) moduleId:moduleId params:@[ params ] erro:erro];
}

- (NSString *)versionWithModuleId:(NSString *)moduleId erro:(NSError **)erro {
  return [self callInstancesMethod:NSStringFromSelector(@selector(version)) moduleId:moduleId params:nil erro:erro];
} //模块版本号

- (NSDictionary *)defaultConfigWithModuleId:(NSString *)moduleId erro:(NSError **)erro {
  return  [self callInstancesMethod:NSStringFromSelector(@selector(version)) moduleId:moduleId params:nil erro:erro];
}

- (UIView *)rootViewWithModuleId:(NSString *)moduleId erro:(NSError **)erro  {
  return  [self callMethod:NSStringFromSelector(@selector(rootView)) moduleId:moduleId params:nil erro:erro];
}

- (UIViewController *)rootViewControllerWithModuleId:(NSString *)moduleId erro:(NSError **)erro {
  return [self callMethod:NSStringFromSelector(@selector(rootViewController)) moduleId:moduleId params:nil erro:erro];
}

- (UIViewController *)rootViewControllerWithModuleId:(NSString *)moduleId config:(NSString *)config erro:(NSError **)erro {
  return [self callMethod:NSStringFromSelector(@selector(rootViewControllerWithConfig:)) moduleId:moduleId params:@[config] erro:erro];
}

@end


@implementation XAppModuleManager (page)

- (UIViewController *)rootViewControllerWithModuleId:(NSString *)moduleId
                                              pageId:(NSString *)pageId
                                              config:(NSDictionary *)configJson
                                                erro:(NSError **)erro
{
  return [self callMethod:NSStringFromSelector(@selector(setPageConfig:))
                 moduleId:moduleId
                   pageId:pageId
                   params:configJson
                     erro:erro];
}
@end

@implementation XAppModuleManager (navigator)

- (BOOL)pushViewControllerWithModuleId:(NSString *)moduleId params:(NSString *)params erro:(NSError **)erro {
  UIViewController *viewController = [self rootViewControllerWithModuleId:moduleId config:params erro:erro];
  if (viewController != nil) {
    viewController.hidesBottomBarWhenPushed = YES;
    [self.navigator.navigationController pushViewController:viewController animated:YES];
    return YES;
  }
  return NO;
}

RCT_EXPORT_METHOD(push:(NSString *)moduleId params:(NSString *)params resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *erro = nil;
  [[XAppModuleManager shareInstance] pushViewControllerWithModuleId:moduleId params:params erro:&erro];
  if (erro != nil) {
    if (reject) {
      reject(@"", @"", erro);
    }
  }else {
    if (resolve) {
      resolve(@(YES));
    }
  }
}
@end
