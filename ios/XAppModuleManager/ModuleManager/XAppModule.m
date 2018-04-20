//
//  XAppModule.m
//  RNProject
//
//  Created by ShiXiaoHui on 11/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModule.h"
#import "XAppModuleManager.h"
#import "XAppModuleErrorHelper.h"
#import "NSInvocation+RACTypeParsing.h"

extern void XAppRegisterModule(Class modulePageClass, NSString *modulePageId);

@interface XAppModule()

@property (nonatomic, assign) BOOL hasConfig;

@end

@implementation XAppModule


- (void)dealloc {
  [self finished];
}

+ (void)load {
  XAppRegisterModule([self class], [self url]);
}

+ (NSDictionary *)configDic {
  return nil;
}

- (BOOL)hasConfig {
  return _hasConfig;
}

- (void)config:(NSDictionary *)dic {
  _hasConfig = YES;
}

/**
 *  @brief  调用相关方法,可以通过这个方法反射需要的方法。
 *
 *  @return
 */
- (id)callMethod:(NSString *)method params:(NSArray *)params erro:(NSError **)erro {
  SEL selector = NSSelectorFromString(method);
  if ([self respondsToSelector:selector]) {
    NSMethodSignature *signature = [self methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setSelector:selector];
    [invocation setTarget:self];
    
    int index = 2;
    for (id object in params) {
      [invocation rac_setArgument:object atIndex:index]; // 0:target 1:selector， 所以从2开始
      index++;
    }
    [invocation invoke];
    return [invocation rac_returnValue];
  }
  
  return nil;
}

+ (id)callInstancesMethod:(NSString *)method params:(NSArray *)params erro:(NSError **)erro {
  SEL selector = NSSelectorFromString(method);
  if ([self respondsToSelector:selector]) {
    NSMethodSignature *signature = [self methodSignatureForSelector:selector];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setSelector:selector];
    [invocation setTarget:self];
    int index = 2;
    for (id object in params) {
      [invocation rac_setArgument:object atIndex:index]; // 0:target 1:selector， 所以从2开始
      index++;
    }
    [invocation invoke];
    return [invocation rac_returnValue];
  }
  
  if (erro != NULL) {
    *erro = [XAppModuleErrorHelper erroWithCode:kModuleErroCodeNoSupportService];
  }
  
  return nil;
}

- (void)require {
  [[XAppModuleManager shareInstance] registModule:self];
  self.moduleRetainCount++;
}

- (void)finished {
  self.moduleRetainCount--;
}

#pragma mark - Property

- (void)setModuleRetainCount:(NSUInteger)moduleRetainCount {
  if (_moduleRetainCount != moduleRetainCount) {
    _moduleRetainCount = moduleRetainCount;
    if (moduleRetainCount == 0) {
      [[XAppModuleManager shareInstance] removeModule:self];
    }
  }
}

- (NSString *)moduleId {
  return [[self class] url];
}

+ (NSString *)url {
  return [self moduleName];
}

+ (NSString *)version {
  return @"1.0";
}

+ (NSDictionary *)defaultConfig {
  NSDictionary *dic = [[self class] configDic];
  if (dic) {
    return [dic objectForKey:@"config"];
  }
  return nil;
}

+ (NSString *)moduleName {
  return NSStringFromClass(self);
}

- (BOOL)startPageId:(NSString *)pageId pageConfigString:(NSString *)pageConfigString nativeCallback:(NativeJumpCallBackBlock)callback {
  //此方法用于模块跳转到模块任一页面的入口,在子类中去实现
  return NO;
}

+ (BOOL)isDefaultModuleEnable {
  
  return YES;
}
@end
