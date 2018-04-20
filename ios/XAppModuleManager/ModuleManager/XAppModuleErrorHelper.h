//
//  XAppModuleErrorHelper.h
//  RNProject
//
//  Created by ShiXiaoHui on 3/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XAppModuleMacros.h"

@interface XAppModuleErrorHelper : NSObject

+ (NSError *)erroWithCode:(NSInteger)code;

@end
