//
//  XAppModuleErrorHelper.m
//  RNProject
//
//  Created by ShiXiaoHui on 3/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModuleErrorHelper.h"

@implementation XAppModuleErrorHelper


+ (NSError *)erroWithCode:(NSInteger)code {
  NSString *errMsg = [self erroMsgWithCode:code];
  NSError *erro = [[NSError alloc] initWithDomain:kPAFFModuleErroDomain code:code userInfo:@{@"desciption": errMsg}];
  return erro;
}


+ (NSString *)erroMsgWithCode:(NSInteger)code {
#ifdef DEBUG
  switch (code) {
    case kModuleErroCodeNoSupportModule:
      return @"No support module";
      
    case kModuleErroCodeNoSupportService:
      return @"No support Service";
      
    case kModuleErroCodeNoSupportProperty:
      return @"No support Property";
      
    case kModuleErroCodeNoSupportEvent:
      return @"No support Event";
      
    default:
      break;
  }
#endif
  return @"XApp Module Erro!!";
}

@end
