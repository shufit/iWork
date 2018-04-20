//
//  XAppRNHCRootViewController.h
//  RNProject
//
//  Created by ShiXiaoHui on 17/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppRNRootViewController.h"

@interface XAppRNHCRootViewController : XAppRNRootViewController

//native页面跳转到react native页面
- (instancetype)initWithModuleName:(NSString *)jsModuleName initialProperties:(NSDictionary *) initialProperties WithPlaceHolderImage:(UIImage*)image;

@end
