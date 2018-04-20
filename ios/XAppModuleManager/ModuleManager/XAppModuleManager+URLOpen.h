//
//  XAppModuleManager+URLOpen.h
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModuleManager.h"

@interface XAppModuleManager (URLOpen)

/**
 *  自定义跳转
 *
 *  @param url 自定义协议url: xapp://navigator/(moduleId)/(pageId)?prams1=value1&params2=value2
 *  或者 url : http(s)://XXX
 */
- (void)openPageWithUrl:(NSString *)url;

- (void)openPageWithUrl:(NSString *)url options:(NSDictionary *)option;

@end
