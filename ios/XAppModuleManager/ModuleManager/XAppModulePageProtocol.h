//
//  XAppModulePageProtocol.h
//  RNProject
//
//  Created by ShiXiaoHui on 4/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef XAppModulePageProtocol_h
#define XAppModulePageProtocol_h


#endif /* XAppModulePageProtocol_h */
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol XAppModulePageProtocol <NSObject>

@property (nonatomic, strong, readonly) NSString *pageId;
@property (nonatomic, strong, readonly) NSDictionary *pageConfig;

/**
 *  @brief
 *
 *  @param   pageConfig   启动参数
 *
 *  @return  返回方法调用值，如果不支持，返回erro
 */
- (void)setPageConfig:(NSDictionary *)pageConfig;

/**
 *  @brief  页面名字，底层需要通过这个名字找到相应的配置文件
 *
 *  @return  然会页面名字，子类需要实现
 */
+ (NSString *)pageName;
@end
