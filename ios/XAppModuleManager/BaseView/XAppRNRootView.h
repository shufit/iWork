//
//  XAppRNRootView.h
//  RNProject
//
//  Created by ShiXiaoHui on 16/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface XAppRNRootView : UIView

- (instancetype)initWithFrame:(CGRect)frame withModuleName:(NSString *)jsModuleName initialProperties:(NSDictionary *) initialProperties;

@end
